from datetime import datetime, timedelta
import falcon
import jwt
import requests
from jwt import InvalidSignatureError, DecodeError, InvalidTokenError, ExpiredSignatureError
from marshmallow import ValidationError
from oauthlib.oauth2 import WebApplicationClient

from config import KEY
from config_dev import GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, APP_URL
from models import *
from oauth import get_google_provider_cfg, google_refresh_token
from schemas import UserSchema, AreaSchema, QuestionSchema, DiagnoseSchema
from send_email import send_email
import hashlib
import json
import os

os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

client = WebApplicationClient(GOOGLE_CLIENT_ID)

access_token_exp = dict(days=0, hours=0, minutes=15, seconds=0)
refresh_token_exp = dict(days=7, hours=0, minutes=0, seconds=0)

redirect_url = f"{APP_URL}/login"


def generate_token(payload, exp=None):
    payload['iat'] = datetime.utcnow()
    if exp:
        payload['exp'] = datetime.utcnow() + timedelta(**exp)
    return jwt.encode(payload, KEY, algorithm='HS256').decode('utf-8')


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
        session = req.context.session
        user = session.query(User).filter(User.id == req.context.user_id).first()

        user_schema = UserSchema()
        res.media = user_schema.dump(user)


class RegistrationResource:
    def on_post(self, req, res):

        session = req.context.session

        exist_user = session.query(User).filter(User.email == req.media['email']).first()

        if exist_user and not exist_user.google:
            raise falcon.HTTPBadRequest(description="User with email already exists")

        user_schema = UserSchema()

        try:
            user_schema.validate(req.media)

            if exist_user:
                user = exist_user
                user.password = req.media['password']
            else:
                user = user_schema.load(req.media)

            session.add(user)
            session.flush()

            if exist_user:
                refresh_token = generate_token({
                    'id': user.id
                }, refresh_token_exp)

                token = UserTokens(
                    user_id=user.id,
                    refresh_token=refresh_token
                )

                session.add(token)
                session.flush()

                access_token = generate_token({
                    'id': token.id
                }, access_token_exp)

                res.media = {
                    'user': user_schema.dump(user),
                    'refresh_token': refresh_token,
                    'access_token': access_token,
                }

                res.status = falcon.HTTP_201
            else:
                token = generate_token({
                    'id': user.id
                })

                user.verification_token = token
                session.add(user)
                session.flush()

                send_email(user.email, token, 'confirmation')

                res.media = "Email has been sent."

                res.status = falcon.HTTP_200

        except ValidationError as err:
            res.media = err.messages
            res.status = falcon.HTTP_400

    def on_post_confirmation(self, req, res):
        session = req.context.session

        try:
            payload = jwt.decode(req.media['token'], KEY, algorithm='HS256')
        except ExpiredSignatureError:
            raise falcon.HTTPBadRequest(description="Token has expired. Request a new one.")
        except (InvalidSignatureError, DecodeError, InvalidTokenError):
            raise falcon.HTTPBadRequest(description="Wrong token")

        user = session.query(User).filter(User.id == payload['id']).first()

        if not user:
            raise falcon.HTTPBadRequest(description="Wrong token")

        if not user.verification_token:
            raise falcon.HTTPBadRequest(description="User already verified")

        user.verification_token = None
        session.add(user)
        session.flush()

        user_schema = UserSchema()

        refresh_token = generate_token({
            'id': user.id
        }, refresh_token_exp)

        token = UserTokens(
            user_id=user.id,
            refresh_token=refresh_token
        )

        session.add(token)
        session.flush()

        access_token = generate_token({
            'id': token.id
        }, access_token_exp)

        res.media = {
            'user': user_schema.dump(user),
            'refresh_token': refresh_token,
            'access_token': access_token,
        }


class LoginResource:
    def on_post(self, req, res):

        session = req.context.session

        user = session.query(User).filter(User.email == req.media['email']).first()

        if not user:
            raise falcon.HTTPUnauthorized(description="Wrong credentials")
        else:

            if user.verification_token:
                raise falcon.HTTPBadRequest(description="Email is not verified")

            if not user.validate_password(req.media['password']):
                raise falcon.HTTPUnauthorized(description="Wrong credentials")

            user_schema = UserSchema()

            refresh_token = generate_token({
                'id': user.id
            }, refresh_token_exp)

            token = UserTokens(
                user_id=user.id,
                refresh_token=refresh_token
            )

            session.add(token)
            session.flush()

            access_token = generate_token({
                'id': token.id
            }, access_token_exp)

            res.media = {
                'user': user_schema.dump(user),
                'refresh_token': refresh_token,
                'access_token': access_token,
            }


