from datetime import datetime, timedelta
import cv2
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
from schemas import UserSchema, AreaSchema, QuestionSchema, DiagnoseSchema, VideoSchema
from send_email import send_email
import hashlib
import json
import base64
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


class VideoResource:
    def on_get(self, req, res, id):
        session = req.context.session

        # check if user has diagnose
        user = session.query(User).filter(User.id == req.context.user_id).first()

        diagnose = session.query(Diagnose).filter(Diagnose.id == id).first()

        if not diagnose:
            raise falcon.HTTPBadRequest(description="Diagnose doesn't exist")

        # if diagnose not in user.diagnoses:
        #     raise falcon.HTTPBadRequest(description="User doesn't have this diagnose")

        video_schema = VideoSchema(many=True, only=['id', 'size'])

        size = diagnose.videos_size

        res.media = {
            'size': size,
            'formatted_size': diagnose.formatted_videos_size(size=size),
            'ids': video_schema.dump(diagnose.videos),
        }

    def on_get_data(self, req, res, id):
        session = req.context.session

        # check if user has diagnose
        user = session.query(User).filter(User.id == req.context.user_id).first()

        video = session.query(Video).filter(Video.id == id).first()

        if not video:
            raise falcon.HTTPBadRequest(description="Video doesn't exist")

        # if video.diagnose not in user.diagnoses:
        #     raise falcon.HTTPBadRequest(description="User doesn't have this video's diagnose")

        video_schema = VideoSchema()

        json_video = video_schema.dump(video)

        m = hashlib.md5()
        m.update(video_schema.dumps(video).encode())
        json_video['checksum_data'] = m.hexdigest()

        res.media = {
            'video': json_video
        }

    def on_get_video(self, req, res, id):
        session = req.context.session

        # check if user has diagnose
        user = session.query(User).filter(User.id == req.context.user_id).first()

        video = session.query(Video).filter(Video.id == id).first()

        if not video:
            raise falcon.HTTPBadRequest(description="Video doesn't exist")

        # if video.diagnose not in user.diagnoses:
        #     raise falcon.HTTPBadRequest(description="User doesn't have this video's diagnose")

        res.content_type = 'video/mp4'
        res.data = open(f"videos/{video.name}", 'rb').read()

# how to send img as base64encoded string
# video_schema = VideoSchema(many=True, only=['id', 'size'])
#
# size = diagnose.videos_size
#
# res.media = {
#     'size': size,
#     'formatted_size': diagnose.formatted_videos_size(size=size),
#     'ids': video_schema.dump(diagnose.videos)
# }

# res.content_type = 'video/mp4'
# print(open('Rehappka.mp4', 'rb').read())
# res.data = open('Rehappka.mp4', 'rb').read()
# video = open('Rehappka.mp4', 'rb').read()

# res.media = {
#     'video': base64.b64encode(video).decode('utf-8'),
#     # 'videos': [base64.b64encode(video).decode('utf-8') for i in range(1000)]
# }

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

    def on_put(self, req, res):
        session = req.context.session
        user = session.query(User).filter(User.id == req.context.user_id).first()

        user_schema = UserSchema()

        try:
            new_user = user_schema.load(req.media, partial=True)

            user.name = new_user.name
            user.sex = new_user.sex
            user.birthday = new_user.birthday

            if 'collected_id' in req.media:
                user_diagnose = session.query(UserDiagnose).filter(UserDiagnose.id == req.media['collected_id']).first()

                if not user_diagnose:
                    raise falcon.HTTPBadRequest(description="Collected diagnose doesn't exist")

                if user_diagnose.diagnose not in user.diagnoses:
                    user_diagnose.user_id = user.id
                    session.add(user_diagnose)
                    session.commit()

            session.add(user)
            session.flush()

            res.media = user_schema.dump(user)

        except ValidationError as err:
            res.media = err.messages
            res.status = falcon.HTTP_400


