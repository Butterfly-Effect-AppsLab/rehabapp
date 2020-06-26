from middlewares import SessionMiddleware, CORSMiddleware, AuthMiddleware
from resources import *


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
                'refresh',
                'checkEmail'
            ])
        ]
    )
    api_tmp.add_route('/', TestResource())
    api_tmp.add_route('/questions', QuestionsResource())
    api_tmp.add_route('/questions/update/{checksum}', UpdateQuestionsResource())
    api_tmp.add_route('/registration', RegistrationResource())
    api_tmp.add_route('/login', LoginResource())
    api_tmp.add_route('/login/oauth/google', OauthGoogleResource())
    api_tmp.add_route('/login/oauth/google/code', OauthGoogleResource(), suffix='code')
    # api_tmp.add_route('/login/oauth/fb', OauthFbResource())
    # api_tmp.add_route('/login/oauth/fb/callback', OauthFbCallbackResource())
    api_tmp.add_route('/forgotPassword', ForgotPasswordResource())
    api_tmp.add_route('/resetPassword', ResetPasswordResource())
    api_tmp.add_route('/refresh', RefreshTokenResource())
    api_tmp.add_route('/users/me', MeResource())
    api_tmp.add_route('/checkEmail', CheckEmailResource())
    api_tmp.add_route('/collectDiagnoses', CollectDiagnosesResource())
    return api_tmp


api = init_api()
