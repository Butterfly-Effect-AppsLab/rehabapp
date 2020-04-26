from test.main_test_class import MainTestCase


class TestMe(MainTestCase):
    def test_logged_in(self):
        result = self.simulate_get('/test/users/me', headers={
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImpvemtvQGpvemtvLnNrIn0.LU2M7QM5p-1mjRBXvb1BSED-95GCg-y_3OCGTceZjE0'})

        data = {
            "name": "Jozko",
            "email": "jozko@jozko.sk",
            "sex": "male",
            "birthday": "1968-12-06"
        }

        res = result.json

        del res['id']

        self.assertDictEqual(res, data)

    def test_logged_out(self):
        result = self.simulate_get('/test/users/me')

        self.assertEqual(result.status_code, 401)
