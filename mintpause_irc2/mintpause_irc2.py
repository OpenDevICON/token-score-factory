from iconservice import *

TAG = 'MintPauseIRC2'
DEFAULT_CAP_VALUE = 2 ** 256 - 1
EOA_ZERO = Address.from_string('hx' + '0' * 40)

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


class MintPauseIRC2(IconScoreBase):

    _NAME = '_name'
    _SYMBOL = '_symbol'
    _DECIMALS = 'decimals'
    _TOTAL_SUPPLY = 'total_supply'
    _BALANCES = 'balances'
    _CAP = 'cap'
    _PAUSED = 'paused'

    @eventlog(indexed=3)
    def Transfer(self, _from: Address, _to: Address, _value: int, _data: bytes):
        pass

    @eventlog(indexed=1)
    def Paused(self, status: bool):
        pass


    def __init__(self, db: IconScoreDatabase) -> None:
        super().__init__(db)
        self._name = VarDB(self._NAME, db, value_type=str)
        self._symbol = VarDB(self._SYMBOL, db, value_type=str)
        self._decimals = VarDB(self._DECIMALS, db, value_type=int)
        self._balances = DictDB(self._BALANCES, db, value_type=int)
        self._total_supply = VarDB(self._TOTAL_SUPPLY, db, value_type=int)
        self._paused = VarDB(self._PAUSED, db, value_type=bool)
        self._cap = VarDB(self._CAP, db, value_type=int)

    def on_install(self, _name:str, _symbol:str, _initialSupply: int, _decimals: int, _cap: int = DEFAULT_CAP_VALUE, _paused: bool = False) -> None:
        super().on_install()

        if (len(_symbol) <= 0):
            revert("Symbol of token should have at least one character")

        if (len(_name) <= 0):
            revert("Name of token should have at least one character")

        if _initialSupply < 0:
            revert("Initial supply cannot be less than zero")

        if _decimals < 0:
            revert("Decimals cannot be less than zero")

        if _cap <= 0:
            revert("Cap cannot be zero or less")

        if _initialSupply >= _cap:
            revert("Cannot exceed cap limit")

        total_supply = _initialSupply * 10 ** _decimals
        total_cap = _cap * 10 ** _decimals

        Logger.debug(f'on_install: total_supply={total_supply}', TAG)
        Logger.debug(f'on_install: total_cap={total_cap}', TAG)

        self._name.set(_name)
        self._symbol.set(_symbol)
        self._total_supply.set(total_supply)
        self._cap.set(total_cap)
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
    def cap(self) -> int:
        return self._cap.get()

    @external(readonly=True)
    def isPaused(self) -> bool:
        return self._paused.get()

    @external
    def transfer(self, _to: Address, _value: int, _data: bytes = None):
        if _data is None:
            _data = b'None'
        self._transfer(self.msg.sender, _to, _value, _data)

    @external
    def mint(self, _value: int, _data: bytes = None) -> None:
        if _data is None:
            _data = b'None'
        self._mint(self.msg.sender, _value, _data)

    @external
    def mintTo(self, _to: Address, _value: int, _data: bytes = None) -> None:
        if _data is None:
            _data = b'None'
        self._mint(_to, _value, _data)

    @external
    def pause(self) -> None:
        if self.msg.sender != self.owner:
            revert("Token can be paused by owner only")
        if self._paused.get() == True:
            revert("Token is already in paused state")

        self._paused.set(True)
        self.Paused(True)

    @external
    def unpause(self) -> None:
        if self.msg.sender != self.owner:
            revert("Token can be unpaused by owner only")
        if self._paused.get() == False:
            revert("Token is already in unpaused state")

        self._paused.set(False)
        self.Paused(False)

    def _transfer(self, _from: Address, _to: Address, _value: int, _data: bytes):

        # Checks the sending value and balance.
        if _value < 0:
            revert("Transferring value cannot be less than zero")
        if self._balances[_from] < _value:
            revert("Out of balance")

        self._beforeTokenTransfer(_from, _to, _value)
        
        self._balances[_from] = self._balances[_from] - _value
        self._balances[_to] = self._balances[_to] + _value

        if _to.is_contract:
            # If the recipient is SCORE,
            #   then calls `tokenFallback` to hand over control.
            recipient_score = self.create_interface_score(_to, TokenFallbackInterface)
            recipient_score.tokenFallback(_from, _value, _data)

        # Emits an event log `Transfer`
        self.Transfer(_from, _to, _value, _data)
        Logger.debug(f'Transfer({_from}, {_to}, {_value}, {_data})', TAG)

    def _mint(self, _to: Address, _value: int, _data: bytes) -> None:
        if (self.msg.sender != self.owner):
            revert("Only owner can call mint method")

        self._beforeTokenTransfer(EOA_ZERO, _to, _value)
        
        self._total_supply.set(self._total_supply.get() + _value)
        self._balances[_to] +=  _value

        if _to.is_contract:
            # If the recipient is SCORE,
            #   then calls `tokenFallback` to hand over control.
            recipient_score = self.create_interface_score(_to, TokenFallbackInterface)
            recipient_score.tokenFallback(_from, _value, _data)
        
        self.Transfer(EOA_ZERO, _to, _value, _data)

    def _beforeTokenTransfer(self, _from: Address, _to: Address, _value: int):
        if self._paused.get():
            revert("Token operations paused")
        if ((self._total_supply.get() + _value) >= self._cap.get()):
            revert("Cap limit exceeded")