class RegistrationResource:
    def on_post(self, req, res):

        session = req.context.session

        exist_user = session.query(User).filter(User.email == req.media['email']).first()

        if exist_user and exist_user.password:
            raise falcon.HTTPBadRequest(description="User with email already exists")

        user_schema = UserSchema()

        try:
            if exist_user:
                user_schema.load({
                    'password': req.media['password']
                }, partial=True)
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


class LogoutResource:
    def on_post(self, req, res):
        session = req.context.session

        user_token = session.query(UserTokens).filter(UserTokens.refresh_token == req.media['refresh_token']).first()

        if not user_token:
            raise falcon.HTTPBadRequest(description="User already logged out")

        session.delete(user_token)


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
        # email_verified = False

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
                        .filter(UserTokens.google_refresh_token != None) \
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

            user_schema = UserSchema()
            user = session.query(User).filter(User.id == req.context.user_id).first()

            if diagnose in user.diagnoses:
                raise falcon.HTTPBadRequest(description="User already has diagnose")
            else:
                user.diagnoses.append(diagnose)

                session.add(user)
                session.flush()

                res.status = falcon.HTTP_200
                res.media = {
                    'diagnoses': user_schema.dump(user)['diagnoses']
                }

        else:
            collect = UserDiagnose()
            collect.diagnose = diagnose

            session.add(collect)
            session.flush()

            res.status = falcon.HTTP_201
            res.media = {
                'collected_id': collect.id,
                'name': diagnose.name
            }

    def on_delete(self, req, res):

        session = req.context.session

        diagnose = session.query(Diagnose).filter(Diagnose.id == req.media['diagnose_id']).first()

        if not diagnose:
            res.media = "Diagnose doesn't exist"
            res.status = falcon.HTTP_404
            return

        user_schema = UserSchema()
        user = session.query(User).filter(User.id == req.context.user_id).first()

        if diagnose not in user.diagnoses:
            raise falcon.HTTPBadRequest(description="User doesn't have this diagnose")
        else:
            user_diagnose = session.query(UserDiagnose) \
                .filter(UserDiagnose.user_id == user.id) \
                .filter(UserDiagnose.diagnose_id == diagnose.id) \
                .filter(UserDiagnose.deleted == False) \
                .first()

            user_diagnose.deleted = True

            session.add(user_diagnose)
            session.commit()

            res.status = falcon.HTTP_200
            res.media = {
                'diagnoses': user_schema.dump(user)['diagnoses']
            }


class ForgotPasswordResource:
    def on_post(self, req, res):

        session = req.context.session

        user = session.query(User).filter(User.email == req.media['email']).first()

        if not user:
            raise falcon.HTTPBadRequest(description="Email not registered.")

        if user.verification_token:
            raise falcon.HTTPBadRequest(description="Email not verified.")

        token = generate_token(
            {
                'id': user.id,
            },
            {
                'hours': 24
            }
        )

        user.password_reset = token
        session.add(user)

        send_email(user.email, token, 'reset')

        res.media = "Email has been sent."


class ResetPasswordResource:
    def on_post(self, req, res):

        session = req.context.session

        token = req.media['token']

        if not token:
            raise falcon.HTTPBadRequest(description="No token")

        try:
            payload = jwt.decode(token, KEY, algorithm='HS256')
        except ExpiredSignatureError:
            raise falcon.HTTPBadRequest(description="Token has expired. Request a new one.")
        except (InvalidSignatureError, DecodeError, InvalidTokenError):
            raise falcon.HTTPBadRequest(description="Wrong token")

        user = session.query(User).filter(User.id == payload['id']).first()

        if not user:
            raise falcon.HTTPBadRequest(description="Wrong token")

        if user.password_reset != req.media['token']:
            raise falcon.HTTPBadRequest(description="Wrong token")

        user_schema = UserSchema()

        try:
            user_schema.load({
                'password': req.media['password']
            }, partial=True)

            user.password = req.media['password']
            user.password_reset = None

            session.query(UserTokens) \
                .filter(UserTokens.user_id == user.id) \
                .filter(UserTokens.google_refresh_token == None) \
                .delete()

            session.add(user)

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
        except ValidationError as err:
            res.media = err.messages
            res.status = falcon.HTTP_400
