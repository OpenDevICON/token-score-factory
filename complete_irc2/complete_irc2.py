from iconservice import *

TAG = 'CompleteIRC2'
DEFAULT_CAP_VALUE = 2 ** 256 - 1
EOA_ZERO = Address.from_string('hx' + '0' * 40)
FROM_BLOCK = "from_block"
BALANCE = "balance"


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


class IRC2Interface(InterfaceScore):
    @interface
    def transfer(self, _to: Address, _value: int, _data: bytes):
        pass


def require(condition: bool, error: str):
    if not condition:
        revert(f"{error}")


class CompleteIRC2(IconScoreBase):
    _NAME = '_name'
    _SYMBOL = '_symbol'
    _DECIMALS = 'decimals'
    _TOTAL_SUPPLY = 'total_supply'
    _BALANCES = 'balances'
    _CAP = 'cap'
    _PAUSED = 'paused'
    _SNAPSHOT_BALANCES = 'snapshot_balances'
    _TOTAL_SNAPSHOTS = 'total_snapshots'
    _SNAPSHOT_TOTAL_SUPPLY = 'snapshot_total_supply'
    _TOTAL_SUPPLY_SNAPSHOT_COUNT = 'total_supply_snapshot_count'

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
        self._snapshot_balances = DictDB(self._SNAPSHOT_BALANCES, db, value_type=int, depth=3)
        self._total_snapshots = DictDB(self._TOTAL_SNAPSHOTS, db, value_type=int)
        self._snapshot_total_supply = DictDB(self._SNAPSHOT_TOTAL_SUPPLY, db, value_type=int, depth=2)
        self._total_supply_snapshot_count = VarDB(self._TOTAL_SUPPLY_SNAPSHOT_COUNT, db, value_type=int)

    def on_install(self, _name: str, _symbol: str, _initialSupply: int, _decimals: int, _cap: int = DEFAULT_CAP_VALUE,
                   _paused: bool = False) -> None:
        super().on_install()
        require(len(_symbol) > 0, f"{_symbol}: Symbol of token should have at least one character")
        require(len(_name) > 0, f"{_name}: Name of token should have at least one character")
        require(_initialSupply > 0, f"{_initialSupply}: Initial supply cannot be less than zero")
        require(_decimals > 0, f"{_decimals}: Decimals cannot be less than zero")
        require(_cap > 0, f"{_cap}: Cap cannot be zero or less")
        require(_initialSupply < _cap,
                f"Initial Supply {_initialSupply}, Cap {_cap}: {_name}: Initial supply cannot exceed cap limit")

        total_supply = _initialSupply * 10 ** _decimals
        total_cap = _cap * 10 ** _decimals

        self._name.set(_name)
        self._symbol.set(_symbol)
        self._total_supply.set(total_supply)
        self._cap.set(total_cap)
        self._decimals.set(_decimals)
        self._paused.set(_paused)
        self._balances[self.msg.sender] = total_supply
        self.Transfer(EOA_ZERO, self.msg.sender, total_supply, b"Mint initial supply")

        self._update_balance(self.msg.sender, total_supply)
        self._update_total_supply(total_supply)

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
            _data = b'mint'
        self._mint(self.msg.sender, _value, _data)

    @external
    def mintTo(self, _to: Address, _value: int, _data: bytes = None) -> None:
        if _data is None:
            _data = b'mintTo'
        self._mint(_to, _value, _data)

    @external
    def burn(self, _value: int) -> None:
        self._burn(self.msg.sender, _value)

    @external
    def pause(self) -> None:
        require(self.msg.sender == self.owner, f"{self.name()}: Token can be paused by owner only")
        require(not self._paused.get(), f"{self.name()}: Token is already in paused state")

        self._paused.set(True)
        self.Paused(True)

    @external
    def unpause(self) -> None:
        require(self.msg.sender == self.owner, f"{self.name()}: Token can be unpause by owner only")
        require(self._paused.get(), f"{self.name()}: Token is already in unpause state")

        self._paused.set(False)
        self.Paused(False)

    @external
    def tokenRecovery(self, _token: Address, _value: int, _data: bytes = None) -> None:
        require(self.msg.sender == self.owner, f"{self.name()}: Token can be recovered by owner only")
        require(self.balanceOf(self.address) >= _value,
                f"{self.name()}: Contract has {self.balanceOf(self.address)} tokens, asked to recover {_value}")
        require(_token.is_contract, f"{self.name()}: {_token} should be a contract.")

        if _data is None:
            _data = b'None'

        token_score = self.create_interface_score(_token, IRC2Interface)
        token_score.transfer(self.owner, _value, _data)

    @external
    def tokenFallback(self, _from: Address, _value: int, _data: bytes):
        require(_value >= 0, f"{self.name()}: Tokens received cannot be less than zero")

    def _transfer(self, _from: Address, _to: Address, _value: int, _data: bytes):

        # Checks the sending value and balance.
        require(_value >= 0, f"{self.name()}: Transferring value cannot be less than zero")
        require(self._balances[_from] >= _value, f"{self.name()}: Out of balance")
        require(not self._paused.get(), f"{self.name()}: Token operations paused")

        self._balances[_from] = self._balances[_from] - _value
        self._balances[_to] = self._balances[_to] + _value

        if _to.is_contract:
            # If the recipient is SCORE,
            #   then calls `tokenFallback` to hand over control.
            recipient_score = self.create_interface_score(_to, TokenFallbackInterface)
            recipient_score.tokenFallback(_from, _value, _data)

        self._update_balance(_from, self._balances[_from])
        self._update_balance(_to, self._balances[_to])
        # Emits an event log `Transfer`
        self.Transfer(_from, _to, _value, _data)

    def _mint(self, _to: Address, _value: int, _data: bytes) -> None:
        require(self.msg.sender == self.owner, f"{self.name()}: Only owner can call mint method")        
        require(not self._paused.get(), f"{self.name()}: Token operations paused")
        require(self.totalSupply() + _value < self._cap.get(), f"{self.name()}: Cap limit exceeded")

        self._total_supply.set(self._total_supply.get() + _value)
        self._balances[_to] += _value

        if _to.is_contract:
            # If the recipient is SCORE,
            #   then calls `tokenFallback` to hand over control.
            recipient_score = self.create_interface_score(_to, TokenFallbackInterface)
            recipient_score.tokenFallback(EOA_ZERO, _value, _data)

        self._update_balance(_to, self._balances[_to])
        self._update_total_supply(self._total_supply.get())
        self.Transfer(EOA_ZERO, _to, _value, _data)

    def _burn(self, _from: Address, _value: int, ) -> None:
        require(self.balanceOf(_from) >= _value,
                f"{self.name()}: The amount greater than the balance in the account cannot be burned.")

        require(not self._paused.get(), f"{self.name()}: Token operations paused")

        self._total_supply.set(self._total_supply.get() - _value)
        self._balances[_from] -= _value

        self._update_balance(_from, self._balances[_from])
        self._update_total_supply(self._total_supply.get())
        self.Transfer(_from, EOA_ZERO, _value, b'burn')

    @external(readonly=True)
    def balanceOfAt(self, _owner: Address, _block_number: int) -> int:
        require(_block_number < self.block_height, f"{self.name}: Block not yet determined")

        total_snapshots = self._total_snapshots[_owner]
        if total_snapshots == 0:
            return 0

        # Check for most recent balance
        if self._snapshot_balances[_owner][total_snapshots - 1][FROM_BLOCK] <= _block_number:
            return self._snapshot_balances[_owner][total_snapshots - 1][BALANCE]

        # Check for implicit zero balance
        if self._snapshot_balances[_owner][0][FROM_BLOCK] > _block_number:
            return 0

        low: int = 0
        high: int = total_snapshots - 1
        while high > low:
            mid = high - (high - low)//2
            if self._snapshot_balances[_owner][mid][FROM_BLOCK] == _block_number:
                return self._snapshot_balances[_owner][mid][BALANCE]
            elif self._snapshot_balances[_owner][mid][FROM_BLOCK] < _block_number:
                low = mid
            else:
                high = mid - 1
        return self._snapshot_balances[_owner][low][BALANCE]

    @external(readonly=True)
    def totalSupplyAt(self, _block_number: int) -> int:
        require(_block_number < self.block_height, f"{self.name}: Block not yet determined")

        total_snapshots = self._total_supply_snapshot_count.get()
        if total_snapshots == 0:
            return 0

        # Check for most recent balance
        if self._snapshot_total_supply[total_snapshots - 1][FROM_BLOCK] <= _block_number:
            return self._snapshot_total_supply[total_snapshots - 1][BALANCE]

        # Check for implicit zero balance
        if self._snapshot_total_supply[0][FROM_BLOCK] > _block_number:
            return 0

        low: int = 0
        high: int = total_snapshots - 1
        while high > low:
            mid = high - (high - low) // 2
            if self._snapshot_total_supply[mid][FROM_BLOCK] == _block_number:
                return self._snapshot_total_supply[mid][BALANCE]
            elif self._snapshot_total_supply[mid][FROM_BLOCK] < _block_number:
                low = mid
            else:
                high = mid - 1
        return self._snapshot_total_supply[low][BALANCE]

    def _update_balance(self, _owner: Address, _balance: int):

        block_height = self.block_height
        total_snapshots = self._total_snapshots[_owner]

        if total_snapshots > 0 and self._snapshot_balances[_owner][total_snapshots - 1][FROM_BLOCK] == block_height:
            self._snapshot_balances[_owner][total_snapshots - 1][BALANCE] = _balance
        else:
            self._snapshot_balances[_owner][total_snapshots - 1][FROM_BLOCK] = block_height
            self._snapshot_balances[_owner][total_snapshots - 1][BALANCE] = _balance
            self._total_snapshots[_owner] += 1

    def _update_total_supply(self, _total_supply: int):
        block_height = self.block_height
        total_snapshots = self._total_supply_snapshot_count.get()

        if total_snapshots > 0 and self._snapshot_total_supply[total_snapshots - 1][FROM_BLOCK] == block_height:
            self._snapshot_total_supply[total_snapshots - 1][BALANCE] = _total_supply
        else:
            self._snapshot_total_supply[total_snapshots - 1][FROM_BLOCK] = block_height
            self._snapshot_total_supply[total_snapshots - 1][BALANCE] = _total_supply
            self._total_supply_snapshot_count.set(total_snapshots + 1)
