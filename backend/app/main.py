import falcon

from middlewares import SessionMiddleware, CORSMiddleware, AuthMiddleware
from resources import *


def init_api():
    api_tmp = falcon.API(
        middleware=[
            SessionMiddleware(),
            CORSMiddleware(),
            AuthMiddleware(exclude_paths=[
                '/',
                '/questions',
                '/registration',
                '/login'
            ])
        ]
    )
    api_tmp.add_route('/', TestResource())
    api_tmp.add_route('/questions', QuestionsResource())
    api_tmp.add_route('/registration', RegistrationResource())
    api_tmp.add_route('/users/me', MeResource())
    api_tmp.add_route('/users/{user_id:int}/diagnoses', UserDiagnosesResource())
    api_tmp.add_route('/login', LoginResource())
    return api_tmp


api = init_api()
