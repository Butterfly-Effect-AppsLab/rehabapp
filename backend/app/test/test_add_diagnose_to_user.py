from models import Session, User, Diagnose
from schemas import UserSchema, DiagnoseSchema
from test.main_test_class import MainTestCase


class TestAddDiagnoseToUser(MainTestCase):
    def test_get_message(self):

        session = Session()

        diagnose_schema = DiagnoseSchema()

        diagnose = Diagnose(name="My test diagnose", text="My test diagnose description")

        session.add(diagnose)
        session.commit()

        data = {
            "diagnose_id": diagnose.id,
        }

        try:
            result = self.simulate_post(f'/test/users/diagnoses', json=data,
                                        headers={
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3RlckB0ZXN0ZXIuc2siLCJjcmVhdGVkX2F0IjoxNTg4MTQ2MDMyLjM3MTI0OH0.oZuQTEdJW77LeMWEf0ITOWW7_8hV6OkDyYRB_m-iqMY'})
        finally:
            session.delete(diagnose)
            session.commit()

        session.delete(diagnose)
        session.commit()

        self.assertIn(diagnose_schema.dump(diagnose), result.json)
