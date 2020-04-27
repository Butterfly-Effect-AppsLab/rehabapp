from schemas import UserSchema
from test.main_test_class import MainTestCase
from datetime import date


class TestRegistration(MainTestCase):
    def test_get_message(self):
        data = {
            "name": "Jozko",
            "email": "tester@jozko.sk",
            "password": "heslo1234",
            "sex": "male",
            "birthday": "1968-12-06"
        }

        result = self.simulate_post('/test/registration', json=data)

        res = result.json

        del res['id']
        del data['password']

        self.assertDictEqual(res, data)
