import falcon

from config_dev import GOOGLE_CLIENT_ID
from middlewares import SessionMiddleware, CORSMiddleware, AuthMiddleware
from resources import *
from oauthlib.oauth2 import WebApplicationClient
import requests


def init_api():
    api_tmp = falcon.API(
        middleware=[
            SessionMiddleware(),
            CORSMiddleware(),
            AuthMiddleware(exclude_paths=[
                '',
                'questions',
                'registration',
                'login',
                'forgotPassword',
                'resetPassword',
                'refresh'
            ])
        ]
    )
    api_tmp.add_route('/', TestResource())
    api_tmp.add_route('/questions', QuestionsResource())
    api_tmp.add_route('/questions/update/{checksum}', UpdateQuestionsResource())
    api_tmp.add_route('/registration', RegistrationResource())
    api_tmp.add_route('/login', LoginResource())
    api_tmp.add_route('/login/oauth/google', OauthGoogleResource())
    api_tmp.add_route('/login/oauth/fb', OauthFbResource())
    api_tmp.add_route('/login/oauth/google/callback', OauthGoogleCallbackResource())
    api_tmp.add_route('/login/oauth/fb/callback', OauthFbCallbackResource())
    api_tmp.add_route('/forgotPassword', ForgotPasswordResource())
    api_tmp.add_route('/resetPassword', ResetPasswordResource())
    api_tmp.add_route('/refresh', RefreshTokenResource())
    api_tmp.add_route('/users/me', MeResource())
    # api_tmp.add_route('/users/diagnoses/{diagnose_id:int}', UserDiagnosesResource())
    return api_tmp


api = init_api()
