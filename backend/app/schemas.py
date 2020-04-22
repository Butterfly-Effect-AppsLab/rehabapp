from marshmallow import Schema, fields, post_load, EXCLUDE

from models import Quote


class AuthorSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str()
    quotes = fields.Nested('QuoteSchema', many=True, exclude=['author'])


class QuoteSchema(Schema):
    id = fields.Int(dump_only=True)
    text = fields.Str()
    author = fields.Nested(AuthorSchema)

    @post_load
    def make_quote(self, data, **kwargs):
        return Quote(**data)

    class Meta:
        unknown = EXCLUDE
