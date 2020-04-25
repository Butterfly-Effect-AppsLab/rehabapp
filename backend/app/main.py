import falcon

from middlewares import SessionMiddleware, CORSComponent
from resources import *


def init_api():
    api_tmp = falcon.API(middleware=[SessionMiddleware(), CORSComponent()])
    api_tmp.add_route('/', TestResource())
    api_tmp.add_route('/questions', QuestionsResource())
    api_tmp.add_route('/users', UsersResource())
    api_tmp.add_route('/users/{user_id:int}/diagnoses', UserDiagnosesResource())
    return api_tmp


api = init_api()
