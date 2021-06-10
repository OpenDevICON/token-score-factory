export const tokenTypeMapping = [
    {
        name: 'Basic IRC2',
        value: 'simple_irc2',
        supplyType: 'Fixed',
        accessType: 'Role Based',
        transferType: 'Unstoppable',

        burnable: false,
        mintable: false,
        irc1363: true,
        pausable: false,
        tokenRecover: false,
        verifiedSourceCode: true,
        removeCopyright: false,

        tokenUrl: 'https://raw.githubusercontent.com/OpenDevICON/token-score-factory/master/zips/basic_irc2.zip',
        estimatedTransactionFee: 13.24,
        tokenInformation: ['name', 'symbol', 'decimals', 'initialSupply', 'totalSupply']
    },

    {
        name: 'Mintable IRC2',
        value: 'mintable_irc2',
        supplyType: 'Capped',
        accessType: 'Permission Based',
        transferType: 'Stoppable',

        burnable: false,
        mintable: true,
        pausable: false,
        irc1363: false,
        tokenRecover: false,
        verifiedSourceCode: false,
        removeCopyright: true,

        tokenUrl: 'https://raw.githubusercontent.com/OpenDevICON/token-score-factory/master/zips/mintable_irc2.zip',
        estimatedTransactionFee: 13.37,
        tokenInformation: ['name', 'symbol', 'decimals', 'initialSupply', 'totalSupply']

    },

    {
        name: 'Burnable IRC2',
        value: 'burnable_irc2',
        supplyType: 'Fixed',
        accessType: 'Role Based',
        transferType: 'Unstoppable',

        burnable: true,
        mintable: false,
        irc1363: true,
        tokenRecover: false,
        pausable: false,
        verifiedSourceCode: true,
        removeCopyright: false,

        tokenUrl: 'https://raw.githubusercontent.com/OpenDevICON/token-score-factory/master/zips/burnable_irc2.zip',
        estimatedTransactionFee: 13.31,
        tokenInformation: ['name', 'symbol', 'decimals', 'initialSupply', 'totalSupply']

    },

    {
        name: 'Pausable IRC2',
        value: 'pausable_irc2',
        supplyType: 'Fixed',
        accessType: 'Permission Based',
        transferType: 'Stoppable',
        
        burnable: false,
        mintable: false,
        irc1363: true,
        pausable: true,
        tokenRecover: false,
        verifiedSourceCode: true,
        removeCopyright: false,

        tokenUrl: 'https://raw.githubusercontent.com/OpenDevICON/token-score-factory/master/zips/pausable_irc2.zip',
        estimatedTransactionFee: 13.35,
        tokenInformation: ['name', 'symbol', 'decimals', 'initialSupply', 'totalSupply']

    },

    {
        name: 'Mintable + Burnable IRC2',
        value: 'mintable_burnable_irc2',
        supplyType: 'Capped',
        accessType: 'Permission Based',
        transferType: 'Stoppable',
        
        burnable: true,
        mintable: true,
        irc1363: true,
        pausable: false,
        tokenRecover: false,
        verifiedSourceCode: true,
        removeCopyright: false,

        tokenUrl: 'https://raw.githubusercontent.com/OpenDevICON/token-score-factory/master/zips/mintburn_irc2.zip',
        estimatedTransactionFee: 13.40,
        tokenInformation: ['name', 'symbol', 'decimals', 'initialSupply', 'totalSupply']

    },

    {
        name: 'Mintable + Pausable IRC2',
        value: 'mintable_pausable_irc2',
        supplyType: 'Capped',
        accessType: 'Permission Based',
        transferType: 'Stoppable',
        
        burnable: false,
        mintable: true,
        irc1363: true,
        pausable: true,
        tokenRecover: false,
        verifiedSourceCode: true,
        removeCopyright: false,

        tokenUrl: 'https://raw.githubusercontent.com/OpenDevICON/token-score-factory/master/zips/mintpause_irc2.zip',
        estimatedTransactionFee: 13.45,
        tokenInformation: ['name', 'symbol', 'decimals', 'initialSupply', 'totalSupply']

    },

    {
        name: 'Burnable + Pausable IRC2',
        value: 'burnable_pausable_irc2',
        supplyType: 'Fixed',
        accessType: 'Permission Based',
        transferType: 'Stoppable',
        
        burnable: true,
        mintable: false,
        irc1363: true,
        pausable: true,
        tokenRecover: false,
        verifiedSourceCode: true,
        removeCopyright: false,

        tokenUrl: 'https://raw.githubusercontent.com/OpenDevICON/token-score-factory/master/zips/burnpause_irc2.zip',
        estimatedTransactionFee: 13.39,
        tokenInformation: ['name', 'symbol', 'decimals', 'initialSupply', 'totalSupply']

    },

    {
        name: 'Mintable + Burnable + Pausable IRC2',
        value: 'mintable_burnable_pausable_irc2',
        supplyType: 'Capped',
        accessType: 'Permission Based',
        transferType: 'Stoppable',
        
        burnable: true,
        mintable: true,
        irc1363: true,
        pausable: true,
        tokenRecover: false,
        verifiedSourceCode: true,
        removeCopyright: false,

        tokenUrl: 'https://raw.githubusercontent.com/OpenDevICON/token-score-factory/master/zips/mintburnpause_irc2.zip',
        estimatedTransactionFee: 13.51,
        tokenInformation: ['name', 'symbol', 'decimals', 'initialSupply', 'totalSupply']

    },

    {
        name: 'Complete IRC2',
        value: 'complete_irc2',
        supplyType: 'Capped',
        accessType: 'Permission Based',
        transferType: 'Stoppable',
        
        burnable: true,
        mintable: true,
        irc1363: true,
        pausable: true,
        tokenRecover: true,
        verifiedSourceCode: true,
        removeCopyright: false,

        tokenUrl: 'https://raw.githubusercontent.com/OpenDevICON/token-score-factory/master/zips/complete_irc2.zip',
        estimatedTransactionFee: 13.54,
        tokenInformation: ['name', 'symbol', 'decimals', 'initialSupply', 'totalSupply']

    },

    {
        name: 'Mintable IRC3',
        value: 'mintable_irc3',
        accessType: 'Permission Based',
        transferType: 'Stoppable',

        burnable: false,
        mintable: true,
        approval: true,
        tokenUri: true,
        irc1363: false,
        verifiedSourceCode: false,
        removeCopyright: true,

        tokenUrl: 'https://raw.githubusercontent.com/OpenDevICON/token-score-factory/master/zips/mintable_irc3.zip',
        tokenUrlOnlyOwner: 'https://raw.githubusercontent.com/OpenDevICON/token-score-factory/master/zips/owner_mintable_irc3.zip',
        estimatedTransactionFee: 13.35,
        estimatedTransactionFeeOnlyOwner: 13.38,
        tokenInformation: ['name', 'symbol']

    },

    {
        name: 'Burnable IRC3',
        value: 'burnable_irc3',
        accessType: 'Role Based',
        transferType: 'Unstoppable',

        burnable: true,
        mintable: true,
        approval: true,
        tokenUri: true,
        irc1363: true,
        verifiedSourceCode: true,
        removeCopyright: false,

        tokenUrl: 'https://raw.githubusercontent.com/OpenDevICON/token-score-factory/master/zips/burnable_irc3.zip',
        tokenUrlOnlyOwner: 'https://raw.githubusercontent.com/OpenDevICON/token-score-factory/master/zips/owner_burnable_irc3.zip',
        estimatedTransactionFee: 13.39,
        estimatedTransactionFeeOnlyOwner: 13.43,
        tokenInformation: ['name', 'symbol']

    },
]

