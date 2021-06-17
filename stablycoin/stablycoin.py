from iconservice import *
from .IIRC2 import TokenStandard

TAG = 'StablyCoin'
EOA_ZERO = Address.from_string('hx' + '0' * 40)

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

class StablyCoin(IconScoreBase, TokenStandard):

	_NAME = '_name'
	_SYMBOL = '_symbol'
	_DECIMALS = 'decimals'
	_TOTAL_SUPPLY = 'total_supply'
	_BALANCES = 'balances'
	_PAUSED = 'paused'
	_N_ISSUERS = 'number_of_issuers'
	_ADMIN = "admin"
	_ISSUERS = "issuers"
	_ALLOWANCES = "allowances"

	def __init__(self, db: IconScoreDatabase) -> None:
		'''
		Varible Definition
		'''
		super().__init__(db)

		self._admin = VarDB(self._ADMIN, db, value_type=Address)
		self._issuers = ArrayDB(self._ISSUERS, db, value_type=Address)
		self._n_issuers = VarDB(self._N_ISSUERS, db, value_type=int)

		self._name = VarDB(self._NAME, db, value_type=str)
		self._symbol = VarDB(self._SYMBOL, db, value_type=str)
		self._decimals = VarDB(self._DECIMALS, db, value_type=int)

		self._total_supply = VarDB(self._TOTAL_SUPPLY, db, value_type=int)
		self._balances = DictDB(self._BALANCES, db, value_type=int)
		self._allowances = DictDB(self._ALLOWANCES,db,value_type=int)
		self._paused = VarDB(self._PAUSED, db, value_type=bool)

	def on_install(self, _name:str, _symbol:str, _decimals:int, _admin:Address, _nIssuers: int = 2) -> None:
		'''
		Variable Initialization.

		:param _admin: The admin for the token.
		:param _nIssuers: Maximum number of issuers.
		:param _name: The name of the token.
		:param _symbol: The symbol of the token.
		:param _decimals: The number of decimals. Set to 18 by default.
		'''
		super().on_install()
		require(len(_name) > 0, "Invalid Token Name")
		require(len(_symbol) > 0, "Invalid Token Symbol Name")
		require(_decimals > 0, "Decimals cannot be less than 0")
		require(_nIssuers > 0, "1 or more issuers required")

		self._admin.set(_admin)
		self._n_issuers.set(_nIssuers)

		self._name.set(_name)
		self._symbol.set(_symbol)
		self._decimals.set(_decimals)
		self._total_supply.set(0)
		self._paused.set(False)

	def on_update(self) -> None:
		super().on_update()
	
	@eventlog(indexed=3)
	def Transfer(self, _from: Address, _to: Address, _value: int, _data: bytes):
		pass

	@external(readonly=True)
	def name(self) -> str:
		'''
		Returns the name of the token
		'''
		return self._name.get()

	@external(readonly=True)
	def symbol(self) -> str:
		'''
		Returns the symbol of the token
		'''
		return self._symbol.get()

	@external(readonly=True)
	def decimals(self) -> int:
		'''
		Returns the number of decimals
		For example, if the decimals = 2, a balance of 25 tokens
		should be displayed to the user as (25 * 10 ** 2)
		'''
		return self._decimals.get()

	@external(readonly=True)
	def totalSupply(self) -> int:
		'''
		Returns the total number of tokens in existence
		'''
		return self._total_supply.get()

	@external(readonly=True)
	def balanceOf(self, _owner: Address) -> int:
		'''
		Returns the amount of tokens owned by the account

		:param _owner: The account whose balance is to be checked.
		:return Amount of tokens owned by the `_owner` with the given address.
		'''
		return self._balances[_owner]

	@external(readonly=True)
	def getAdmin(self) -> Address:
		'''
		Returns the wallet address of admin.
		'''
		return self._admin.get()

	@external(readonly=True)
	def getIssuers(self) -> list:    
		'''
		Returns the list of all the issuers.
		'''
		return [i for i in self._issuers]
	
	@external(readonly=True)
	def isPaused(self) -> bool:
		'''
		Returns if the score is paused
		'''
		return self._paused.get()

	@external(readonly=True)
	def issuerAllowance(self, _issuer: Address) -> bool:
		'''
		Returns amount of tokens that `_issuer` can mint at this point in time.

		:param _issuer: The wallet address of issuer
		'''
		return self._allowances[_issuer]

	@external
	def transfer(self, _to: Address, _value: int, _data: bytes = None):
		'''
		Transfers certain amount of tokens from sender to the reciever.

		:param _to: The account to which the token is to be transferred.
		:param _value: The no. of tokens to be transferred.
		:param _data: Any information or message
		'''
		self._transfer(self.msg.sender, _to, _value, _data)

	@external
	def addIssuer(self, _issuer: Address) -> None:
		'''
		Add issuers. Issuers can mint and burn tokens.
		Only admin can call this method.
		
		:param _issuer: The wallet address of issuer to be added
		'''
		require(_issuer not in self._issuers, f"{_issuer} is already an issuer")
		require(self.msg.sender == self._admin.get(), "Only admin can add issuer")
		require(len(self.getIssuers()) < self._n_issuers.get(), f"Cannot have more than {self._n_issuers.get()} issuers")
		self._issuers.put(_issuer)

	@external
	def removeIssuer(self, _issuer: Address) -> None:
		'''
		Remove issuer from the list of issuers.
		Only admin can call this method.

		:param _issuer: The wallet of address of issuer to remove
		'''
		require(self.msg.sender == self._admin.get(), "Only admin can remove issuer")
		require(_issuer in self._issuers, f"{_issuer} not an issuer")

		top = self._issuers.pop()
		if top != _issuer:
			for i in range(len(self._issuers)):
				if self._issuers[i] == _issuer:
					self._issuers[i] = top

	@external
	def approve(self, _issuer: Address, _value: int) -> None:
		'''
		Allow `_issuer` to mint `_value` tokens.

		:param _issuer: The issuer to approve to.
		:param _value: The amount to approve to issuer to mint.
		'''
		require(self.msg.sender == self._admin.get(), "Only admin can approve amount to issuer")
		self._allowances[_issuer] = _value

	@external
	def transferOwnership(self, _newAdmin: Address) -> None:
		'''
		Transfer the admin rights to another `_newAdmin` address
		Only admin can call this method.

		:param _newAdmin: New wallet address that will now have admin rights
		'''
		require(self.msg.sender == self._admin.get(), "Only admin can transfer ownership")
		self._admin.set(_newAdmin)

	@external
	def togglePause(self) -> None:
		'''
		Toggles pause status of the score.
		Only admin can call this method.
		'''
		require(self.msg.sender == self._admin.get(), "Only admin can pause")
		self._paused.set( not self.isPaused() )

	@external
	def mint(self, _value: int) -> None:
		'''
		Creates `_value` number of tokens, and assigns to caller account.
		Increases the balance of that account and total supply.
		Only issuers can call ths method.

		:param _value: Number of tokens to be created at the account.
		'''
		self._mint(self.msg.sender, _value)

	@external
	def mintTo(self, _to: Address, _value: int) -> None:
		'''
		Creates `_value` number of tokens, and assigns to `_to`.
		Increases the balance of that account and total supply.
		Only issuers can call ths method.

		:param _to: The account at which token is to be created.
		:param _value: Number of tokens to be created at the account.
		'''
		self._mint(_to, _value)

	@external
	def burn(self, _value:int) -> None:
		'''
		Destroys `_value` number of tokens from the caller account.
		Decreases the balance of that account and total supply.

		:param _value: Number of tokens to be destroyed.
		'''
		self._burn(self.msg.sender, _value)

	def _transfer(self, _from: Address, _to: Address, _value: int, _data: bytes = None):
		'''
		Transfers certain amount of tokens from `_from` to `_to`.
		This is an internal function.

		:param _from: The account from which the token is to be transferred.
		:param _to: The account to which the token is to be transferred.
		:param _value: The no. of tokens to be transferred.
		:param _data: Any information or message
		'''
		require(_value > 0, "Cannot transfer zero or less")
		require(self._balances[_from] >= _value, "Insufficent Balance")
		require(_to != EOA_ZERO, "Cannot transfer to zero address")
		require(self.isPaused() == False, "Cannot transfer when paused")

		self._balances[_from] = self._balances[_from] - _value
		self._balances[_to] = self._balances[_to] + _value

		if _data is None:
			_data = b'None'

		if _to.is_contract:
			'''
			If the recipient is SCORE,
			then calls `tokenFallback` to hand over control.
			'''
			recipient_score = self.create_interface_score(_to, TokenFallbackInterface)
			recipient_score.tokenFallback(_from, _value, _data)

		# Emits an event log `Transfer`
		self.Transfer(_from, _to, _value, _data)

	def _mint(self, _to: Address, _value:int) -> None:
		'''
		Mints `_value` tokens at `_to` address.
		Internal Function

		:param _to: The account at which token is to be minted.
		:param _value: Number of tokens to be minted at the account.
		'''
		require(_to != EOA_ZERO, "Cannot mint to zero address")
		require(_value > 0, "Amount to mint should be greater than zero")
		require(self.msg.sender in self.getIssuers(), "Only issuers can mint")
		require(self.isPaused() == False, "Cannot mint when paused")

		self._allowances[self.msg.sender]-=_value
		require(self._allowances[self.msg.sender] >= 0, "Allowance amount to mint exceed")

		self._total_supply.set(self.totalSupply() + _value)
		self._balances[_to] += _value

		self.Transfer(EOA_ZERO, _to, _value, b'mint')

	def _burn(self, _from: Address, _value: int) -> None:
		'''
		Burns `_value` amount of tokens from `_from` address.
		Internal Function

		:param _from: The account at which token is to be destroyed.
		:param _value: Number of tokens to be destroyed at the `_from`.
		'''
		require(_from != EOA_ZERO, "Cannot burn from zero address")
		require(_value > 0, "Amount to burn should be greater than zero")
		require(self._balances[_from] >= _value, "Insufficent balance to burn")
		require(self.isPaused() == False, "Cannot burn when paused")

		self._total_supply.set(self.totalSupply() - _value)
		self._balances[_from] -= _value

		self.Transfer(_from, EOA_ZERO, _value, b'burn')