from test.main_test_class import MainTestCase


class TestMe(MainTestCase):
    def test_logged_in(self):
        result = self.simulate_get('/test/users/me', headers={
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3RlckB0ZXN0ZXIuc2siLCJjcmVhdGVkX2F0IjoxNTg4MTQ2MDMyLjM3MTI0OH0.oZuQTEdJW77LeMWEf0ITOWW7_8hV6OkDyYRB_m-iqMY'})

        data = {
            "name": "Tester Tester",
            "email": "tester@tester.sk",
            "sex": "male",
            "birthday": "1968-12-06"
        }

        res = result.json

        del res['id']

        self.assertDictEqual(res, data)

    def test_logged_out(self):
        result = self.simulate_get('/test/users/me')

        self.assertEqual(result.status_code, 401)
