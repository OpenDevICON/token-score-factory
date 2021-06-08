from ..mintpause_irc2 import MintPauseIRC2
from tbears.libs.scoretest.score_test_case import ScoreTestCase


class TestMintPauseIRC2(ScoreTestCase):

    def setUp(self):
        super().setUp()
        self.score = self.get_score_instance(MintPauseIRC2, self.test_account1)

    def test_hello(self):
        self.assertEqual(self.score.hello(), "Hello")
