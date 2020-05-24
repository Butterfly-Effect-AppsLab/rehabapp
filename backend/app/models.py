from bcrypt import hashpw, gensalt, checkpw
from sqlalchemy import create_engine, Column, Integer, String, Text, ForeignKey, CheckConstraint, Date, Table, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from config import DB

postgres = DB
engine = create_engine(postgres)
Base = declarative_base()
Session = sessionmaker(bind=engine)

subarea_diagnoses = Table('subarea_diagnoses', Base.metadata,
                          Column('subarea_id', Integer, ForeignKey('options.id', ondelete='CASCADE')),
                          Column('diagnose_id', Integer, ForeignKey('diagnoses.id', ondelete='CASCADE'))
                          )


class SelfDiagnosticSequence(Base):
    __tablename__ = 'sequences'
    id = Column(Integer, primary_key=True)
    next_id = Column(Integer, ForeignKey('sequences.id'), nullable=True)
    option_id = Column(
        Integer,
        ForeignKey(
            'options.id',
            ondelete='CASCADE',
            onupdate='CASCADE'
        ), nullable=False
    )

    next = relationship("SelfDiagnosticSequence")
    option = relationship("Option")


class Diagnose(Base):
    __tablename__ = "diagnoses"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    text = Column(Text)

    @property
    def unique_id(self):
        return f"d_{self.id}"


class UserDiagnose(Base):
    __tablename__ = "user_diagnoses"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'))
    diagnose_id = Column(Integer, ForeignKey('diagnoses.id', ondelete='CASCADE'))
    sequence_id = Column(Integer, ForeignKey('sequences.id', ondelete='CASCADE'))

    diagnose = relationship("Diagnose")
    seq = relationship("SelfDiagnosticSequence")

    def gen_sequence(self, seq, arr):
        arr.append(seq.id)
        if seq.next is None:
            return arr
        arr = self.gen_sequence(seq.next, arr)
        return arr

    @property
    def sequence(self):
        return self.gen_sequence(self.seq, [])


class Color(Base):
    __tablename__ = "colors"

    id = Column(Integer, primary_key=True)
    text_color = Column(String)
    background_color = Column(String)


class Prepend(Base):
    __tablename__ = "prepends"

    id = Column(Integer, primary_key=True)
    text = Column(String)


class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True)
    text = Column(Text)
    color_id = Column(
        Integer,
        ForeignKey(
            'colors.id',
        ), nullable=False
    )
    prepend_id = Column(
        Integer,
        ForeignKey(
            'prepends.id',
        ), nullable=False
    )

    options = relationship(
        'Option',
        backref='questions',
        foreign_keys="Option.question_id"
    )

    color = relationship(
        'Color',
        uselist=False
    )

    prepend = relationship(
        'Prepend',
        uselist=False
    )

    @property
    def unique_id(self):
        return f"q_{self.id}"


class Area(Base):
    __tablename__ = "areas"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    tree = Column(String)
    text = Column(String)

    options = relationship(
        'Option',
        foreign_keys="Option.area_id"
    )
    area_detail = relationship("AreaDetail", uselist=False, back_populates="area")

    @property
    def unique_id(self):
        return self.name


class AreaDetail(Base):
    __tablename__ = "area_details"

    id = Column(Integer, primary_key=True)
    x = Column(Float)
    y = Column(Float)
    width = Column(Float)
    height = Column(Float)
    area_id = Column(
        Integer,
        ForeignKey(
            'areas.id',
            ondelete='CASCADE',
            onupdate='CASCADE'
        ), nullable=False
    )

    area = relationship("Area", uselist=False, back_populates="area_detail")


class Option(Base):
    __tablename__ = "options"
    __table_args__ = (
        CheckConstraint(
            '(next_question_id IS NOT NULL AND next_diagnose_id IS NULL AND next_area_id IS NULL)'
            'OR (next_question_id IS NULL AND next_diagnose_id IS NOT NULL AND next_area_id IS NULL)'
            'OR (next_question_id IS NULL AND next_diagnose_id IS NULL AND next_area_id IS NOT NULL)',
            name='one-of-three'
        ),
        CheckConstraint(
            '(question_id IS NOT NULL AND area_id IS NULL)'
            'OR (question_id IS NULL AND area_id IS NOT NULL)',
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
        ), nullable=True
    )
    area_id = Column(
        Integer,
        ForeignKey(
            'areas.id',
            ondelete='CASCADE',
            onupdate='CASCADE'
        ), nullable=True
    )
    text = Column(String)
    label = Column(String, nullable=True)
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
    next_area_id = Column(
        Integer,
        ForeignKey(
            'areas.id',
            ondelete='CASCADE',
            onupdate='CASCADE'
        ), nullable=True
    )

    next_question = relationship(
        'Question',
        backref='questions',
        foreign_keys="Option.next_question_id"
    )
    next_diagnose = relationship(
        'Diagnose',
        backref='questions',
    )
    next_area = relationship(
        'Area',
        backref='questions',
        foreign_keys="Option.next_area_id"
    )

    question = relationship(
        'Question',
        backref='question',
        foreign_keys="Option.question_id"
    )
    area = relationship(
        'Area',
        backref='question',
        foreign_keys="Option.area_id"
    )

    diagnoses = relationship("Diagnose", secondary=subarea_diagnoses)

    @property
    def next_option(self):
        if self.next_question:
            return self.next_question
        elif self.next_diagnose:
            return self.next_diagnose
        return self.next_area


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String, unique=True)
    password = Column(String)
    refresh_token = Column(String, nullable=True)
    sex = Column(String)
    birthday = Column(Date)

    diagnoses = relationship("UserDiagnose")

    def generate_password(self, pwd):
        return hashpw(pwd.encode(), gensalt()).decode()

    def validate_password(self, pwd):
        return checkpw(pwd.encode(), self.password.encode())
