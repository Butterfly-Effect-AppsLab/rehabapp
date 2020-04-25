from marshmallow import Schema, fields, post_load, EXCLUDE, validate
from models import User


class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    email = fields.Email(required=True)
    password = fields.String(validate=validate.Length(min=8), required=True, load_only=True)
    sex = fields.String(validate=validate.OneOf(["male", "female"]), required=True)
    birthday = fields.Date(required=True)

    @post_load
    def make_user(self, data, **kwargs):
        return User(**data)

    class Meta:
        unknown = EXCLUDE


class DiagnoseSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str()
    text = fields.Str()
