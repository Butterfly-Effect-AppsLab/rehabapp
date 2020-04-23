from sqlalchemy import create_engine, Column, Integer, String, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

postgres = 'postgresql://postgres:password@db:5432/rehabApp'

engine = create_engine(postgres, echo=True)
Base = declarative_base()
Session = sessionmaker(bind=engine)
