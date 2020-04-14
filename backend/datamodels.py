import falcon
from models import Quote

print('Hello')


class QuoteCollection:
    def on_get(self, req, resp):
        quotes = Quote.select()

        resp_quotes = []
        for quote in quotes:
            q = {
                'id': quote.id,
                'text': quote.text,
                'author': quote.author
            }
            resp_quotes.append(q)

        resp.media = resp_quotes

    def on_post(self, req, resp):
        data = req.media
        q = Quote.create(text=data['text'], author=data['author'])
        resp.status = falcon.HTTP_201
        resp.media = {
            'id': q.id,
            'text': q.text,
            'author': q.author
        }


class SingleQuote:
    def on_get(self, req, resp, quote_id):
        qoute = Quote.get_or_none(Quote.id == quote_id)
        if qoute:
            resp.media = {
                "id": qoute.id,
                "text": qoute.text,
                "author": qoute.author
            }
        else:
            resp.status = falcon.HTTP_404
            resp.media = "Incorrect id: " + quote_id

    def on_delete(self, req, resp, quote_id):
        quote = Quote.get_or_none(Quote.id == quote_id)
        if quote:
            quote.delete_instance()
            resp.media = "Done"
        else:
            resp.status = falcon.HTTP_404
            resp.media = "Incorrect id: " + quote_id


api = falcon.API()
api.add_route('/quotes', QuoteCollection)
api.add_route('/quote/{quote_id}', SingleQuote)
