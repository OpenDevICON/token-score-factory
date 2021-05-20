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

        tokenUrl: 'https://test-bucket-file-parse.s3-ap-southeast-1.amazonaws.com/sample_token_update.zip',
        estimatedTransactionFee: 10.62,
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

        tokenUrl: 'https://test-bucket-file-parse.s3-ap-southeast-1.amazonaws.com/sample_token_update.zip',
        estimatedTransactionFee: 10.62,
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

        tokenUrl: 'https://test-bucket-file-parse.s3-ap-southeast-1.amazonaws.com/sample_token_update.zip',
        estimatedTransactionFee: 10.62,
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

        tokenUrl: 'https://test-bucket-file-parse.s3-ap-southeast-1.amazonaws.com/sample_token_update.zip',
        estimatedTransactionFee: 10.62,
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

        tokenUrl: 'https://test-bucket-file-parse.s3-ap-southeast-1.amazonaws.com/sample_token_update.zip',
        estimatedTransactionFee: 10.62,
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

        tokenUrl: 'https://test-bucket-file-parse.s3-ap-southeast-1.amazonaws.com/sample_token_update.zip',
        estimatedTransactionFee: 10.62,
        tokenInformation: ['name', 'symbol', 'decimals', 'initialSupply', 'totalSupply']

    },

    {
        name: 'Burnable + Pausable IRC2',
        value: 'burnable_pausable_irc2',
        supplyType: 'Fixed',
        accessType: 'Permission Based',
        transferType: 'Stoppable',
        
        burnable: false,
        mintable: true,
        irc1363: true,
        pausable: true,
        tokenRecover: false,
        verifiedSourceCode: true,
        removeCopyright: false,

        tokenUrl: 'https://test-bucket-file-parse.s3-ap-southeast-1.amazonaws.com/sample_token_update.zip',
        estimatedTransactionFee: 10.62,
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

        tokenUrl: 'https://test-bucket-file-parse.s3-ap-southeast-1.amazonaws.com/sample_token_update.zip',
        estimatedTransactionFee: 10.62,
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

        tokenUrl: 'https://test-bucket-file-parse.s3-ap-southeast-1.amazonaws.com/sample_token_update.zip',
        estimatedTransactionFee: 10.62,
        tokenInformation: ['name', 'symbol', 'decimals', 'initialSupply', 'totalSupply']

    },

    {
        name: 'Simple IRC3',
        value: 'simple_irc3',
        supplyType: 'Capped',
        accessType: 'Role Based',
        transferType: 'Unstoppable',

        burnable: true,
        mintable: false,
        irc1363: true,
        tokenRecover: true,
        verifiedSourceCode: true,
        removeCopyright: false,

        tokenUrl: 'https://test-bucket-file-parse.s3-ap-southeast-1.amazonaws.com/sample_token_update.zip',
        estimatedTransactionFee: 10.62,
        tokenInformation: ['name', 'symbol']

    },

    {
        name: 'Metadata IRC3',
        value: 'metdata_irc3',
        supplyType: 'Uncapped',
        accessType: 'Permission Based',
        transferType: 'Stoppable',

        burnable: false,
        mintable: true,
        irc1363: false,
        tokenRecover: true,
        verifiedSourceCode: false,
        removeCopyright: true,

        tokenUrl: 'https://test-bucket-file-parse.s3-ap-southeast-1.amazonaws.com/sample_token_update.zip',
        estimatedTransactionFee: 10.62,
        tokenInformation: ['name', 'symbol']

    },

    {
        name: 'Enumerable IRC3',
        value: 'enumerable_irc3',
        supplyType: 'Uncapped',
        accessType: 'Permission Based',
        transferType: 'Stoppable',
        
        burnable: true,
        mintable: false,
        irc1363: true,
        tokenRecover: false,
        verifiedSourceCode: true,
        removeCopyright: false,

        tokenUrl: 'https://test-bucket-file-parse.s3-ap-southeast-1.amazonaws.com/sample_token_update.zip',
        estimatedTransactionFee: 10.62,
        tokenInformation: ['name', 'symbol']

    },

    {
        name: 'Full IRC3',
        value: 'full_irc3',
        supplyType: 'Uncapped',
        accessType: 'Permission Based',
        transferType: 'Stoppable',
        
        burnable: true,
        mintable: false,
        irc1363: true,
        tokenRecover: false,
        verifiedSourceCode: true,
        removeCopyright: false,

        tokenUrl: 'https://test-bucket-file-parse.s3-ap-southeast-1.amazonaws.com/sample_token_update.zip',
        estimatedTransactionFee: 10.62,
        tokenInformation: ['name', 'symbol']

    },

    {
        name: 'Mintable IRC3',
        value: 'mintable_irc3',
        supplyType: 'Uncapped',
        accessType: 'Permission Based',
        transferType: 'Stoppable',

        burnable: false,
        mintable: true,
        irc1363: false,
        tokenRecover: true,
        verifiedSourceCode: false,
        removeCopyright: true,

        tokenUrl: 'https://test-bucket-file-parse.s3-ap-southeast-1.amazonaws.com/sample_token_update.zip',
        estimatedTransactionFee: 10.62,
        tokenInformation: ['name', 'symbol']

    },

    {
        name: 'Metadata Mintable IRC3',
        value: 'metadata_mintable_irc3',
        supplyType: 'Uncapped',
        accessType: 'Permission Based',
        transferType: 'Stoppable',
        
        burnable: true,
        mintable: false,
        irc1363: true,
        tokenRecover: false,
        verifiedSourceCode: true,
        removeCopyright: false,

        tokenUrl: 'https://test-bucket-file-parse.s3-ap-southeast-1.amazonaws.com/sample_token_update.zip',
        estimatedTransactionFee: 10.62,
        tokenInformation: ['name', 'symbol']

    },

    {
        name: 'Burnable IRC3',
        value: 'burnable_irc3',
        supplyType: 'Capped',
        accessType: 'Role Based',
        transferType: 'Unstoppable',

        burnable: true,
        mintable: false,
        irc1363: true,
        tokenRecover: false,
        verifiedSourceCode: true,
        removeCopyright: false,

        tokenUrl: 'https://test-bucket-file-parse.s3-ap-southeast-1.amazonaws.com/sample_token_update.zip',
        estimatedTransactionFee: 10.62,
        tokenInformation: ['name', 'symbol']

    },

    {
        name: 'Pausable IRC3',
        value: 'pausable_irc3',
        supplyType: 'Uncapped',
        accessType: 'Permission Based',
        transferType: 'Stoppable',
        
        burnable: true,
        mintable: false,
        irc1363: true,
        tokenRecover: false,
        verifiedSourceCode: true,
        removeCopyright: false,

        tokenUrl: 'https://test-bucket-file-parse.s3-ap-southeast-1.amazonaws.com/sample_token_update.zip',
        estimatedTransactionFee: 10.62,
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

    {
        name: 'ICON Mainnet',
        value: 'mainnet',
        NID: `0x1`,
        NODE_URL: 'https://ctz.solidwallet.io/api/v3',
        NODE_DEBUG_URL: 'https://ctz.solidwallet.io/api/debug/v3',
        TRACKER_URL: 'https://tracker.icon.foundation/',
        CONTRACT_DEPLOY_ADDRESS: 'cx0000000000000000000000000000000000000000',
        CONTRACT_STATUS_ADDRESS: 'cx0000000000000000000000000000000000000001',

    }
]

export const WALLET_TYPE = {
    LEDGER: 'ledger',
    ICONEX: 'iconex'
};

export const ERROR_MESSAGES = {
    USER_CANCELLED_TRANSACTION: 'User Cancelled Transaction'
}

