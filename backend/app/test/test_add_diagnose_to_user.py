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

        result = self.simulate_post(f'/test/users/diagnoses', json=data,
                                    headers={
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImpvemtvQGpvemtvLnNrIn0.LU2M7QM5p-1mjRBXvb1BSED-95GCg-y_3OCGTceZjE0'})

        session.delete(diagnose)
        session.commit()

        self.assertIn(diagnose_schema.dump(diagnose), result.json)