class OauthGoogleResource:
    def on_get(self, req, res):
        # Find out what URL to hit for Google login
        google_provider_cfg = get_google_provider_cfg()
        authorization_endpoint = google_provider_cfg["authorization_endpoint"]

        # Use library to construct the request for Google login and provide
        # scopes that let you retrieve user's profile from Google
        request_uri = client.prepare_request_uri(
            authorization_endpoint,
            redirect_uri=redirect_url,
            scope=["openid", "email", "profile"],
            access_type='offline',
            prompt='consent'
        )

        res.media = {
            'request_uri': request_uri
        }

    # sign in with google
    def on_get_code(self, req, res):
        code = req.params['code']

        google_provider_cfg = get_google_provider_cfg()
        token_endpoint = google_provider_cfg["token_endpoint"]

        token_url, headers, body = client.prepare_token_request(
            token_endpoint,
            authorization_response=req.url,
            redirect_url=redirect_url,
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

        userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
        uri, headers, body = client.add_token(userinfo_endpoint)
        userinfo_response = requests.get(uri, headers=headers, data=body)

        user_email = userinfo_response.json()['email']

        session = req.context.session

        user_schema = UserSchema()

        # check if user has account
        user = session.query(User).filter(User.email == user_email).first()

        email_verified = userinfo_response.json()['email_verified']
        email_verified = False

        if not email_verified:
            raise falcon.HTTPBadRequest(description="Google account email not verified")

        new_user = False

        # user doesn't have account
        if not user:
            new_user = True
            data = {
                'email': userinfo_response.json()['email'],
                'name': userinfo_response.json()['given_name'],
                'google': True
            }

            user = user_schema.load(data)
        else:
            if user.verification_token:
                user.verification_token = None
            if not user.google:
                user.google = True

        session.add(user)
        session.flush()

        refresh_token = generate_token({
            'id': user.id
        }, refresh_token_exp)

        token = UserTokens(
            user_id=user.id,
            refresh_token=refresh_token,
            google_refresh_token=tokens['refresh_token']
        )

        session.add(token)
        session.flush()

        access_token = generate_token({
            'id': token.id
        }, access_token_exp)

        res.media = {
            'user': user_schema.dump(user),
            'refresh_token': refresh_token,
            'access_token': access_token,
            'new_user': new_user
        }


class RefreshTokenResource:
    def on_post(self, req, res):
        session = req.context.session

        try:
            payload = jwt.decode(req.media['refresh_token'], KEY, algorithm='HS256')
        except ExpiredSignatureError:
            raise falcon.HTTPUnauthorized(description="Token has expired.")
        except (InvalidSignatureError, DecodeError, InvalidTokenError):
            raise falcon.HTTPUnauthorized(description="Wrong token")

        user_token = session.query(UserTokens).filter(UserTokens.refresh_token == req.media['refresh_token']).first()

        if not user_token:
            raise falcon.HTTPUnauthorized(description="Wrong token")

        ret = {}

        if datetime.utcfromtimestamp(payload['iat']) + timedelta(hours=24) <= datetime.utcnow():
            if user_token.google_refresh_token:
                if not google_refresh_token(user_token.google_refresh_token):
                    session.query(UserTokens) \
                        .filter(UserTokens.user_id == user_token.user_id) \
                        .filter(UserTokens.google_refresh_token is not None) \
                        .delete()
                    raise falcon.HTTPUnauthorized(description="Wrong token")

            refresh_token = generate_token({
                'id': user_token.user_id
            }, refresh_token_exp)

            user_token.refresh_token = refresh_token

            session.add(user_token)
            session.flush()

            ret['refresh_token'] = refresh_token

        ret['access_token'] = generate_token({
            'id': user_token.id
        }, access_token_exp)

        res.media = ret


class CollectDiagnosesResource:
    def on_post(self, req, res):

        session = req.context.session

        diagnose = session.query(Diagnose).filter(Diagnose.id == req.media['diagnose_id']).first()

        if not diagnose:
            res.media = "Diagnose doesn't exist"
            res.status = falcon.HTTP_404
            return

        if req.context.user_id:

            user = session.query(User).filter(User.id == req.context.user_id).first()

            if diagnose in user.diagnoses:
                raise falcon.HTTPBadRequest(description="User already has diagnose")
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

            send_email(user.email, token, 'reset')

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
