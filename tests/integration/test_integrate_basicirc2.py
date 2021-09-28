import os.path
from typing import List

from iconsdk.providers.http_provider import HTTPProvider
from iconsdk.icon_service import IconService
from .test_integrate_base import BaseTokenTest

DIR_PATH = os.path.abspath(os.path.dirname(__file__))


def generate_event_log(score_address: str, indexed: List, data: List) -> dict:
    return {"scoreAddress": score_address, "indexed": indexed, "data": data}


class BaseTestCases:

    class IRC2IntegrateBase(BaseTokenTest):

        def setUp(self, score, params):
            super().setUp()
            self.irc2 = self.deploy_tx(self._test1, content=score, params=params).get("scoreAddress")

        def test_transfer_event_log(self):
            tx = self.send_tx(self._test1, to=self.irc2, method="transfer",
                              params={"_to": self._wallet_array[0].get_address(), "_value": 100*10**18})
            transfer_event = generate_event_log(self.irc2, ['Transfer(Address,Address,int,bytes)',
                                                            self._test1.get_address(),
                                                            self._wallet_array[0].get_address(), hex(100*10**18)],
                                                ["0x"+b'None'.hex()])
            self.assertTrue(transfer_event in tx.get("eventLogs"))


class BasicIRC2(BaseTestCases.IRC2IntegrateBase):
    BASIC_IRC2 = os.path.abspath(os.path.join(DIR_PATH, "../../basic_irc2"))

    def setUp(self):
        super().setUp(self.BASIC_IRC2, {"_name": "Sample Token", "_symbol": "STS",
                                        "_initialSupply": 100000, "_decimals": 18})
