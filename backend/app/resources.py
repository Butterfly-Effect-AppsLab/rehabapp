from datetime import datetime, timedelta
from secrets import token_urlsafe

import falcon
import jwt
from marshmallow import ValidationError
from sqlalchemy import and_

from config import KEY
from models import *
from schemas import UserSchema, DiagnoseSchema


class TestResource:
    def on_get(self, req, res):
        res.media = "Saying HI from RehabApp API :)"


class QuestionsResource:
    def on_get(self, req, res):
        res.media = []

        questions = req.context.session.query(Question)
        diagnoses = req.context.session.query(Diagnose)

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
                    "ref": o.next_option.get_id()
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

        user_schema = UserSchema()
        res.media = user_schema.dump(user)


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

                res.status = falcon.HTTP_201

                res.media = user_schema.dump(user)

            except ValidationError as err:
                res.media = err.messages


class LoginResource:
    def on_post(self, req, res):

        session = req.context.session

        user = session.query(User).filter(User.email == req.media['email']).first()

        if not user:
            raise falcon.HTTPUnauthorized(description="Wrong credentials")
        else:
            if user.validate_password(req.media['password']):

                user_schema = UserSchema()

                user.refresh_token = token_urlsafe()
                session.add(user)
                session.flush()

                res.media = {
                    "user": user_schema.dump(user),
                    "access_token": jwt.encode({
                        "email": user.email,
                        "iat": datetime.utcnow(),
                        "exp": datetime.utcnow() + timedelta(minutes=0, seconds=30)
                    }, KEY, algorithm='HS256').decode('utf-8'),
                    "refresh_token": user.refresh_token
                }
            else:
                raise falcon.HTTPUnauthorized(description="Wrong email or password")


class RefreshTokenResource:
    def on_post(self, req, res):
        session = req.context.session

        payload = jwt.decode(req.media['access_token'], verify=False)

        user = session.query(User).filter(and_(User.email == payload['email'],
                                               User.refresh_token == req.media['refresh_token'])).first()

        if not user:
            raise falcon.HTTPUnauthorized(description="Wrong tokens")

        res.media = {
            "access_token": jwt.encode({
                "email": user.email,
                "exp": datetime.utcnow() + timedelta(minutes=15)
            }, KEY, algorithm='HS256').decode('utf-8'),
        }


class UserDiagnosesResource:
    def on_put(self, req, res, diagnose_id):

        session = req.context.session

        user = req.context.user

        diagnose = session.query(Diagnose).filter(Diagnose.id == diagnose_id).first()

        if not diagnose:
            res.media = "Diagnose doesn't exist"
            res.status = falcon.HTTP_404
        else:
            user.diagnoses.append(diagnose)

            session.add(user)
            session.flush()

            res.status = falcon.HTTP_204
