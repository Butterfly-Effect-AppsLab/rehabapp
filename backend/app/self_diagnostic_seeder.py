from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from models import Question, Diagnose, Option, Area
from schemas import AreaSchema, DiagnoseSchema, QuestionSchema, OptionSchema
from self_diagnostic_trees.horna_chrbtica import *
import sys

postgres = f'postgresql://postgres:password@db:5432/rehabApp'
engine = create_engine(postgres, echo=True)
Base = declarative_base()
Session = sessionmaker(bind=engine)
session = Session()

models = {}

# create area
model = session.query(Area).filter(Area.name == area["name"]).first()

if model:
    session.close()
    sys.exit("Self diagnostic tree already exists")

schema = AreaSchema()
model = schema.load(area)
session.add(model)
models[area["id"]] = model

# create diagnoses
for diagnose in diagnoses:
    schema = DiagnoseSchema()

    model = session.query(Diagnose).filter(Diagnose.name == diagnose["name"]).first()

    if not model:
        model = schema.load(diagnose)
        session.add(model)

    models[diagnose["id"]] = model

# create questions
for question in questions:
    schema = QuestionSchema()

    model = schema.load(question)
    session.add(model)

    models[question["id"]] = model

session.flush()

# create options
for option in options:
    schema = OptionSchema()

    for key, value in option.items():
        if key == "label":
            continue
        option[key] = models[value].id

    model = schema.load(option)
    session.add(model)

try:
    session.commit()
except:
    session.rollback()
finally:
    session.close()



