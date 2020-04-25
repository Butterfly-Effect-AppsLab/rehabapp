from falcon import testing
from main import init_api


class MainTestCase(testing.TestCase):
    def setUp(self):
        super(MainTestCase, self).setUp()
        self.app = init_api()
