from models import Session, User, Diagnose
from schemas import UserSchema, DiagnoseSchema
from test.main_test_class import MainTestCase


class TestMyApp(MainTestCase):
    def test_get_message(self):

        session = Session()

        user = session.query(User).first()

        if not user:
            data = {
                "name": "Jozko",
                "email": "tester@jozko.sk",
                "password": "heslo1234",
                "sex": "male",
                "birthday": "1968-12-06"
            }

            user_schema = UserSchema()
            user = user_schema.load(data)
            session.add(user)
            session.flush()

        diagnose = session.query(Diagnose).first()

        data = {
            "diagnose_id": diagnose.id,
        }

        result = self.simulate_post(f'/test/users/{user.id}/diagnoses', json=data)

        session.rollback()

        diagnose_schema = DiagnoseSchema()

        print(result.json)

        self.assertIn(diagnose_schema.dump(diagnose), result.json)
