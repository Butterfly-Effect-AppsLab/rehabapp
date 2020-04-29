from datetime import datetime, timedelta

import falcon
import jwt
from jwt import InvalidSignatureError, DecodeError, InvalidTokenError, ExpiredSignatureError
from marshmallow import ValidationError

from config import key
from models import *
from schemas import UserSchema, DiagnoseSchema
from send_email import send_email


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


class MeResource:
    def on_get(self, req, res):
        user = req.context.user
        res.media = {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "sex": user.sex,
            "birthday": user.birthday.isoformat(),
        }


class RegistrationResource:
    def on_post(self, req, res):

        session = req.context.session

        exist_user = session.query(User).filter(User.email == req.media['email']).first()

        if exist_user:
            res.media = "User with email already exists"
        else:
            user_schema = UserSchema()

            try:
                user_schema.validate(req.media)
                user = user_schema.load(req.media)

                user.password = user.generate_password(req.media['password'])

                session.add(user)
                session.flush()

                res.code = falcon.HTTP_201

                res.media = {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                    "sex": user.sex,
                    "birthday": user.birthday.isoformat(),
                }

            except ValidationError as err:
                res.media = err.messages


class LoginResource:
    def on_post(self, req, res):

        session = req.context.session

        user = session.query(User).filter(User.email == req.media['email']).first()

        if not user:
            raise falcon.HTTPBadRequest(description="Wrong email or password")
        else:
            if user.validate_password(req.media['password']):

                user.token_created_at = datetime.utcnow().timestamp()
                session.add(user)
                session.flush()

                res.media = {
                    "user": {
                        "id": user.id,
                        "name": user.name,
                        "email": user.email,
                        "sex": user.sex,
                        "birthday": user.birthday.isoformat(),
                    },
                    "token": jwt.encode({
                        "email": user.email,
                        "created_at": user.token_created_at
                    }, key, algorithm='HS256').decode('utf-8')
                }
            else:
                raise falcon.HTTPUnauthorized(description="Wrong email or password")


class LogoutResource:
    def on_post(self, req, res):
        session = req.context.session

        user = req.context.user

        user.token_created_at = None
        session.add(user)
        session.flush()

        res.media = "Successfully logged out"


class UserDiagnosesResource:
    def on_post(self, req, res):

        session = req.context.session

        user = req.context.user

        diagnose = session.query(Diagnose).filter(Diagnose.id == req.media['diagnose_id']).first()

        if not diagnose:
            res.media = "Diagnose doesn't exist"
        else:
            user.diagnoses.append(diagnose)

            session.add(user)

            session.flush()

            diagnoses_schema = DiagnoseSchema(many=True)

            res.media = diagnoses_schema.dump(user.diagnoses)


class ForgotPasswordResource:
    def on_post(self, req, res):

        session = req.context.session

        user = session.query(User).filter(User.email == req.media['email']).first()

        if not user:
            raise falcon.HTTPBadRequest(description="Wrong email or password")
        else:
            token = jwt.encode({
                "exp": datetime.utcnow() + timedelta(1),
                "email": user.email,
            }, str(user.token_created_at), algorithm='HS256').decode('utf-8')

            send_email(user.email, token)

            res.media = "Email has been sent."


class ResetPasswordResource:
    def on_post(self, req, res):

        session = req.context.session

        token = req.media['token']

        if not token:
            raise falcon.HTTPUnauthorized(description="No auth token")

        payload = jwt.decode(token, verify=False)

        user = session.query(User).filter(User.email == payload['email']).first()

        if not user:
            raise falcon.HTTPUnauthorized(description="Wrong auth token")

        try:
            jwt.decode(token, str(user.token_created_at), algorithm='HS256')
        except ExpiredSignatureError:
            raise falcon.HTTPUnauthorized(description="Token has expired. Request a new one.")
        except (InvalidSignatureError, DecodeError, InvalidTokenError):
            raise falcon.HTTPUnauthorized(description="Wrong auth token")

        user.password = user.generate_password(req.media['password'])
        user.token_created_at = datetime.utcnow().timestamp()
        session.add(user)
        session.flush()

        res.media = "Password changed successfully."
