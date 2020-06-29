import base64
import hashlib

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from models import Diagnose, Video
from config import DB
import os
import random
from shutil import copyfile
import sys

from schemas import VideoSchema

postgres = DB
engine = create_engine(postgres)
Base = declarative_base()
Session = sessionmaker(bind=engine)
session = Session()


def duplicate_videos():
    diagnoses = session.query(Diagnose).all()
    for diagnose in diagnoses:
        name = diagnose.name
        if "/" in name:
            name = name.replace("/", "_")
        if not os.path.exists(f"videos/{name}"):
            os.mkdir(f"videos/{name}")
        count = random.randint(3, 8)

        if len(os.listdir(f'videos/{name}')) < 1:
            for i in range(count):
                copyfile('videos/Rehappka.mp4', f'videos/{name}/Rehappka{i + 1}.mp4')


def load_videos(diagnose_name='all'):
    if diagnose_name == 'all':
        diagnoses = session.query(Diagnose).filter(Diagnose.name == diagnose_name).all()
    else:
        diagnoses = session.query(Diagnose).all()

    for diagnose in diagnoses:
        name = diagnose.name
        if "/" in name:
            name = name.replace("/", "_")
        if not os.path.exists(f"videos/{name}"):
            print("Path doesn't exist")
            continue

        actual_videos = os.listdir(f'videos/{name}')
        list.sort(actual_videos)

        saved_videos = list()

        for order, video in enumerate(actual_videos):
            video_name = f'{name}/{video}'
            saved_videos.append(video_name)
            video_path = f'videos/{video_name}'
            # size = int(os.stat(video_path).st_size / float(1 << 10))
            size = int(os.stat(video_path).st_size)
            video = open(video_path, 'rb').read()
            m = hashlib.md5()
            m.update(base64.b64encode(video).decode('ascii').encode('utf-8'))
            checksum_video = m.hexdigest()
            text = 'Tu nájdete čoskoro popis videa na ktorom momentálne pracujeme...'

            video_obj = session.query(Video).filter(Video.name == video_name).first()

            video_schema = VideoSchema()

            if not video_obj:
                video_obj = video_schema.load({
                    'name': video_name,
                    'order': order,
                    'size': size,
                    'text': text,
                    'checksum_video': checksum_video,
                    'diagnose_id': diagnose.id
                })

                session.add(video_obj)
                session.flush()
            else:
                video_obj.name = video_name
                video_obj.order = order
                video_obj.size = size
                video_obj.text = text
                video_obj.checksum_video = checksum_video
                video_obj.diagnose_id = diagnose.id

            video_json = video_schema.dumps(video_obj)

            m = hashlib.md5()
            m.update(video_json.encode())
            print(m.hexdigest())

            print('order ', order)
            print(video_name)
            print(size)

        session.query(Video).filter(~Video.name.in_(saved_videos)).delete(False)

    try:
        session.commit()
    except:
        session.rollback()
    finally:
        session.close()


if __name__ == "__main__":
    if sys.argv[1] == "duplicate":
        duplicate_videos()
    elif sys.argv[1] == "load":
        load_videos(sys.argv[2])
    else:
        "Unknown method"
