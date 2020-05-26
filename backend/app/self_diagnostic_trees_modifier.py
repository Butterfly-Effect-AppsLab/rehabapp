from sqlalchemy import create_engine, or_
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from models import Question, Diagnose, Option, Area, Tree
from schemas import AreaSchema, DiagnoseSchema, QuestionSchema, OptionSchema, TreeSchema
import sys
from self_diagnostic_trees import getTree
from config import DB

import logging

logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.WARN)

postgres = DB
engine = create_engine(postgres)
Base = declarative_base()
Session = sessionmaker(bind=engine)
session = Session()


def seed(tree_name='all'):

    for tree_file in getTree(tree_name):
        models = {}
        added_diagnoses = {}

        # check if tree exists
        model = session.query(Tree).filter(Tree.name == tree_file.tree['name']).first()

        if model:
            continue

        tree_schema = TreeSchema()
        tree_model = tree_schema.load(tree_file.tree)
        session.add(tree_model)

        models["a"] = []

        # create areas
        for a in tree_file.areas:
            schema = AreaSchema()
            area_model = schema.load(a)
            area_model.tree = tree_model
            session.add(area_model)
            models["a"].append(area_model)

        session.flush()

        # create diagnoses
        for diagnose in tree_file.diagnoses:
            schema = DiagnoseSchema()

            if diagnose['name'] in added_diagnoses.keys():
                model = added_diagnoses[diagnose['name']]
            else:

                model = session.query(Diagnose).filter(Diagnose.name == diagnose["name"]).first()

                if not model:
                    model = schema.load(diagnose)
                    session.add(model)
                    added_diagnoses[diagnose['name']] = model

            models[diagnose["id"]] = model

        session.flush()

        # create questions
        for question in tree_file.questions:
            schema = QuestionSchema()

            model = schema.load(question)
            model.tree = tree_model
            session.add(model)

            models[question["id"]] = model

        session.flush()

        # create options
        for option in tree_file.options:
            schema = OptionSchema()

            if option["to"] == "different_tree":
                key = "next_area_id"
                m = session.query(Area).filter(Area.name == option["tree"]).first()
                if not m:
                    session.close()
                    sys.exit(f"Tree {tree_file.areas[0]['tree']} has a reference to non existing tree {option['tree']}. Please "
                             f"create it before creating this tree.")
                option[key] = m.id
            elif option['to'] == "different_tree_question":
                key = "next_question_id"
                m = session.query(Option).filter(Option.label == option["option"]).first()
                if not m:
                    session.close()
                    sys.exit(
                        f"Tree {tree_file.areas[0]['tree']} has a reference to non existing tree {option['tree']}. Please "
                        f"create it before creating this tree.")
                option[key] = m.next_option.id
            else:
                if option["to"].startswith("q"):
                    key = "next_question_id"
                else:
                    key = "next_diagnose_id"
                option[key] = models[option["to"]].id

            if option["from"].startswith("a"):
                for a in models['a']:
                    option["area_id"] = a.id
                    model = schema.load(option)
                    session.add(model)
            else:
                option["question_id"] = models[option["from"]].id

                model = schema.load(option)
                session.add(model)
                session.flush()

        try:
            session.commit()
        except Exception as e:
            session.rollback()
            session.close()
            sys.exit(e)
    session.close()


def deleteModel(model, models, diagnoses):
    for option in model.options:
        if option.next_diagnose:
            models.append(option.next_diagnose)
            diagnoses.append(option.next_diagnose)
        elif option.next_question:
            models, diagnoses = deleteModel(option.next_question, models, diagnoses)
        session.delete(option)
    models.append(model)
    return models, diagnoses


references = {
    "laket": ["zapastie"],
    "driek": ["chodidlo", "clenok", "koleno"],
    "clenok": ["chodidlo"],
    "bedro": ["koleno"],
    "rameno": ["zapastie"],
    "krk": ["zapastie"],
}


def deleteTree(tree_name='all'):
    if tree_name in references.keys():
        referenced_areas = session.query(Area).distinct(Area.tree).filter(Area.tree.name.in_(references[tree_name])).all()
        if len(referenced_areas) > 0:
            session.close()
            sys.exit("This tree is referenced from other trees, you have to remove them first. List of trees with "
                     f"reference:\n {[a.tree for a in referenced_areas]}")

    for area in reversed(getTree(tree_name)):
        # check if tree exists
        all_models = session.query(Area).filter(Area.tree == area.areas[0]['tree']).all()

        if len(all_models) > 0:
            model = all_models[0]
            session.delete(model.area_detail)
            models = list()
            diagnoses = list()
            models, diagnoses = deleteModel(model, models, diagnoses)

            if len(all_models) > 1:
                model = all_models[1]
                session.delete(model.area_detail)
                for option in model.options:
                    if option.next_diagnose:
                        diagnoses.append(option.next_diagnose)
                        session.delete(option)
                    elif option.next_question:
                        session.delete(option)
                models.append(model)
            for m in models:
                option = session.query(Option).filter(or_(Option.next_question == m, Option.next_diagnose == m,
                                                          Option.next_area == m)).first()
                if not option:
                    session.delete(m)

        try:
            session.commit()
        except Exception as e:
            session.rollback()
            session.close()
            sys.exit(e)
    session.close()


if __name__== "__main__":
    if sys.argv[1] == "seed":
        seed(sys.argv[2])
    elif sys.argv[1] == "delete":
        deleteTree(sys.argv[2])
    else:
        "Unknown method"


