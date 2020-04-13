from marshmallow import Schema, fields


class AuthorSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str()


class QuoteSchema(Schema):
    id = fields.Int(dump_only=True)
    text = fields.Str()
    author = fields.Nested(AuthorSchema)
