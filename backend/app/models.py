from bcrypt import hashpw, gensalt, checkpw
from sqlalchemy import create_engine, Column, Integer, String, Text, ForeignKey, CheckConstraint, Date, Table, Binary
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

postgres = f'postgresql://postgres:password@db:5432/rehabApp'
engine = create_engine(postgres, echo=True)
Base = declarative_base()
Session = sessionmaker(bind=engine)

user_diagnoses = Table('user_diagnoses', Base.metadata,
                       Column('user_id', Integer, ForeignKey('users.id')),
                       Column('diagnose_id', Integer, ForeignKey('diagnoses.id'))
                       )


class Diagnose(Base):
    __tablename__ = "diagnoses"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    text = Column(Text)

    def get_id(self):
        return f"d_{self.id}"


class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True)
    text = Column(Text)

    options = relationship(
        'Option',
        backref='questions',
        foreign_keys="Option.question_id"
    )

    def get_id(self):
        return f"q_{self.id}"


class Option(Base):
    __tablename__ = "options"
    __table_args__ = (
        CheckConstraint(
            '(next_question_id IS NULL AND next_diagnose_id IS NOT NULL)'
            'OR (next_question_id IS NOT NULL AND next_diagnose_id IS NULL)',
            name='one-of-two'
        ),
    )

    id = Column(Integer, primary_key=True)
    question_id = Column(
        Integer,
        ForeignKey(
            'questions.id',
            ondelete='CASCADE',
            onupdate='CASCADE'
        ), nullable=False
    )
    label = Column(String)
    next_question_id = Column(
        Integer,
        ForeignKey(
            'questions.id',
            ondelete='CASCADE',
            onupdate='CASCADE'
        ), nullable=True
    )
    next_diagnose_id = Column(
        Integer,
        ForeignKey(
            'diagnoses.id',
            ondelete='CASCADE',
            onupdate='CASCADE'
        ), nullable=True
    )

    question = relationship(
        'Question',
        backref='questions',
        foreign_keys="Option.next_question_id"
    )
    diagnose = relationship(
        'Diagnose',
        backref='questions',
    )

    def next_option(self):
        if self.question:
            return self.question
        return self.diagnose


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String, unique=True)
    password = Column(Binary)
    sex = Column(String)
    birthday = Column(Date)

    diagnoses = relationship("Diagnose", secondary=user_diagnoses)

    def generate_password(self, pwd):
        return hashpw(pwd.encode('utf8'), gensalt())

    def validate_password(self, pwd):
        return checkpw(pwd.encode(), self.password)
