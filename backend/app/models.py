from sqlalchemy import create_engine, Column, Integer, String, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.orm import sessionmaker, relationship

# class Base(object):
#     @declared_attr
#     def __tablename__(cls):
#         return f"{cls.__name__.lower()}s"

postgres = 'postgresql://postgres:password@db:5432/quotes'

engine = create_engine(postgres, echo=True)
# engine = create_engine('sqlite:///quotes.db', echo=True)
# Base = declarative_base(cls=Base)
Base = declarative_base()
Session = sessionmaker(bind=engine)


class Author(Base):

    __tablename__ = "authors"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    surname = Column(String, nullable=True)


class Quote(Base):

    __tablename__ = "quotes"

    id = Column(Integer, primary_key=True)
    text = Column(Text)
    author_id = Column(Integer, ForeignKey('authors.id'))
    author = relationship("Author")
