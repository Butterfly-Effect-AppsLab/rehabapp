import sys
from datetime import datetime, timedelta
import falcon
import jwt
import requests
from jwt import InvalidSignatureError, DecodeError, InvalidTokenError, ExpiredSignatureError
from marshmallow import ValidationError
from oauthlib.oauth2 import WebApplicationClient

from config import KEY
from config_dev import GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
from models import *
from oauth import get_google_provider_cfg
from schemas import UserSchema, AreaSchema, QuestionSchema, DiagnoseSchema
from send_email import send_email
import hashlib
import json
import os

os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

client = WebApplicationClient(GOOGLE_CLIENT_ID)


class TestResource:
    def on_get(self, req, res):
        res.media = "Saying HI from RehabApp API :)"


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


class OauthGoogleResource:
    def on_get(self, req, res):
        # Find out what URL to hit for Google login
        google_provider_cfg = get_google_provider_cfg()
        authorization_endpoint = google_provider_cfg["authorization_endpoint"]

        # Use library to construct the request for Google login and provide
        # scopes that let you retrieve user's profile from Google
        request_uri = client.prepare_request_uri(
            authorization_endpoint,
            # redirect_uri="http://192.168.99.102.xip.io:8000/login/oauth/google/callback",
            redirect_uri="http://localhost:8100/login",
            scope=["openid", "email", "profile"],
            access_type='offline',
            prompt='consent'
        )

        res.media = {
            'request_uri': request_uri
        }


class OauthGoogleCallbackResource:
    def on_get(self, req, res):
        base_url = f"{req.prefix}{req.path}"

        code = req.params['code']

        google_provider_cfg = get_google_provider_cfg()
        token_endpoint = google_provider_cfg["token_endpoint"]

        token_url, headers, body = client.prepare_token_request(
            token_endpoint,
            authorization_response=req.url,
            redirect_url=base_url,
            code=code
        )
        token_response = requests.post(
            token_url,
            headers=headers,
            data=body,
            auth=(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET),
        )

        # Parse the tokens!
        tokens = client.parse_request_body_response(json.dumps(token_response.json()))

        # userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
        # uri, headers, body = client.add_token(userinfo_endpoint)
        # userinfo_response = requests.get(uri, headers=headers, data=body)

        refresh_response = requests.post(
            'https://oauth2.googleapis.com/token',
            data={
                'client_id': GOOGLE_CLIENT_ID,
                'client_secret': GOOGLE_CLIENT_SECRET,
                'refresh_token': tokens['refresh_token'],
                'grant_type': 'refresh_token'
            }
        )

        # tokens = client.parse_request_body_response(json.dumps(token_response.json()))

        userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
        uri, headers, body = client.add_token(userinfo_endpoint)
        userinfo_response = requests.get(uri, headers=headers, data=body)

        res.media = {
            'req': req.params,
            'res': json.dumps(token_response.json()),
            'user': json.dumps(userinfo_response.json()),
            'refresh': json.dumps(refresh_response.json())
        }


# class OauthFbResource:
#     def on_get(self, req, res):
#         res.media = f"https://www.facebook.com/v7.0/dialog/oauth?" \
#                     f"client_id={FB_APP_ID}" \
#                     f"&redirect_uri=http://localhost:8000/login/oauth/fb/callback" \
#                     f"&response_type=code"\
#                     f"&scope=email"
#
#
# class OauthFbCallbackResource:
#     def on_get(self, req, res):
#
#         ret = {}
#
#         code = req.get_param('code')
#
#         token_response = requests.get(
#             f'https://graph.facebook.com/v7.0/oauth/access_token?'
#             f'client_id={FB_APP_ID}'
#             f'&redirect_uri=http://localhost:8000/login/oauth/fb/callback'
#             f'&client_secret={FB_APP_SECRET}'
#             f'&code={code}'
#         )
#
#         ret['token_response'] = token_response.json()
#
#         access_token = requests.get(f"https://graph.facebook.com/oauth/access_token"
#                                     f"?client_id={FB_APP_ID}"
#                                     f"&client_secret={FB_APP_SECRET}"
#                                     f"&grant_type=client_credentials")
#
#         ret['access_token'] = access_token.json()
#
#         resp = requests.get(
#             f"https://graph.facebook.com/debug_token?"
#             f"input_token={token_response.json()['access_token']}"
#             f"&access_token={access_token.json()['access_token']}"
#         )
#
#         ret['resp'] = resp.json()
#
#         user = requests.get(
#             f"https://graph.facebook.com/{resp.json()['data']['user_id']}?"
#             f"fields=email,name"
#             f"&access_token={token_response.json()['access_token']}"
#         )
#
#         # print("**************************************************",resp.json())
#
#         # res.media = json.dumps(token_response.json()['access_token'])
#         ret['user'] = user.json()
#
#         res.media = ret


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
