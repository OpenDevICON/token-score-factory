from iconservice import *

TAG = 'PausableIRC2'


# An interface of ICON Token Standard, IRC-2
class TokenStandard(ABC):
    @abstractmethod
    def name(self) -> str:
        pass

    @abstractmethod
    def symbol(self) -> str:
        pass

    @abstractmethod
    def decimals(self) -> int:
        pass

    @abstractmethod
    def totalSupply(self) -> int:
        pass

    @abstractmethod
    def balanceOf(self, _owner: Address) -> int:
        pass

    @abstractmethod
    def transfer(self, _to: Address, _value: int, _data: bytes = None):
        pass


# An interface of tokenFallback.
# Receiving SCORE that has implemented this interface can handle
# the receiving or further routine.
class TokenFallbackInterface(InterfaceScore):
    @interface
    def tokenFallback(self, _from: Address, _value: int, _data: bytes):
        pass


def require(condition: bool, error: str):
    if not condition:
        revert(f"{error}")


class PausableIRC2(IconScoreBase):
    _NAME = '_name'
    _SYMBOL = '_symbol'
    _DECIMALS = 'decimals'
    _TOTAL_SUPPLY = 'total_supply'
    _BALANCES = 'balances'
    _PAUSED = 'paused'

    @eventlog(indexed=1)
    def Paused(self, status: bool):
        pass

    @eventlog(indexed=3)
    def Transfer(self, _from: Address, _to: Address, _value: int, _data: bytes):
        pass

    def __init__(self, db: IconScoreDatabase) -> None:
        super().__init__(db)
        self._name = VarDB(self._NAME, db, value_type=str)
        self._symbol = VarDB(self._SYMBOL, db, value_type=str)
        self._decimals = VarDB(self._DECIMALS, db, value_type=int)
        self._balances = DictDB(self._BALANCES, db, value_type=int)
        self._total_supply = VarDB(self._TOTAL_SUPPLY, db, value_type=int)
        self._paused = VarDB(self._PAUSED, db, value_type=bool)

    def on_install(self, _name: str, _symbol: str, _initialSupply: int, _decimals: int, _paused: bool = False) -> None:
        super().on_install()
        require(len(_symbol) > 0, f"{_symbol}: Symbol of token should have at least one character")
        require(len(_name) > 0, f"{_name}: Name of token should have at least one character")
        require(_initialSupply > 0, f"{_initialSupply}: Initial supply cannot be less than zero")
        require(_decimals > 0, f"{_decimals}: Decimals cannot be less than zero")

        total_supply = _initialSupply * 10 ** _decimals

        self._name.set(_name)
        self._symbol.set(_symbol)
        self._total_supply.set(total_supply)
        self._decimals.set(_decimals)
        self._balances[self.msg.sender] = total_supply
        self._paused.set(_paused)

    def on_update(self) -> None:
        super().on_update()

    @external(readonly=True)
    def name(self) -> str:
        return self._name.get()

    @external(readonly=True)
    def symbol(self) -> str:
        return self._symbol.get()

    @external(readonly=True)
    def decimals(self) -> int:
        return self._decimals.get()

    @external(readonly=True)
    def totalSupply(self) -> int:
        return self._total_supply.get()

    @external(readonly=True)
    def balanceOf(self, _owner: Address) -> int:
        return self._balances[_owner]

    @external(readonly=True)
    def isPaused(self) -> bool:
        return self._paused.get()

    @external
    def transfer(self, _to: Address, _value: int, _data: bytes = None):
        if _data is None:
            _data = b'None'
        self._transfer(self.msg.sender, _to, _value, _data)

    @external
    def pause(self) -> None:
        require(self.msg.sender == self.owner, f"{self.name()}: Token can be unpaused by owner only")
        require(not self.isPaused(), f"{self.name()}: Token is already in paused state")

        self._paused.set(True)
        self.Paused(True)

    @external
    def unpause(self) -> None:
        require(self.msg.sender == self.owner, f"{self.name()}:Token can be unpaused by owner only")
        require(self.isPaused(), f"{self.name()}:Token is already in unpaused state")

        self._paused.set(False)
        self.Paused(False)

    def _transfer(self, _from: Address, _to: Address, _value: int, _data: bytes):

        # Checks the sending value and balance.
        require(_value > 0, f"{self.name()}: Cannot transfer zero or less value")
        require(self._balances[_from] >= _value, f"{self.name()}: Out of balance")
        require(not self._paused.get(), f"{self.name()}: Token operations paused")

        self._balances[_from] = self._balances[_from] - _value
        self._balances[_to] = self._balances[_to] + _value

        if _to.is_contract:
            # If the recipient is SCORE,
            #   then calls `tokenFallback` to hand over control.
            recipient_score = self.create_interface_score(_to, TokenFallbackInterface)
            recipient_score.tokenFallback(_from, _value, _data)

        # Emits an event log `Transfer`
        self.Transfer(_from, _to, _value, _data)
