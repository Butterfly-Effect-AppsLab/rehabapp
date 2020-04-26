from models import Session, User, Diagnose
from schemas import UserSchema, DiagnoseSchema
from test.main_test_class import MainTestCase


class TestAddDiagnoseToUser(MainTestCase):
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

        result = self.simulate_post(f'/test/users/{user.id}/diagnoses', json=data,
                                    headers={
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImpvemtvQGpvemtvLnNrIn0.LU2M7QM5p-1mjRBXvb1BSED-95GCg-y_3OCGTceZjE0'})

        session.rollback()

        diagnose_schema = DiagnoseSchema()

        self.assertIn(diagnose_schema.dump(diagnose), result.json)
