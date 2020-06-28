import datetime

from marshmallow import Schema, fields, post_load, EXCLUDE, validate
from models import User, Diagnose, Area, Question, Option, Color, Tree


class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(missing='Používateľ')
    email = fields.Email(required=True)
    password = fields.String(validate=validate.Regexp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"),
                             load_only=True, default=None)
    sex = fields.String(validate=validate.OneOf(["male", "female", "other"]), missing='female')
    birthday = fields.Date(missing=datetime.date(1990, 1, 1))
    google = fields.Boolean(missing=False, load_only=True)
    verification_token = fields.String(default=None, load_only=True)
    password_reset = fields.String(default=None, load_only=True)

    diagnoses = fields.Nested(lambda: DiagnoseSchema(only=("id", "name", "svk")), many=True, dump_only=True)

    @post_load
    def create_model(self, data, **kwargs):
        return User(**data)

    class Meta:
        unknown = EXCLUDE


class DiagnoseSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str()
    svk = fields.Str(default='')
    definition = fields.Str(default=None)
    symptoms = fields.Str(default=None)
    cause = fields.Str(default=None)
    diagnostic = fields.Str(default=None)
    cure = fields.Str(default=None)
    prevention = fields.Str(default=None)

    type = fields.String(default='diagnose', dump_only=True)

    @post_load
    def create_model(self, data, **kwargs):
        return Diagnose(**data)

    class Meta:
        unknown = EXCLUDE


class ColorSchema(Schema):
    background_color = fields.String(data_key="background-color")
    text_color = fields.String(data_key="color")

    @post_load
    def create_model(self, data, **kwargs):
        return Color(**data)

    class Meta:
        unknown = EXCLUDE


class TreeSchema(Schema):
    name = fields.Str()
    text = fields.Str()

    @post_load
    def create_model(self, data, **kwargs):
        return Tree(**data)

    class Meta:
        unknown = EXCLUDE


class QuestionSchema(Schema):
    text = fields.Str()
    color_id = fields.Integer(load_only=True)
    prepend_id = fields.Integer(load_only=True)
    color = fields.Nested(ColorSchema(), many=False, dump_only=True, data_key="style")
    prepend = fields.Method("get_prepend")
    options = fields.Nested(lambda: OptionSchema(only=("id", "text", "ref")), many=True, dump_only=True)
    type = fields.String(default='question', dump_only=True)

    def get_prepend(self, question):
        return question.prepend.text

    @post_load
    def create_model(self, data, **kwargs):
        return Question(**data)

    class Meta:
        unknown = EXCLUDE


class OptionSchema(Schema):
    id = fields.Int(dump_only=True)
    question_id = fields.Integer(default=None)
    area_id = fields.Integer(default=None)
    label = fields.String(default=None)
    side = fields.String(default=None)
    text = fields.String()
    next_question_id = fields.Integer(default=None)
    next_diagnose_id = fields.Integer(default=None)
    next_area_id = fields.Integer(default=None)
    ref = fields.Method("next_option")

    def next_option(self, option):
        return option.next_option.unique_id

    @post_load
    def create_model(self, data, **kwargs):
        return Option(**data)

    class Meta:
        unknown = EXCLUDE


class AreaSchema(Schema):
    type = fields.String(default='area', dump_only=True)
    name = fields.Str()
    tree = fields.Nested(TreeSchema, many=False)
    x = fields.Float()
    y = fields.Float()
    width = fields.Float()
    height = fields.Float()
    options = fields.Nested(OptionSchema(only=("id", "text", "label", "ref", "side")), many=True, dump_only=True)

    @post_load
    def create_model(self, data, **kwargs):
        return Area(**data)

    class Meta:
        unknown = EXCLUDE