export const networkMapping = [
    {
        name: 'ICON Testnet (Yeouido)',
        value: 'yeouido',
        NID: `0x3`,
        NODE_URL: 'https://bicon.net.solidwallet.io/api/v3',
        NODE_DEBUG_URL: 'https://bicon.net.solidwallet.io/api/debug/v3',
        TRACKER_URL: 'https://bicon.tracker.solidwallet.io/',
        CONTRACT_DEPLOY_ADDRESS: 'cx0000000000000000000000000000000000000000',
        CONTRACT_STATUS_ADDRESS: 'cx0000000000000000000000000000000000000001',
    },

    {
        name: 'ICON Testnet (Pagoda)',
        value: 'pagoda',
        NID: `0x50`,
        NODE_URL: 'https://zicon.net.solidwallet.io/api/v3',
        NODE_DEBUG_URL: 'https://zicon.net.solidwallet.io/api/debug/v3',
        TRACKER_URL: 'https://zicon.tracker.solidwallet.io/',
        CONTRACT_DEPLOY_ADDRESS: 'cx0000000000000000000000000000000000000000',
        CONTRACT_STATUS_ADDRESS: 'cx0000000000000000000000000000000000000001',
    },

    // {
    //     name: 'ICON Mainnet',
    //     value: 'mainnet',
    //     NID: `0x1`,
    //     NODE_URL: 'https://ctz.solidwallet.io/api/v3',
    //     NODE_DEBUG_URL: 'https://ctz.solidwallet.io/api/debug/v3',
    //     TRACKER_URL: 'https://tracker.icon.foundation/',
    //     CONTRACT_DEPLOY_ADDRESS: 'cx0000000000000000000000000000000000000000',
    //     CONTRACT_STATUS_ADDRESS: 'cx0000000000000000000000000000000000000001',

    // }
]

export const WALLET_TYPE = {
    LEDGER: 'ledger',
    ICONEX: 'iconex'
};

export const ERROR_MESSAGES = {
    USER_CANCELLED_TRANSACTION: 'User Cancelled Transaction'
}

