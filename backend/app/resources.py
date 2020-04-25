import falcon
from marshmallow import ValidationError

from models import *
from schemas import UserSchema, DiagnoseSchema


class TestResource:
    def on_get(self, req, res):
        res.media = "Saying HI from RehabApp API :)"


class QuestionsResource:
    def on_get(self, req, res):
        res.media = []

        questions = req.context.session.query(Question).all()
        diagnoses = req.context.session.query(Diagnose).all()

        ret = {}

        for q in questions:
            ret[q.get_id()] = {
                "type": "question",
                "text": q.text,
                "options": []
            }
            options = q.options
            for o in options:
                ret[q.get_id()]["options"].append({
                    "label": o.label,
                    "ref": o.next_option().get_id()
                })

        for d in diagnoses:
            ret[d.get_id()] = {
                "type": "diagnose",
                "name": d.name,
                "text": d.text
            }
        res.media = ret


class UsersResource:
    def on_post(self, req, res):

        session = req.context.session

        exist_user = session.query(User).filter(User.email == req.media['email']).first()

        if exist_user:
            res.media = "User with email already exists"
        else:
            user_schema = UserSchema()

            try:
                user = user_schema.load(req.media)

                user.password = user.generate_password(user.password)

                session.add(user)
                session.flush()

                res.code = falcon.HTTP_201

                res.media = user_schema.dump(user)

            except ValidationError as err:
                res.media = err.messages


class UserDiagnosesResource:
    def on_post(self, req, res, user_id):

        session = req.context.session

        user = session.query(User).filter(User.id == user_id).first()

        if not user:
            res.media = "User with this ID does not exist"
        else:
            diagnose = session.query(Diagnose).filter(Diagnose.id == req.media['diagnose_id']).first()

            user.diagnoses.append(diagnose)

            session.add(user)
            session.commit()

            res.code = falcon.HTTP_201

            diagnoses_schema = DiagnoseSchema(many=True)

            res.media = diagnoses_schema.dump(user.diagnoses)
