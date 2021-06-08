from ..burnpause_irc2 import BurnPauseIRC2
from tbears.libs.scoretest.score_test_case import ScoreTestCase


class TestBurnPauseIRC2(ScoreTestCase):

    def setUp(self):
        super().setUp()
        self.score = self.get_score_instance(BurnPauseIRC2, self.test_account1)

    def test_hello(self):
        self.assertEqual(self.score.hello(), "Hello")
