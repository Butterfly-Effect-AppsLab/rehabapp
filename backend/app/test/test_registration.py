from schemas import UserSchema
from test.main_test_class import MainTestCase
from datetime import date


class TestMyApp(MainTestCase):
    def test_get_message(self):

        birthday = date(1968, 12, 6)

        data = {
            "name": "Jozko",
            "email": "tester@jozko.sk",
            "password": "heslo1234",
            "sex": "male",
            "birthday": f"{birthday}"
        }
        result = self.simulate_post('/test/users', json=data)

        res = result.json
        del res['id']

        data["birthday"] = birthday

        user_schema = UserSchema()
        user = user_schema.dump(data)

        self.assertDictEqual(user, res)
