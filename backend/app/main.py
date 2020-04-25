import falcon

from middlewares import SessionMiddleware, CORSComponent
from resources import *


def init_api():
    api_tmp = falcon.API(middleware=[SessionMiddleware(), CORSComponent()])
    api_tmp.add_route('/', TestResource())
    api_tmp.add_route('/questions', QuestionsResource())
    api_tmp.add_route('/users', UsersResource())
    return api_tmp


api = init_api()
