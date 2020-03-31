from sqlalchemy import Column, ForeignKey, Integer, String, Text, create_engine

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

engine = create_engine('sqlite:///be.db', echo=True)
Session = sessionmaker(bind=engine)


class Quote(Base):
    __tablename__ = "quotes"

    id = Column(Integer, primary_key=True)
    author = Column(String(40))
    text = Column(Text)


class Author(Base):
    __tablename__ = "authors"

    id = Column(Integer, primary_key=True)
    name = Column(String(40))

