from test.main_test_class import MainTestCase


class TestMyApp(MainTestCase):
    def test_get_message(self):
        result = self.simulate_get('/test/')
        self.assertEqual(result.json, "Saying HI from RehabApp API :)")
