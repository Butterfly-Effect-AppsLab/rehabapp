import hashlib
import json

from bcrypt import hashpw, gensalt, checkpw
from sqlalchemy import create_engine, Column, Integer, String, Text, ForeignKey, CheckConstraint, Date, Table, Float, \
    Boolean, and_
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from config import DB

postgres = DB
engine = create_engine(postgres)
Base = declarative_base()
Session = sessionmaker(bind=engine)

tree_references = Table('tree_references', Base.metadata,
                        Column('tree_id', Integer, ForeignKey('trees.id', ondelete='CASCADE')),
                        Column('ref_tree_id', Integer, ForeignKey('trees.id', ondelete='CASCADE'))
                        )


class Diagnose(Base):
    __tablename__ = "diagnoses"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    svk = Column(String)
    definition = Column(Text, nullable=True)
    symptoms = Column(Text, nullable=True)
    cause = Column(Text, nullable=True)
    diagnostic = Column(Text, nullable=True)
    cure = Column(Text, nullable=True)
    prevention = Column(Text, nullable=True)

    options = relationship(
        'Option',
    )

    @property
    def unique_id(self):
        return f"d_{self.id}"


class UserDiagnose(Base):
    __tablename__ = "user_diagnoses"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey('users.id', ondelete='SET NULL'), nullable=True)
    diagnose_id = Column(Integer, ForeignKey('diagnoses.id', ondelete='CASCADE'))
    deleted = Column(Boolean, nullable=False, default=False, server_default='f')

    diagnose = relationship("Diagnose", cascade="delete")


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
    tree_id = Column(
        Integer,
        ForeignKey(
            'trees.id',
            ondelete='CASCADE',
            onupdate='CASCADE'
        ), nullable=False
    )

    tree = relationship(
        'Tree',
        uselist=False, back_populates="questions"
    )

    options = relationship(
        'Option',
        backref='questions',
        foreign_keys="Option.question_id",
        cascade="delete"
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


class Tree(Base):
    __tablename__ = "trees"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    text = Column(String)

    areas = relationship('Area', cascade="delete")
    questions = relationship('Question', cascade="delete")

    referenced_trees = relationship(
        'Tree',
        secondary=tree_references,
        primaryjoin=id == tree_references.c.tree_id,
        secondaryjoin=id == tree_references.c.ref_tree_id,
        back_populates="references_from",
    )

    references_from = relationship(
        'Tree',
        secondary=tree_references,
        primaryjoin=id == tree_references.c.ref_tree_id,
        secondaryjoin=id == tree_references.c.tree_id,
        back_populates="referenced_trees",
        lazy='joined'
    )


class Area(Base):
    __tablename__ = "areas"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    x = Column(Float)
    y = Column(Float)
    width = Column(Float)
    height = Column(Float)
    tree_id = Column(
        Integer,
        ForeignKey(
            'trees.id',
            ondelete='CASCADE',
            onupdate='CASCADE'
        ), nullable=False
    )

    tree = relationship(
        'Tree',
        uselist=False, back_populates="areas"
    )

    options = relationship(
        'Option',
        foreign_keys="Option.area_id",
        cascade="delete"
    )

    @property
    def unique_id(self):
        return self.name


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
    side = Column(String, nullable=True)
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

    @property
    def next_option(self):
        if self.next_question:
            return self.next_question
        elif self.next_diagnose:
            return self.next_diagnose
        return self.next_area


class User(Base):
    __tablename__ = "users"
    __table_args__ = (
        CheckConstraint(
            'password IS NOT NULL OR google IS TRUE',
            name='at-least-one'
        ),
    )

    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String, unique=True)
    _password = Column('password', String, nullable=True)
    sex = Column(String)
    birthday = Column(Date)
    google = Column(Boolean, default=False)
    verification_token = Column(String, nullable=True)
    password_reset = Column(String, nullable=True)

    diagnoses = relationship(
        'Diagnose',
        secondary="user_diagnoses",
        primaryjoin="and_(User.id==UserDiagnose.user_id, UserDiagnose.deleted==False)"
    )

    @property
    def password(self):
        return self._password

    @password.setter
    def password(self, pwd):
        self._password = hashpw(pwd.encode(), gensalt()).decode()

    def validate_password(self, pwd):
        return checkpw(pwd.encode(), self.password.encode())


class UserTokens(Base):
    __tablename__ = "user_tokens"

    id = Column(Integer, primary_key=True)

    user_id = Column(
        Integer,
        ForeignKey(
            'users.id',
            ondelete='CASCADE',
            onupdate='CASCADE'
        ), nullable=True
    )

    refresh_token = Column(String)
    google_refresh_token = Column(String, nullable=True)

    user = relationship('User')


class Video(Base):
    __tablename__ = "videos"

    id = Column(Integer, primary_key=True)

    diagnose_id = Column(
        Integer,
        ForeignKey(
            'diagnoses.id',
            ondelete='CASCADE',
            onupdate='CASCADE'
        ), nullable=True
    )

    text = Column(String)
    order = Column(Integer)
    checksum_video = Column(String)
    name = Column(String)

    @property
    def checksum_row(self):
        m = hashlib.md5()
        m.update(json.dumps(self).encode())

        return m.hexdigest()