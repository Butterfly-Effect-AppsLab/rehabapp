import falcon


class TestResource:
    def on_get(self, req, res):
        res.media = "Saying HI from RehabApp API :)"


api = falcon.API()
api.add_route('/', TestResource())
