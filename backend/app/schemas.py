from marshmallow import Schema, fields, post_load, EXCLUDE, validate, pre_dump
from models import User, Diagnose, Area, Question, Option, Color


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
    name = fields.Str()
    text = fields.Str(default='')
    type = fields.String(default='diagnose')

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


class QuestionSchema(Schema):
    text = fields.Str()
    color_id = fields.Integer(load_only=True)
    prepend_id = fields.Integer(load_only=True)
    color = fields.Nested(ColorSchema(), many=False, dump_only=True, data_key="style")
    prepend = fields.Method("get_prepend")
    options = fields.Nested(lambda: OptionSchema(only=("id", "text", "ref")), many=True, dump_only=True)
    type = fields.String(default='question')

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


# class AreaDetailSchema(Schema):
#     id = fields.Int(dump_only=True)
#     x = fields.Float()
#     y = fields.Float()
#     width = fields.Float()
#     height = fields.Float()
#     area_id = fields.Integer(load_only=True)
#
#     @post_load
#     def create_model(self, data, **kwargs):
#         return AreaDetail(**data)
#
#     class Meta:
#         unknown = EXCLUDE


class AreaSchema(Schema):
    type = fields.String(default='area')
    name = fields.Str()
    tree = fields.Str()
    label = fields.Str()
    text = fields.Str()
    # area_detail = fields.Nested(AreaDetailSchema, many=False, dump_only=True)
    options = fields.Nested(OptionSchema(only=("id", "text", "label", "ref")), many=True, dump_only=True)

    @post_load
    def create_model(self, data, **kwargs):
        return Area(**data)

    class Meta:
        unknown = EXCLUDE
