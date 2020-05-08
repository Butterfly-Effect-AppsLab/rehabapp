from marshmallow import Schema, fields, post_load, EXCLUDE, validate, pre_dump
from models import User, Diagnose, Area, Question, Option


class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    email = fields.Email(required=True)
    password = fields.String(validate=validate.Length(min=8), required=True, load_only=True)
    sex = fields.String(validate=validate.OneOf(["male", "female"]), required=True)
    birthday = fields.Date(required=True)

    @post_load
    def create_model(self, data, **kwargs):
        return User(**data)

    class Meta:
        unknown = EXCLUDE


class DiagnoseSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str()
    text = fields.Str(default='')

    @post_load
    def create_model(self, data, **kwargs):
        return Diagnose(**data)

    class Meta:
        unknown = EXCLUDE


class AreaSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str()

    @post_load
    def create_model(self, data, **kwargs):
        return Area(**data)

    class Meta:
        unknown = EXCLUDE


class QuestionSchema(Schema):
    id = fields.Int(dump_only=True)
    text = fields.Str()
    color_id = fields.Integer()
    prepend_id = fields.Integer()

    @post_load
    def create_model(self, data, **kwargs):
        return Question(**data)

    class Meta:
        unknown = EXCLUDE


class OptionSchema(Schema):
    id = fields.Int(dump_only=True)
    question_id = fields.Integer(default=None)
    area_id = fields.Integer(default=None)
    label = fields.String()
    next_question_id = fields.Integer(default=None)
    next_diagnose_id = fields.Integer(default=None)
    next_area_id = fields.Integer(default=None)

    @post_load
    def create_model(self, data, **kwargs):
        return Option(**data)

    class Meta:
        unknown = EXCLUDE
