import falcon

from models import Session, Quote, Author
from schemas import QuoteSchema, AuthorSchema

author_schema = AuthorSchema()
authors_schema = AuthorSchema(many=True)
quote_schema = QuoteSchema()
quotes_schema = QuoteSchema(many=True)

class CORSComponent(object):
    def process_response(self, req, resp, resource, req_succeeded):
        resp.set_header('Access-Control-Allow-Origin', '*')

        if (req_succeeded
            and req.method == 'OPTIONS'
            and req.get_header('Access-Control-Request-Method')
        ):
            # NOTE(kgriffs): This is a CORS preflight request. Patch the
            #   response accordingly.

            allow = resp.get_header('Allow')
            resp.delete_header('Allow')

            allow_headers = req.get_header(
                'Access-Control-Request-Headers',
                default='*'
            )

            resp.set_headers((
                ('Access-Control-Allow-Methods', allow),
                ('Access-Control-Allow-Headers', allow_headers),
                ('Access-Control-Max-Age', '86400'),  # 24 hours
            ))

class QuoteCollection:
    def on_get(self, req, res):
        session = Session()
        quotes = session.query(Quote).all()

        res.media = quotes_schema.dump(quotes)

        # res.media = [{
        #     'id': q.id,
        #     'text': q.text,
        #     'author': q.author
        # } for q in quotes]

        session.close()

    def on_post(self, req, res):
        params = req.media

        session = Session()

        author = Author(name=params['author'])

        quote = Quote(text=params['text'])

        quote.author = author

        session.add(quote)
        session.add(author)
        session.commit()

        res.code = falcon.HTTP_201

        res.media = quote_schema.dump(quote)

        session.close()


class MyResource:
    def on_get(self, req, res):
        res.media = "Vanes je super"

class QuoteResource:
    def on_get(self, req, res, quote_id):
        session = Session()

        quote = session.query(Quote).filter(Quote.id == quote_id).first()

        if quote:
            res.media = quote_schema.dump(quote)
            # res.media = {
            #     'id': quote.id,
            #     'text': quote.text,
            #     'author': quote.author
            # }
        else:
            res.code = falcon.HTTP_404


api = falcon.API(middleware=CORSComponent())
api.add_route('/', MyResource())
api.add_route('/quotes', QuoteCollection())
api.add_route('/quotes/{quote_id:int}', QuoteResource())
