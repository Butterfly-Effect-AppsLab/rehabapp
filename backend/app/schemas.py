from datetime import datetime, timedelta, date
import random
from marshmallow import Schema, fields, post_load, EXCLUDE, validate
from models import User, Diagnose, Area, Question, Option, Color, Tree, Video, UserDiagnose

first_week_motivations = [
    "Urobte dnes niečo začo sa sám sebe zajtra poďakujete.",
    "Každé cvičenie je jeden krok, bližšie k Vášmu cieľu. Zdravému telu.",
    "Všetko je ťazké, než sa to stane jednoduchým. Tak poďte teda cvičiť!",
    "Vaše zdravé telo je tvorené tým, čo spravíte dnes.",
    "Bez práce nie sú koláče a zdravé telo nie je výnimkou."
]

week_motivations = [
    {
        2: "Napriek tomu, že minulý týždeň nebol až tak úspesný, nevadí, pretože pred sebou máte nový a je to príležitosť, žiadne cvičenie nevynechať.",
        5: "Za posledných 7 dní ste si nadbehli na skvelý a zdravý režim. Čo tak ešte trochu pridať a tentokrát nevynechať ani jedno cvičenie?",
        7: "Za sebou máte úspešný týždeň. Nevynechali ste ani jedno cvičenie a verím, že ani tento nebude vyzerať inak."
    },
    {
        0: "Áno, pondelky bývajú náročné, ale robíte to pre seba. Tak šup šup a dnešné cvičenie určite nevynechajte.",
        1: "Deň jedna si môžete úspešne odfajknúť, už len 6 a budete k zdravšiemu telu opäť o niečo bližšie."
    },
    {
        0: "Ešte nič nie je stratené a máte ešte 5 dní na to, aby ste tento týždeň naplnili svoje rehabilitačné ciele. ",
        1: "Je streda a vy ste zvládli jedno cvičenie z dvoch. Super! Len tak ďalej a do konca týždna už dáte všetky. Však?",
        2: "Prvé dva dni máte úspešne za sebou. Cítite sa lepšie však? A teraz si predstavte ako skvelo sa môžete cítiť do konca týždna ak takto budete pokračovať."
    },
    {
        0: "Tri dni máme za sebou, ale ešte ďalšie 4 pred sebou a preto nie je neskoro na to, aby ste svoje ciele na tento týždeň ešte naplnili.",
        2: "Nejaké to cvičenie ste vynechali, ale nič nie je stratené. Pred sebou máte ešte 4 dni, aby ste tento týždeň ukončili s dobrým pocitom a zdravším telom.",
        3: "Už sme takmer v strede týždňa a vy ste nevynechali ani jedno cvičenie. Super! Len tak ďalej"
    },
    {
        0: "Ľahký deň bol včera, aj tie 3 predtým. Tak poďme cviciť, zdravé telo sa neurobí samo!",
        2: "Ste super. Tak prečo robiť veci polovičato? Odteraz už žiadne cvičenie nevynechať. Dobre?",
        4: "Po náročnom týždni, si človek určite zaslúži oddych, ale nie keď ide o cvičenie a zdravé telo. Doteraz ste išli ako píla a napriek koncu pracovného týždňa si ešte treba trochu zamakať."
    },
    {
        1: "Stalo sa niečo? Už je sobota a vidím, že ste ešte tento týždeň poriadne necvičili. Nevadí, ale od dnes už poďte do toho naplno, uvidíte budete sa cítiť 100x lepšie.",
        3: "Išli ste na to tento týždeň dosť dobre. Čo tak ale dokončiť týždeň naplno a zacvičiť si poćas víkendu?",
        5: "Všetky palce hore. Cez pracovný týždeň sa ľahko hľadajú výhovorky, ale Vám sa podaril pravý opak. Len tak ďalej!"
    },
    {
        2: "Aj keď tento týždeň nebol úplne najlepší, nič to nemení na tom, že od dnes do toho môžete ísť naplno.",
        4: "Myslím, že môžem zhodnotiť, že za sebou máte dobrý týždeň. Ale šlo by to predsa len o trošku lepšie. Tak nie od pondelka, ale od dneška. Dobre?",
        6: "Super! Skvelá práca, už ani k tomu nemám čo viac dodať. Len tak ďalej!"
    },
]


