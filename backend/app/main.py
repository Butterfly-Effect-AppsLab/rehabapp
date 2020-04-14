import falcon

from models import Session, Quote, Author
from schemas import QuoteSchema, AuthorSchema

author_schema = AuthorSchema()
authors_schema = AuthorSchema(many=True)
quote_schema = QuoteSchema()
quotes_schema = QuoteSchema(many=True)


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
        res.media = "OK"

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


api = falcon.API()
api.add_route('/', MyResource())
api.add_route('/quotes', QuoteCollection())
api.add_route('/quotes/{quote_id:int}', QuoteResource())
