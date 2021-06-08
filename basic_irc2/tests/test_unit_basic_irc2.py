from ..basic_irc2 import BasicIRC2
from tbears.libs.scoretest.score_test_case import ScoreTestCase


class TestBasicIRC2(ScoreTestCase):

    def setUp(self):
        super().setUp()
        self.score = self.get_score_instance(BasicIRC2, self.test_account1)

    def test_hello(self):
        self.assertEqual(self.score.hello(), "Hello")
