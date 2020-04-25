from tests.main_test_class import MainTestCase


class TestMyApp(MainTestCase):
    def test_get_message(self):
        data = {
            "name": "Jozko",
            "email": "tester@jozko.sk",
            "password": "heslo1234",
            "sex": "male",
            "birthday": "1968-12-06"
        }
        result = self.simulate_post('/test/users', json=data)

        for key, value in data.items():
            if key == "password":
                continue
            self.assertEqual(result.json[key], value)
