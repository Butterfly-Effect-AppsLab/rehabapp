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
                'logout',
            ])
        ]
    )

    api_tmp.add_route('/', TestResource())
    api_tmp.add_route('/questions', QuestionsResource())
    api_tmp.add_route('/questions/update/{checksum}', UpdateQuestionsResource())
    api_tmp.add_route('/registration', RegistrationResource())
    api_tmp.add_route('/registration/confirmation', RegistrationResource(), suffix='confirmation')
    api_tmp.add_route('/login', LoginResource())
    api_tmp.add_route('/logout', LogoutResource())
    api_tmp.add_route('/login/oauth/google', OauthGoogleResource())
    api_tmp.add_route('/login/oauth/google/code', OauthGoogleResource(), suffix='code')
    # api_tmp.add_route('/login/oauth/fb', OauthFbResource())
    # api_tmp.add_route('/login/oauth/fb/callback', OauthFbCallbackResource())
    api_tmp.add_route('/forgotPassword', ForgotPasswordResource())
    api_tmp.add_route('/resetPassword', ResetPasswordResource())
    api_tmp.add_route('/refresh', RefreshTokenResource())
    api_tmp.add_route('/users/me', MeResource())
    api_tmp.add_route('/collectDiagnoses', CollectDiagnosesResource())
    api_tmp.add_route('/painLevel', PainLevelResource())
    api_tmp.add_route('/diagnoses/{id}/videos', VideoResource())
    api_tmp.add_route('/diagnoses/videos/{id}/data', VideoResource(), suffix='data')
    api_tmp.add_route('/diagnoses/videos/{id}/video', VideoResource(), suffix='video')
    return api_tmp


api = init_api()
