import falcon

from middlewares import SessionMiddleware
from resources import *


def init_api():
    api_tmp = falcon.API(middleware=[SessionMiddleware()])
    api_tmp.add_route('/', TestResource())
    api_tmp.add_route('/questions', QuestionsResource())
    return api_tmp


api = init_api()
