from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from models import Question, Diagnose, Option
from self_diagnostic_component import self_diagnostic_component

postgres = f'postgresql://postgres:password@db:5432/rehabApp'
engine = create_engine(postgres, echo=True)
Base = declarative_base()
Session = sessionmaker(bind=engine)

models = {}

session = Session()

for key, item in self_diagnostic_component.items():
    if item['type'] == "question":
        model = Question(text=item['text'])
    else:
        model = Diagnose(name=item['name'], text=item['text'])

    session.add(model)
    models[key] = model

try:
    session.commit()
except:
    session.rollback()

for key, item in self_diagnostic_component.items():
    if item['type'] == "question":
        for option in item['options']:
            ref = option['ref']
            if self_diagnostic_component[ref]["type"] == "question":
                model = Option(question_id=models[key].id, label=option['label'], question=models[ref])
            else:
                model = Option(question_id=models[key].id, label=option['label'], diagnose=models[ref])

            session.add(model)
try:
    session.commit()
except:
    session.rollback()
finally:
    session.close()
