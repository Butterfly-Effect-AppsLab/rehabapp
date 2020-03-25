from peewee import *

db = SqliteDatabase('quotes.db')

class Quote(Model):
    id = AutoField()
    text = CharField()
    author = CharField()

    class Meta:
        database = db

db.create_tables([Quote])