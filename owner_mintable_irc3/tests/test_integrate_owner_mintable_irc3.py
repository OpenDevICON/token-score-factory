import os

from iconsdk.builder.call_builder import CallBuilder
from iconsdk.builder.transaction_builder import DeployTransactionBuilder, CallTransactionBuilder
from iconsdk.libs.in_memory_zip import gen_deploy_data_content
from iconsdk.signed_transaction import SignedTransaction
from tbears.libs.icon_integrate_test import IconIntegrateTestBase, SCORE_INSTALL_ADDRESS
from iconsdk.wallet.wallet import KeyWallet

DIR_PATH = os.path.abspath(os.path.dirname(__file__))


class TestTest(IconIntegrateTestBase):
    TEST_HTTP_ENDPOINT_URI_V3 = "http://127.0.0.1:9000/api/v3"
    SCORE_PROJECT = os.path.abspath(os.path.join(DIR_PATH, '..'))

    def setUp(self):
        super().setUp()

        # WARNING: ICON service emulation is not working with IISS.
        # You can stake and delegate but can't get any I-Score for reward.
        # If you want to test IISS stuff correctly, set self.icon_service and send requests to the network
        self.icon_service = None

        # create a new wallet to test transfer
        self._test2 = KeyWallet.create()
        
        # If you want to send requests to the network, uncomment next line and set self.TEST_HTTP_ENDPOINT_URI_V3
        # self.icon_service = IconService(HTTPProvider(self.TEST_HTTP_ENDPOINT_URI_V3))

        # install SCORE
        self._score_address = self._deploy_score(params={"_name": "Test Token",
                                                         "_symbol": "TTK"
                                                    })['scoreAddress']

    def _deploy_score(self, to: str = SCORE_INSTALL_ADDRESS, params = None) -> dict:
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

    def test_call_name(self):
        # Generates a call instance using the CallBuilder
        call = CallBuilder() \
                .from_(self._test1.get_address())\
                .to(self._score_address) \
                .method("name") \
                .build()

        # Sends the call request
        response = self.process_call(call, self.icon_service)

        self.assertEqual("Test Token", response)

    def call_balanceOf(self, param):
        params = {
            '_owner': param
        }  

        call = CallBuilder() \
                .from_(self._test1.get_address())\
                .to(self._score_address) \
                .method("balanceOf") \
                .params(params) \
                .build()

        # Sends the call request
        response = self.process_call(call, self.icon_service)
        return response

    def call_ownerOf(self, params): 
        call = CallBuilder() \
                .from_(self._test1.get_address())\
                .to(self._score_address) \
                .method("ownerOf") \
                .params(params) \
                .build()

        # Sends the call request
        response = self.process_call(call, self.icon_service)
        return response

    def call_getTokenURI(self, params): 
        call = CallBuilder() \
                .from_(self._test1.get_address())\
                .to(self._score_address) \
                .method("getTokenURI") \
                .params(params) \
                .build()

        # Sends the call request
        response = self.process_call(call, self.icon_service)
        return response

    def call_getApproved(self, tokenId):
        params = {
            '_tokenId': tokenId
        } 
        call = CallBuilder() \
                .from_(self._test1.get_address())\
                .to(self._score_address) \
                .method("getApproved") \
                .params(params) \
                .build()

        # Sends the call request
        response = self.process_call(call, self.icon_service)
        return response

    def call_mint(self,params, wallet):
        _call_transaction = CallTransactionBuilder() \
            .from_(wallet.get_address()) \
            .to(self._score_address) \
            .step_limit(100_000_000_000) \
            .nid(3) \
            .nonce(100) \
            .method("mint") \
            .params(params) \
            .build()

        signed_transaction = SignedTransaction(_call_transaction, wallet)

        # process the transaction in local
        tx_result = self.process_transaction(signed_transaction, self.icon_service)
        return tx_result

    def call_setTokenURI(self, params, wallet):
        _call_transaction = CallTransactionBuilder() \
            .from_(wallet.get_address()) \
            .to(self._score_address) \
            .step_limit(100_000_000_000) \
            .nid(3) \
            .nonce(100) \
            .method("setTokenURI") \
            .params(params) \
            .build()

        signed_transaction = SignedTransaction(_call_transaction, wallet)

        # process the transaction in local
        tx_result = self.process_transaction(signed_transaction, self.icon_service)
        return tx_result

    def call_approve(self,params, wallet):
        _call_transaction = CallTransactionBuilder() \
            .from_(wallet.get_address()) \
            .to(self._score_address) \
            .step_limit(100_000_000_000) \
            .nid(3) \
            .nonce(100) \
            .method("approve") \
            .params(params) \
            .build()

        signed_transaction = SignedTransaction(_call_transaction, wallet)

        # process the transaction in local
        tx_result = self.process_transaction(signed_transaction, self.icon_service)
        return tx_result

    def call_transfer(self, params, wallet):
        _call_transaction = CallTransactionBuilder() \
            .from_(wallet.get_address()) \
            .to(self._score_address) \
            .step_limit(100_000_000_000) \
            .nid(3) \
            .nonce(100) \
            .method("transfer") \
            .params(params) \
            .build()

        signed_transaction = SignedTransaction(_call_transaction, wallet)

        # process the transaction in local
        tx_result = self.process_transaction(signed_transaction, self.icon_service)
        return tx_result

    def call_transferFrom(self, params, wallet):
        _call_transaction = CallTransactionBuilder() \
            .from_(wallet.get_address()) \
            .to(self._score_address) \
            .step_limit(100_000_000_000) \
            .nid(3) \
            .nonce(100) \
            .method("transferFrom") \
            .params(params) \
            .build()

        signed_transaction = SignedTransaction(_call_transaction, wallet)

        # process the transaction in local
        tx_result = self.process_transaction(signed_transaction, self.icon_service)
        return tx_result

    def test_call_balanceOf(self):
        response = self.call_balanceOf('hx0000000000000000000000000000000000000023')
        self.assertEqual("0x0", response)

    def test_call_mint(self):
        uri_text = 'some-random-ipfs-link-or-sth-idk'
        mint_params = {
            '_to': self._test1.get_address(),
            '_tokenId': 1,
            '_tokenURI': uri_text
        }

        b4mint = self.call_balanceOf(self._test1.get_address())
        tx_result = self.call_mint(mint_params, self._test1)
        aftermint = self.call_balanceOf(self._test1.get_address())
        self.assertEqual(int(aftermint, 0), int(b4mint, 0) + 1)

        ownerof_param = {
            '_tokenId': 1
        }

        owner = self.call_ownerOf(ownerof_param)
        self.assertEqual(owner, self._test1.get_address())

        uri = self.call_getTokenURI(ownerof_param)
        self.assertEqual(uri, uri_text)

        # try to mint the same token again
        newmint_params = {
            '_to': self._test1.get_address(),
            '_tokenId': 1
        }

        tx_result_new = self.call_mint(mint_params, self._test1)
        self.assertEqual(False, tx_result_new['status'])

        new_uri_text = 'something-new'

        newURI_params = {
            '_tokenId': 1,
            '_tokenURI': new_uri_text
        }

        tx_newuri = self.call_setTokenURI(newURI_params, self._test1)
        newuri = self.call_getTokenURI(ownerof_param)
        self.assertEqual(True, tx_newuri['status'])
        self.assertEqual(newuri, new_uri_text)

        new_mint_params = {
            '_to': self._test1.get_address(),
            '_tokenId': 2,
            '_tokenURI': uri_text
        }

        tx_result_new_mint = self.call_mint(mint_params, self._test2) # test2 is not owner
        self.assertEqual(False, tx_result_new_mint['status'])

    def test_call_mint_ntimes(self):
        for i in range(10):
            mint_params = {
                '_to': self._test2.get_address(),
                '_tokenId': i
            }
            tx_result = self.call_mint(mint_params, self._test1)
            self.assertEqual(True, tx_result['status'])
        aftermint = self.call_balanceOf(self._test2.get_address())
        self.assertEqual(10, int(aftermint, 0))

    def test_call_transfer(self):
        # _test1 mints the token and owns it
        mint_params = {
            '_to': self._test1.get_address(),
            '_tokenId': 1
        }
        b4mint = self.call_balanceOf(self._test1.get_address())
        tx_result = self.call_mint(mint_params, self._test1)
        aftermint = self.call_balanceOf(self._test1.get_address())
        self.assertEqual(int(aftermint, 0), int(b4mint, 0) + 1)
        ownerof_param = {
            '_tokenId': 1
        }
        owner = self.call_ownerOf(ownerof_param)
        self.assertEqual(owner, self._test1.get_address())

        # _test1 transfers the token to _test2
        transfer_params = {
            '_to': self._test2.get_address(),
            '_tokenId': 1
        }
        tx_transfer = self.call_transfer(transfer_params, self._test1)
        aftertx_2 = self.call_balanceOf(self._test2.get_address())
        self.assertEqual(1, int(aftertx_2,0))

        new_owner = self.call_ownerOf(ownerof_param)
        # print(new_owner)
        self.assertEqual(new_owner, self._test2.get_address())

    def mint(self):
        mint_params = {
            '_to': self._test1.get_address(),
            '_tokenId': 1
        }
        tx_result = self.call_mint(mint_params, self._test1)
        self.assertEqual(True, tx_result['status'])
        return tx_result

    def test_call_approve(self):
        self.mint()
        # test 1 has the tokens
        approved = self.call_getApproved(1)
        self.assertEqual(approved, 'hx' + '0' * 40)

        approve_params = {
            '_to': self._test2.get_address(),
            '_tokenId': 1
        }

        tx_approve = self.call_approve(approve_params, self._test1)
        self.assertEqual(True, tx_approve['status'])
        approved = self.call_getApproved(1)
        self.assertEqual(approved, self._test2.get_address())

        # approved addresses can transfer tokens on behalf of owner as well
        tf_params = {
            '_from': self._test1.get_address(),
            '_to': self._test2.get_address(),
            '_tokenId': 1
        }

        tx_result_tf = self.call_transferFrom(tf_params, self._test2)
        self.assertEqual(True, tx_result_tf['status'])

        ownerof_param = {
            '_tokenId': 1
        }
        owner = self.call_ownerOf(ownerof_param)
        self.assertEqual(owner, self._test2.get_address())

    def test_approver_cannot_change_uri(self):
        uri_text = 'some-random-ipfs-link-or-sth-idk'
        mint_params = {
            '_to': self._test1.get_address(),
            '_tokenId': 1,
            '_tokenURI': uri_text
        }
        self.call_mint(mint_params, self._test1)

        approve_params = {
            '_to': self._test2.get_address(),
            '_tokenId': 1
        }
        self.call_approve(approve_params, self._test1)
        # approved to test2

        # check if test2 can change uri
        new_uri_text = 'something-new'

        newURI_params = {
            '_tokenId': 1,
            '_tokenURI': new_uri_text
        }

        tx_newuri = self.call_setTokenURI(newURI_params, self._test2)
        self.assertEqual(False, tx_newuri['status'])

        _param = {
            '_tokenId': 1
        }

        newuri = self.call_getTokenURI(_param)
        self.assertEqual(uri_text, newuri)
