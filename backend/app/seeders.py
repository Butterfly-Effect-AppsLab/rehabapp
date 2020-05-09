from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from constants import colors, prepends
from models import Color, Prepend


postgres = f'postgresql://postgres:password@db:5432/rehabApp'
engine = create_engine(postgres, echo=True)
Base = declarative_base()
Session = sessionmaker(bind=engine)
session = Session()


def seed_colors(colors):
    for color in colors:
        model = session.query(Color).filter(Color.id == color["id"]) .first()
        if not model:
            model = Color(id=color['id'], text_color=color["text_color"], background_color=color["background_color"])
            session.add(model)


def seed_prepends(prepends):
    for prepend in prepends:
        model = session.query(Prepend).filter(Prepend.id == prepend["id"]).first()
        if not model:
            model = Prepend(id=prepend['id'], text=prepend['text'])
            session.add(model)


seed_colors(colors)
seed_prepends(prepends)

try:
    session.commit()
except:
    session.rollback()
finally:
    session.close()
