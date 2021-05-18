from iconservice import *

TAG = 'BurnableIRC3'
EOA_ZERO = Address.from_string('hx' + '0' * 40)

# An interface of ICON Token Standard, IRC-3
class TokenStandard(ABC):
    @abstractmethod
    def name(self) -> str:
        pass

    @abstractmethod
    def symbol(self) -> str:
        pass

    @abstractmethod
    def balanceOf(self, _owner: Address) -> int:
        pass

    @abstractmethod
    def ownerOf(self, _tokenId: int) -> Address:
        pass

    @abstractmethod
    def getApproved(self, _tokenId: int) -> Address:
        pass

    @abstractmethod
    def approve(self, _to: Address, _tokenId: int):
        pass

    @abstractmethod
    def transfer(self, _to: Address, _tokenId: int):
        pass

    @abstractmethod
    def transferFrom(self, _from: Address, _to: Address, _tokenId: int):
        pass


class BurnableIRC3(IconScoreBase):

    _NAME = 'name'
    _SYMBOL = 'symbol'
    _BALANCES = "balances"
    _OWNERS = "owners"
    _TOKEN_URIS = "token_URIs"
    _TOKEN_APPROVALS = "token_approvals"

    @eventlog(indexed=3)
    def Approval(self, _owner: Address, _approved: Address, _tokenId: int):
        pass

    @eventlog(indexed=3)
    def Transfer(self, _from: Address, _to: Address, _tokenId: int):
        pass

    def __init__(self, db: IconScoreDatabase) -> None:
        super().__init__(db)
        self._name = VarDB(self._NAME, db, value_type = str)
        self._symbol = VarDB(self._SYMBOL, db, value_type = str)
        self._balances = DictDB(self._BALANCES, db, value_type = int)
        self._owners = DictDB(self._OWNERS, db, value_type = Address)
        self._token_URIs = DictDB(self._TOKEN_URIS, db, value_type = str)
        self._token_approvals = DictDB(self._TOKEN_APPROVALS, db, value_type = Address)

    def on_install(self, _name: str, _symbol: str) -> None:
        super().on_install()
        if (len(_symbol) <= 0):
            revert("Symbol of token should have at least one character")

        if (len(_name) <= 0):
            revert("Name of token should have at least one character")

        self._name.set(_name)
        self._symbol.set(_symbol)

    def on_update(self) -> None:
        super().on_update()
    
    @external(readonly=True)
    def name(self) -> str:
        return self._name.get()

    @external(readonly=True)
    def symbol(self) -> str:
        return self._symbol.get()

    @external(readonly=True)
    def balanceOf(self, _owner: Address) -> int:
        # zero address check
        if _owner == EOA_ZERO:
            revert("Balance query for zero addresss")
        return self._balances[_owner]

    @external(readonly=True)
    def ownerOf(self, _tokenId: int) -> Address:
        owner = self._owners[_tokenId]
        if owner is None:
            revert("Token query for non existent or burnt token")
        # checks needed here
        if owner is EOA_ZERO:
            revert("Token query for non existent or burnt token")
        return owner

    @external(readonly=True)
    def getApproved(self, _tokenId: int) -> Address:
        # check if token exists
        if not self._token_exists(_tokenId):
            revert("Approved query for non existent token")
        approved_to = self._token_approvals[_tokenId]
        if approved_to is None:
            return EOA_ZERO
        return approved_to

    @external(readonly=True)
    def getTokenURI(self, _tokenId: int) -> str:
        if not self._token_exists(_tokenId):
            revert("URI query for non existent token")
        uri = self._token_URIs[_tokenId]
        return uri

    @external
    def approve(self, _to: Address, _tokenId: int):
        owner = self._owners[_tokenId]
        if _to == owner :
            revert("Cannot approve to token owner")
        if owner != self.msg.sender :
            revert("You do not own this token")

        self._approve(_to, _tokenId)

    @external
    def transfer(self, _to: Address, _tokenId: int):
        self._transfer(self.msg.sender, _to, _tokenId)

    @external
    def transferFrom(self, _from: Address, _to: Address, _tokenId: int):
        if not self._isApprovedOrOwner(self.msg.sender, _tokenId):
            revert("Not owner or approved")
        self._transfer(_from, _to, _tokenId)

    @external
    def mint(self, _to: Address, _tokenId: int, _tokenURI: str = None) -> None:
        if _to == EOA_ZERO:
            revert("Cannot transfer to zero address")
        if _tokenId < 0:
            revert("TokenId should be positive")
        # check for token should not exist
        if self._token_exists(_tokenId):
            revert("Token is already minted")

        self._balances[_to] += 1
        self._owners[_tokenId] = _to
        # ideally use IPFS hash for tokenURI
        if _tokenURI is None:
            _tokenURI = ""
        self._token_URIs[_tokenId] = _tokenURI
        self.Transfer(EOA_ZERO, _to, _tokenId)

    @external
    def burn(self, _tokenId: int) -> None:
        # this implementation allows minter to re-mint a burned token

        if not self._token_exists(_tokenId):
            revert("Trying to burn non existent token")

        if not self._isApprovedOrOwner(self.msg.sender, _tokenId):
            revert("Not owner or approved")

        owner = self.ownerOf(_tokenId)
        self._approve(EOA_ZERO, _tokenId) # clear approvals

        self._balances[owner] -= 1

        del self._owners[_tokenId]
        del self._token_URIs[_tokenId]

        self.Transfer(owner, EOA_ZERO, _tokenId)

    @external
    def setTokenURI(self, _tokenId: int, _tokenURI: str = None) -> None:
        if not self._token_exists(_tokenId):
            revert("Trying to set URI for non existent token")

        if self.msg.sender != self.ownerOf(_tokenId):
            revert("Changing URI of token that is not own")

        if _tokenURI is None:
            _tokenURI = ""

        self._token_URIs[_tokenId] = _tokenURI

    def _transfer(self, _from: Address, _to: Address, _tokenId: int ) -> None:
        # check if token exists
        self._token_exists(_tokenId)
        owner = self.ownerOf(_tokenId)

        if _from != owner:
            revert("Transfer of token that is not own")  
        if _to == owner :
            revert("Cannot approve to token owner")          
        if _to == EOA_ZERO:
            revert("Cannot transfer to zero address")

        self._approve(EOA_ZERO, _tokenId)

        self._balances[_from] -= 1
        self._balances[_to] += 1
        self._owners[_tokenId] = _to

        self.Transfer(_from, _to, _tokenId)

    def _approve(self, _to: Address, _tokenId: int):
        # check if token exists
        self._token_exists(_tokenId)
        self._token_approvals[_tokenId] = _to
        self.Approval(self.msg.sender, _to, _tokenId)

    def _isApprovedOrOwner(self, _spender: Address, _tokenId: int ) -> bool:
        # check if token exists
        self._token_exists(_tokenId)
        owner = self.ownerOf(_tokenId)
        approved_to = self.getApproved(_tokenId)
        return (_spender == owner or _spender == approved_to)

    def _token_exists(self, _tokenId: int) -> bool:
        owner = self._owners[_tokenId]
        if owner is None or owner is EOA_ZERO:
            return False
        return True
