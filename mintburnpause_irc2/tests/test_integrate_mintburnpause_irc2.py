import os

from iconsdk.builder.call_builder import CallBuilder
from iconsdk.builder.transaction_builder import DeployTransactionBuilder, CallTransactionBuilder
from iconsdk.libs.in_memory_zip import gen_deploy_data_content
from iconsdk.signed_transaction import SignedTransaction
from tbears.libs.icon_integrate_test import IconIntegrateTestBase, SCORE_INSTALL_ADDRESS
from iconsdk.wallet.wallet import KeyWallet

DIR_PATH = os.path.abspath(os.path.dirname(__file__))
# EOA_ZERO = Address.from_string('hx' + '0' * 40)

class TestTest(IconIntegrateTestBase):
    TEST_HTTP_ENDPOINT_URI_V3 = "http://127.0.0.1:9000/api/v3"
    SCORE_PROJECT = os.path.abspath(os.path.join(DIR_PATH, '..'))

    def setUp(self):
        super().setUp()

        # WARNING: ICON service emulation is not working with IISS.
        # You can stake and delegate but can't get any I-Score for reward.
        # If you want to test IISS stuff correctly, set self.icon_service and send requests to the network
        self.icon_service = None
        self._test2 = KeyWallet.create()
        
        # If you want to send requests to the network, uncomment next line and set self.TEST_HTTP_ENDPOINT_URI_V3
        # self.icon_service = IconService(HTTPProvider(self.TEST_HTTP_ENDPOINT_URI_V3))

        # install SCORE
        self._score_address = self._deploy_score(params={"_name": "Test Token",
                                                         "_symbol": "TTK",
                                                         "_initialSupply": 1000,
                                                         "_decimals": 18,
                                                         })['scoreAddress']

    def _deploy_score(self, to: str = SCORE_INSTALL_ADDRESS, params=None) -> dict:
        # Generates an instance of transaction for deploying SCORE.
        transaction = DeployTransactionBuilder()\
                        .from_(self._test1.get_address())\
                        .to(to)\
                        .step_limit(100_000_000_000)\
                        .nid(3)\
                        .nonce(100)\
                        .content_type("application/zip")\
                        .content(gen_deploy_data_content(self.SCORE_PROJECT))\
                        .params(params)\
                        .build()

        # Returns the signed transaction object having a signature
        signed_transaction = SignedTransaction(transaction, self._test1)

        # process the transaction in local
        tx_result = self.process_transaction(signed_transaction, self.icon_service)

        self.assertEqual(True, tx_result['status'])
        self.assertTrue('scoreAddress' in tx_result)

        return tx_result

    def test_score_update(self):
        # update SCORE
        tx_result = self._deploy_score(self._score_address)

        self.assertEqual(self._score_address, tx_result['scoreAddress'])

    def run_balanceOf(self, address):
        param = {
            "_owner": address
        }
        _call = CallBuilder() \
            .from_(self._test1.get_address()) \
            .to(self._score_address) \
            .method("balanceOf") \
            .params(param) \
            .build()

        return self.process_call(_call, self.icon_service)

    def run_totalSupply(self):
        _call = CallBuilder() \
            .from_(self._test1.get_address()) \
            .to(self._score_address) \
            .method("totalSupply") \
            .build()

        return self.process_call(_call, self.icon_service)

    def test_isPaused(self):
        _call = CallBuilder() \
            .from_(self._test1.get_address()) \
            .to(self._score_address) \
            .method("isPaused") \
            .build()

        return self.process_call(_call, self.icon_service)

    def run_transfer(self, params):
        _call_transaction = CallTransactionBuilder() \
            .from_(self._test1.get_address()) \
            .to(self._score_address) \
            .step_limit(100_000_000_000) \
            .nid(3) \
            .nonce(100) \
            .method("transfer") \
            .params(params) \
            .build()

        signed_transaction = SignedTransaction(_call_transaction, self._test1)

        # process the transaction in local
        tx_result = self.process_transaction(signed_transaction, self.icon_service)
        return tx_result

    def run_mint(self, params):
        _call_transaction = CallTransactionBuilder() \
            .from_(self._test1.get_address()) \
            .to(self._score_address) \
            .step_limit(100_000_000_000) \
            .nid(3) \
            .nonce(100) \
            .method("mint") \
            .params(params) \
            .build()

        signed_transaction = SignedTransaction(_call_transaction, self._test1)

        # process the transaction in local
        tx_result = self.process_transaction(signed_transaction, self.icon_service)
        return tx_result

    def run_burn(self, params):
        _call_transaction = CallTransactionBuilder() \
            .from_(self._test1.get_address()) \
            .to(self._score_address) \
            .step_limit(100_000_000_000) \
            .nid(3) \
            .nonce(100) \
            .method("burn") \
            .params(params) \
            .build()

        signed_transaction = SignedTransaction(_call_transaction, self._test1)

        # process the transaction in local
        tx_result = self.process_transaction(signed_transaction, self.icon_service)
        return tx_result

    def run_pause(self, method: str = "pause"):
        _call_transaction = CallTransactionBuilder() \
            .from_(self._test1.get_address()) \
            .to(self._score_address) \
            .step_limit(100_000_000_000) \
            .nid(3) \
            .nonce(100) \
            .method(method) \
            .build()

        signed_transaction = SignedTransaction(_call_transaction, self._test1)

        # process the transaction in local
        tx_result = self.process_transaction(signed_transaction, self.icon_service)
        # self.assertEqual(True, tx_result['status'])
        return tx_result

    def test_mint(self): 
        amt_to_mint = 10 * 10 ** 18

        param2 = {
            "_value": amt_to_mint
        }

        balance_b4_mint = self.run_balanceOf(self._test1.get_address())
        supply_b4_mint = self.run_totalSupply()
        tx_result = self.run_mint(param2)
        self.assertEqual(True, tx_result['status'])
        balance_after_mint = self.run_balanceOf(self._test1.get_address())
        supply_after_mint = self.run_totalSupply()

        self.assertEqual(amt_to_mint, int(balance_after_mint, 0) - int(balance_b4_mint, 0))
        self.assertEqual(amt_to_mint, int(supply_after_mint, 0) - int(supply_b4_mint, 0))

    def test_burn(self):
        amt_to_burn = 10 * 10 ** 18

        param2 = {
            "_value": amt_to_burn
        }

        balance_b4_burn = self.run_balanceOf(self._test1.get_address())
        supply_b4_burn = self.run_totalSupply()
        tx_result = self.run_burn(param2)
        self.assertEqual(True, tx_result['status'])
        # print(tx_res)
        balance_after_burn = self.run_balanceOf(self._test1.get_address())
        supply_after_burn = self.run_totalSupply()

        self.assertEqual(amt_to_burn, int(balance_b4_burn, 0) - int(balance_after_burn, 0))
        self.assertEqual(amt_to_burn, int(supply_b4_burn, 0) - int(supply_after_burn, 0))

    def test_pause(self):
        param2 = {
            "_value": 10 * 10 ** 18
        }

        transfer_params = {
            "_to": self._test2.get_address(),
            "_value": 10 * 10 ** 18
        }

        self.run_pause("pause")
        self.assertEqual("0x1", self.test_isPaused())

        tx_result_transfer = self.run_transfer(transfer_params)
        self.assertEqual(False, tx_result_transfer['status'])

        tx_result_mint = self.run_mint(param2)
        self.assertEqual(False, tx_result_mint['status'])

        tx_result_burn = self.run_burn(param2)
        self.assertEqual(False, tx_result_burn['status'])

        tx_result_pause = self.run_pause("pause")
        self.assertEqual(False, tx_result_pause['status'])

    def test_unpause(self):
        param2 = {
            "_value": 10 * 10 ** 18
        }

        transfer_params = {
            "_to": self._test2.get_address(),
            "_value": 10 * 10 ** 18
        }

        self.run_pause("unpause")
        self.assertEqual("0x0", self.test_isPaused())

        test1_bal_b4 = self.run_balanceOf(self._test1.get_address())
        test2_bal_b4 = self.run_balanceOf(self._test2.get_address())

        tx_result_transfer = self.run_transfer(transfer_params)

        test1_bal_after = self.run_balanceOf(self._test1.get_address())
        test2_bal_after = self.run_balanceOf(self._test2.get_address())
        
        self.assertEqual(transfer_params['_value'], int(test1_bal_b4, 0) - int(test1_bal_after, 0))
        self.assertEqual(transfer_params['_value'], int(test2_bal_after, 0) - int(test2_bal_b4, 0))
        self.assertEqual(True, tx_result_transfer['status'])

        tx_result_mint = self.run_mint(param2)
        self.assertEqual(True, tx_result_mint['status'])

        tx_result_burn = self.run_burn(param2)
        self.assertEqual(True, tx_result_burn['status'])

        tx_result_pause = self.run_pause("pause")
        self.assertEqual(True, tx_result_pause['status'])










