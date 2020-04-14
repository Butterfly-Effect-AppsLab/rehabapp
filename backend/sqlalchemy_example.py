import alchemy_models as model
from alchemy_models import Quote


model.Base.metadata.create_all(model.engine)
session = model.Session()
print("-----------------------------------------------")
def add_quotes():

    quote1 = Quote(author="Jozef", text="Ahoj, Svet!")
    quote2 = Quote(author="Vanes", text="Hello, World!")

    print("Authors: " f"{quote1.author, quote2.author}")


    session.add(quote1)
    session.add(quote2)

    session.commit()
    session.close()


# add_quotes()
quotes = session.query(Quote).all()

i = 0
for q in quotes:
    print("Authors: " f"{q.author} said {q.text}")



