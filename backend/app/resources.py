import sys
from datetime import datetime, timedelta

import cv2
import falcon
import jwt
import msgpack
from jwt import InvalidSignatureError, DecodeError, InvalidTokenError, ExpiredSignatureError
from marshmallow import ValidationError
from config import KEY
from models import *
from schemas import UserSchema, AreaSchema, QuestionSchema, DiagnoseSchema
from send_email import send_email
import hashlib
import json
import base64


def gen():
    video = cv2.VideoCapture('Rehappka.mp4')
    i = 0
    success = True
    while success:
        success, image = video.read()
        i+=1
        print(i)
        ret, jpeg = cv2.imencode('.jpg', image)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n\r\n')


class TestResource:
    def on_get(self, req, res):
        # res.media = "Saying HI from RehabApp API :)"
        # labeled_frame = gen()
        # res.content_type = 'multipart/x-mixed-replace; boundary=frame'
        # res.stream = labeled_frame
        # res.content_type = 'application/octet-stream'
        # print(open('Rehappka.mp4', 'rb').read())
        # res.data = open('Rehappka.mp4', 'rb').read()
        video = open('Rehappka.mp4', 'rb').read()

        res.media = {
            'video': base64.b64encode(video).decode('utf-8'),
            # 'videos': [base64.b64encode(video).decode('utf-8') for i in range(1000)]
        }


class QuestionsResource:
    def on_get(self, req, res):
        res.media = []

        area_schema = AreaSchema()
        question_schema = QuestionSchema()
        diagnose_schema = DiagnoseSchema()

        areas = req.context.session.query(Area)
        questions = req.context.session.query(Question)
        diagnoses = req.context.session.query(Diagnose)

        ret = {}

        for area in areas:
            ret[area.unique_id] = area_schema.dump(area)

        for question in questions:
            ret[question.unique_id] = question_schema.dump(question)

        for diagnose in diagnoses:
            ret[diagnose.unique_id] = diagnose_schema.dump(diagnose)

        m = hashlib.md5()
        m.update(json.dumps(ret).encode())

        res.media = {
            'checksum': m.hexdigest(),
            'questions': ret
        }


class UpdateQuestionsResource:
    def on_get(self, req, res, checksum):
        res.media = []

        area_schema = AreaSchema()
        question_schema = QuestionSchema()
        diagnose_schema = DiagnoseSchema()

        areas = req.context.session.query(Area)
        questions = req.context.session.query(Question)
        diagnoses = req.context.session.query(Diagnose)

        ret = {}

        for area in areas:
            ret[area.unique_id] = area_schema.dump(area)

        for question in questions:
            ret[question.unique_id] = question_schema.dump(question)

        for diagnose in diagnoses:
            ret[diagnose.unique_id] = diagnose_schema.dump(diagnose)

        m = hashlib.md5()
        m.update(json.dumps(ret).encode())

        if str(m.hexdigest()) == checksum:
            res.status = falcon.HTTP_204
        else:
            res.media = {
                'checksum': m.hexdigest(),
                'questions': ret
            }


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
            res.status = falcon.HTTP_400
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
                res.status = falcon.HTTP_400


class CheckEmailResource:
    def on_post(self, req, res):

        session = req.context.session

        exist_user = session.query(User).filter(User.email == req.media['email']).first()

        if exist_user:
            res.media = "User with email already exists"
            res.status = falcon.HTTP_400
        else:
            res.status = falcon.HTTP_NO_CONTENT


class LoginResource:
    def on_post(self, req, res):

        session = req.context.session

        user = session.query(User).filter(User.email == req.media['email']).first()

        if not user:
            raise falcon.HTTPUnauthorized(description="Wrong credentials")
        else:
            if user.validate_password(req.media['password']):

                user_schema = UserSchema()

                user.refresh_token = jwt.encode({
                    "email": user.email,
                    "iat": datetime.utcnow(),
                }, KEY, algorithm='HS256').decode('utf-8')
                session.add(user)
                session.flush()

                res.media = {
                    "user": user_schema.dump(user),
                    "access_token": jwt.encode({
                        "email": user.email,
                        "iat": datetime.utcnow(),
                        "exp": datetime.utcnow() + timedelta(minutes=15)
                    }, KEY, algorithm='HS256').decode('utf-8'),
                    "refresh_token": user.refresh_token
                }
            else:
                raise falcon.HTTPUnauthorized(description="Wrong credentials")


class RefreshTokenResource:
    def on_post(self, req, res):
        session = req.context.session

        try:
            payload = jwt.decode(req.media['refresh_token'], KEY, algorithm='HS256')
        except ExpiredSignatureError:
            raise falcon.HTTPUnauthorized(description="Token has expired. Request a new one.")
        except (InvalidSignatureError, DecodeError, InvalidTokenError):
            raise falcon.HTTPUnauthorized(description="Wrong token")

        user = session.query(User).filter(User.email == payload['email']).first()

        if not user:
            raise falcon.HTTPUnauthorized(description="Wrong token")

        res.media = {
            "access_token": jwt.encode({
                "email": user.email,
                "exp": datetime.utcnow() + timedelta(minutes=15)
            }, KEY, algorithm='HS256').decode('utf-8'),
        }


class CollectDiagnosesResource:
    def on_post(self, req, res):

        session = req.context.session

        diagnose = session.query(Diagnose).filter(Diagnose.id == req.media['diagnose_id']).first()

        if not diagnose:
            res.media = "Diagnose doesn't exist"
            res.status = falcon.HTTP_404
            return

        if req.context.user:

            user = req.context.user

            if diagnose in user.diagnoses:
                res.media = "User already has diagnose"
                res.status = falcon.HTTP_400
            else:
                user.diagnoses.append(diagnose)

                session.add(user)
                session.flush()

                res.status = falcon.HTTP_200
                res.media = {
                    'diagnoses': [d.unique_id for d in user.diagnoses]
                }

        else:
            collect = UserDiagnose()
            collect.diagnose = diagnose

            session.add(collect)
            session.flush()

            res.status = falcon.HTTP_201
            res.media = {
                'collected_id': collect.id
            }



class ForgotPasswordResource:
    def on_post(self, req, res):

        session = req.context.session

        user = session.query(User).filter(User.email == req.media['email']).first()

        if not user:
            raise falcon.HTTPBadRequest(description="Wrong email or password")
        else:
            token = jwt.encode({
                "exp": datetime.utcnow() + timedelta(days=1),
                "email": user.email,
            }, KEY, algorithm='HS256').decode('utf-8')

            send_email(user.email, token)

            res.media = "Email has been sent."


class ResetPasswordResource:
    def on_post(self, req, res):

        session = req.context.session

        token = req.media['token']

        if not token:
            raise falcon.HTTPUnauthorized(description="No token")

        try:
            payload = jwt.decode(token, KEY, algorithm='HS256')
        except ExpiredSignatureError:
            raise falcon.HTTPUnauthorized(description="Token has expired. Request a new one.")
        except (InvalidSignatureError, DecodeError, InvalidTokenError):
            raise falcon.HTTPUnauthorized(description="Wrong token")

        user = session.query(User).filter(User.email == payload['email']).first()

        if not user:
            raise falcon.HTTPUnauthorized(description="Wrong auth token")

        user.password = user.generate_password(req.media['password'])

        user.refresh_token = None
        session.add(user)
        session.flush()

        res.media = "Password changed successfully."
