from iconservice import Address
from iconservice.base.exception import IconScoreException
from tbears.libs.scoretest.score_test_case import ScoreTestCase

from basic_irc2.basic_irc2 import BasicIRC2
from stablecoin.stablecoin import StableCoin


class BaseTestCases:

    class IRC2TestBase(ScoreTestCase):

        def setUp(self, score, params: dict):
            super().setUp()
            self.irc2 = self.get_score_instance(score, self.test_account1,
                                                on_install_params=params)

        def test_setup(self):
            self.assertEqual("Sample Token", self.irc2.name())
            self.assertEqual("STS", self.irc2.symbol())
            self.assertEqual(18, self.irc2.decimals())

        def transfer_test(self):
            self.set_msg(self.test_account1)
            self.irc2.transfer(self.test_account2, 5000 * 10 ** 18)
            self.assertEqual(5000 * 10 ** 18, self.irc2.balanceOf(self.test_account2))
            self.assertEqual(95000 * 10 ** 18, self.irc2.balanceOf(self.test_account1))

            self.set_msg(self.test_account2)
            with self.assertRaises(IconScoreException) as neg_value:
                self.irc2.transfer(self.test_account1, -10000 * 10 ** 18)
            self.assertEqual("Transferring value cannot be less than zero", neg_value.exception.message)

            with self.assertRaises(IconScoreException) as out_of_balance:
                self.irc2.transfer(self.test_account1, 10000 * 10 ** 18)
            self.assertEqual("Out of balance", out_of_balance.exception.message)

            self.assertEqual(100000 * 10 ** 18, self.irc2.totalSupply())


class BasicIRC2Test(BaseTestCases.IRC2TestBase):

    def setUp(self):
        super().setUp(BasicIRC2, {"_name": "Sample Token", "_symbol": "STS", "_initialSupply": 100000, "_decimals": 18})

    def test_setup(self):
        self.assertEqual(100000 * 10 ** 18, self.irc2.totalSupply())
        self.assertEqual(100000 * 10 ** 18, self.irc2.balanceOf(self.test_account1))

    def test_transfer(self):
        self.transfer_test()


class StableCoinTest(BaseTestCases.IRC2TestBase):

    ADMIN = Address.from_string(f"hx{'1234'*10}")
    ISSUER1 = Address.from_string(f"hx{'abcd'*10}")

    def setUp(self):
        super().setUp(StableCoin, {"_name": "Sample Token", "_symbol": "STS", "_decimals": 18,
                                   "_admin": self.ADMIN})
        self.set_msg(self.ADMIN)
        self.irc2.addIssuer(self.ISSUER1)

    def test_setup(self):
        self.assertEqual(self.ADMIN, self.irc2.getAdmin())
        self.assertEqual(False, self.irc2.isPaused())
        self.assertEqual([self.ISSUER1], self.irc2.getIssuers())
        self.assertEqual(50, self.irc2.freeDailyTxLimit())
        self.assertEqual(0, self.irc2.totalSupply())

    def test_total_supply(self):
        self.set_block(500)

        self.set_msg(self.ADMIN)
        self.irc2.approve(self.ISSUER1, 100000*10**18)

        self.set_msg(self.ISSUER1)
        self.irc2.mint(5000*10**18)
        self.assertEqual(5000*10**18, self.irc2.totalSupply())
        self.assertEqual(5000*10**18, self.irc2.balanceOf(self.ISSUER1))
        self.irc2.mintTo(self.test_account1, 4000*10**18)
        self.assertEqual(9000*10**18, self.irc2.totalSupply())
        self.assertEqual(4000*10**18, self.irc2.balanceOf(self.test_account1))
        self.assertEqual(91000*10**18, self.irc2.issuerAllowance(self.ISSUER1))

        self.assertEqual(True, self.irc2.isWhitelisted(self.test_account1))

        self.set_msg(self.test_account1)
        self.irc2.burn(1000*10**18)
        self.assertEqual(3000*10**18, self.irc2.balanceOf(self.test_account1))
        self.assertEqual(8000*10**18, self.irc2.totalSupply())

    def test_change_free_tx_limit(self):
        self.set_msg(self.ADMIN)
        self.irc2.changeFreeDailyTxLimit(67)
        self.assertEqual(67, self.irc2.freeDailyTxLimit())

    def test_issuers(self):
        self.irc2.approve(self.ISSUER1, 100000*10**18)
        self.assertEqual(100000*10**18, self.irc2.issuerAllowance(self.ISSUER1))

        temp_issuer = Address.from_string(f"hx{'abcde' * 8}")
        self.irc2.addIssuer(temp_issuer)
        self.assertEqual([self.ISSUER1, temp_issuer], self.irc2.getIssuers())
        self.irc2.removeIssuer(temp_issuer)
        self.assertEqual([self.ISSUER1], self.irc2.getIssuers())

    def test_paused(self):
        self.set_msg(self.test_account1)
        with self.assertRaises(IconScoreException) as non_admin:
            self.irc2.togglePause()
        self.assertEqual("Only admin can toggle pause", non_admin.exception.message)

        self.set_msg(self.ADMIN)
        self.irc2.togglePause()
        self.assertEqual(True, self.irc2.isPaused())

    def test_transfer_admin(self):
        self.set_msg(self.ADMIN)
        self.irc2.transferAdminRight(self.test_account2)
        self.assertEqual(self.test_account2, self.irc2.getAdmin())

    def test_transfer(self):
        self.set_msg(self.ADMIN)
        self.irc2.approve(self.ISSUER1, 100000 * 10 ** 18)

        self.set_msg(self.ISSUER1)
        self.irc2.mint(5000 * 10 ** 18)

        self.irc2.transfer(self.test_account2, 2000 * 10 ** 18)
        self.assertEqual(2000 * 10 ** 18, self.irc2.balanceOf(self.test_account2))
        self.assertEqual(3000 * 10 ** 18, self.irc2.balanceOf(self.ISSUER1))

        self.set_msg(self.test_account2)
        with self.assertRaises(IconScoreException) as neg_value:
            self.irc2.transfer(self.test_account1, -10000 * 10 ** 18)
        self.assertEqual("Cannot transfer zero or less", neg_value.exception.message)

        with self.assertRaises(IconScoreException) as out_of_balance:
            self.irc2.transfer(self.test_account1, 10000 * 10 ** 18)
        self.assertEqual("Insufficient Balance", out_of_balance.exception.message)

        self.assertEqual(5000 * 10 ** 18, self.irc2.totalSupply())

        self.set_msg(self.ADMIN)
        self.irc2.togglePause()
        with self.assertRaises(IconScoreException) as paused:
            self.set_msg(self.ISSUER1)
            self.irc2.transfer(self.test_account2, 1000*10**18)
        self.assertEqual("Cannot transfer when paused", paused.exception.message)

    def test_remaining_free_tx_limit(self):
        self.set_block(100)
        self.set_msg(self.ADMIN)
        self.irc2.approve(self.ISSUER1, 100000 * 10 ** 18)

        self.set_msg(self.ISSUER1)
        self.irc2.mint(5000 * 10 ** 18)

        self.assertEqual(49, self.irc2.remainingFreeTxThisTerm(self.ISSUER1))
        for i in range(49):
            self.irc2.transfer(self.test_account2, 1)
            self.assertEqual(48-i, self.irc2.remainingFreeTxThisTerm(self.ISSUER1))
        self.set_block(50000)
        self.assertEqual(50, self.irc2.remainingFreeTxThisTerm(self.ISSUER1))
