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


def load_videos(diagnose_name=None):
    if not diagnose_name:
        diagnoses = session.query(Diagnose).all()
    else:
        diagnoses = session.query(Diagnose).filter(Diagnose.name == diagnose_name).all()

    for diagnose in diagnoses:
        name = diagnose.name
        if "/" in name:
            name = name.replace("/", "_")
        if not os.path.exists(f"videos/{name}"):
            print("Path doesn't exist")
            continue
        for order, video in enumerate(os.listdir(f'videos/{name}')):
            video_name = f'{name}/{video}'
            video_path = f'videos/{video_name}'
            size = int(os.stat(video_path).st_size / float(1 << 10))
            video = open(video_path, 'rb').read()
            m = hashlib.md5()
            m.update(base64.b64encode(video).decode('ascii').encode('utf-8'))
            checksum_video = m.hexdigest()

            video_obj = session.query(Video).filter(Video.name == video_name).all()

            video_schema = VideoSchema()

            if not video_obj:
                video_schema.load({
                    'name': video_name
                })

            print('order ', order)
            print(video_name)
            print(size)
            print(m.hexdigest())


if __name__ == "__main__":
    if len(sys.argv) == "duplicate":
        duplicate_videos()
    elif sys.argv[1] == "load":
        load_videos(sys.argv[2])
    else:
        "Unknown method"