class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(missing='Používateľ')
    email = fields.Email(required=True)
    password = fields.String(validate=validate.Regexp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"),
                             load_only=True, default=None)
    sex = fields.String(validate=validate.OneOf(["male", "female", "other"]), missing='female')
    birthday = fields.Date(missing=date(1990, 1, 1))
    google = fields.Boolean(missing=False, load_only=True)
    verification_token = fields.String(default=None, load_only=True)
    password_reset = fields.String(default=None, load_only=True)

    diagnoses = fields.Nested(lambda: UserDiagnoseSchema(only=["id","name","start_date", "motivation", "week", "chart", "today"]), many=True,
                              dump_only=True)

    @post_load
    def create_model(self, data, **kwargs):
        return User(**data)

    class Meta:
        unknown = EXCLUDE
        ordered = True


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
        ordered = True


class UserDiagnoseSchema(Schema):
    # id = fields.Int(dump_only=True)
    user_id = fields.Int()
    diagnose_id = fields.Int()
    start_date = fields.Date()

    # diagnose = fields.Nested(lambda: DiagnoseSchema(only=["id", "name"]), dump_only=True, many=False)

    chart = fields.Method("get_chart")
    motivation = fields.Method("get_motivation")
    week = fields.Method("get_week")
    today = fields.Method("get_today")

    id = fields.Method("get_id")
    name = fields.Method("get_name")

    def get_chart(self, obj):

        today = datetime.now().date()

        x = list()
        y = list()
        colors = list()

        for i in range(7, -1, -1):
            day_in_week = today - timedelta(days=i)
            backlog = obj.get_backlog_at_date(day_in_week)
            x.append(str(day_in_week))
            level = 0
            if backlog:
                level = backlog.level
            y.append(level)

            color = "rgba(0,0,0,0)"

            if level == 1:
                color = "rgba(138,190,196,1)"
            elif level == 2:
                color = "rgba(208,229,231,1)"
            elif level == 3:
                color = "rgba(211,211,211,1)"
            elif level == 4:
                color = "rgba(252,180,185,1)"
            elif level == 5:
                color = "rgba(234,80,80,1)"

            colors.append(color)

        arrs = {
            'x': x,
            'y': y,
            'colors': colors,
        }
        return arrs

    def get_motivation(self, obj):

        today = datetime.now().date()
        week_day = today.weekday()
        week_passed = (obj.start_date + timedelta(7 - obj.start_date.weekday())) <= today
        if not week_passed:
            return random.choice(first_week_motivations)

        motivations = week_motivations[week_day]

        if week_day == 0:
            week_day = 7

        count = len(obj.get_backlog(week_day))

        key = 0

        for key in sorted(motivations.keys()):
            if count <= key:
                break

        return motivations[key]

    def get_week(self, obj):

        today = datetime.now().date()
        week_day = today.weekday()

        arr = [None] * 7
        for idx, i in enumerate(range(week_day, -1, -1)):
            arr[idx] = (obj.get_backlog_at_date(today - timedelta(days=i)) is not None)

        return arr

    def get_today(self, obj):
        today = datetime.now().date()

        return obj.get_backlog_at_date(today) is not None

    def get_id(self, obj):
        return obj.diagnose.id

    def get_name(self, obj):
        return obj.diagnose.name

    @post_load
    def create_model(self, data, **kwargs):
        return UserDiagnose(**data)

    class Meta:
        unknown = EXCLUDE
        ordered = True


class ColorSchema(Schema):
    background_color = fields.String(data_key="background-color")
    text_color = fields.String(data_key="color")

    @post_load
    def create_model(self, data, **kwargs):
        return Color(**data)

    class Meta:
        unknown = EXCLUDE
        ordered = True


class TreeSchema(Schema):
    name = fields.Str()
    text = fields.Str()

    @post_load
    def create_model(self, data, **kwargs):
        return Tree(**data)

    class Meta:
        unknown = EXCLUDE
        ordered = True


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
        ordered = True


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
        ordered = True


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
        ordered = True


class VideoSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str()
    text = fields.Str()
    diagnose_id = fields.Integer()
    order = fields.Integer()
    size = fields.Integer()
    checksum_video = fields.Str()
    checksum_row = fields.Str()

    @post_load
    def create_model(self, data, **kwargs):
        return Video(**data)

    class Meta:
        unknown = EXCLUDE
        ordered = True
