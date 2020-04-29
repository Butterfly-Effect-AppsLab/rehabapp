from test.main_test_class import MainTestCase


class TestMe(MainTestCase):
    def test_successful_login(self):
        result = self.simulate_post('/test/login', json={
            "email": "jozko@jozko.sk",
            "password": "heslo1234"
        })

        res = result.json

        del res['user']['id']

        data = {
            "name": "Jozko",
            "email": "jozko@jozko.sk",
            "sex": "male",
            "birthday": "1968-12-06"
        }

        self.assertDictEqual(res['user'], data)

    def test_unsuccessful_login(self):
        # wrong email
        result = self.simulate_post('/test/login', json={
            "email": "jozko@jozkooo.sk",
            "password": "heslo1234"
        })

        self.assertEqual(result.status_code, 401)

        # wrong password
        result = self.simulate_post('/test/login', json={
            "email": "jozko@jozko.sk",
            "password": "heslo12345678"
        })

        self.assertEqual(result.status_code, 401)

    def test_multiple_logins(self):
        # first login
        first_result = self.simulate_post('/test/login', json={
            "email": "jozko@jozko.sk",
            "password": "heslo1234"
        })

        # second login
        second_result = self.simulate_post('/test/login', json={
            "email": "jozko@jozko.sk",
            "password": "heslo1234"
        })

        self.assertNotEqual(first_result.json['token'], second_result.json['token'])
