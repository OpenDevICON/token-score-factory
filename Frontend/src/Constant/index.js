export const tokenTypeMapping = [
    {
        name: 'Simple IRC2',
        value: 'simple_irc2',
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
        estimatedTransactionFee: 10.62
    },

    {
        name: 'Mintable IRC2',
        value: 'mintable_irc2',
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
        estimatedTransactionFee: 10.62

    },

    {
        name: 'Burnable IRC2',
        value: 'burnable_irc2',
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
        estimatedTransactionFee: 10.62

    },

    {
        name: 'Pausable IRC2',
        value: 'pausable_irc2',
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
        estimatedTransactionFee: 10.62

    }
]

export const networkMapping = [
    {
        name: 'ICON Testnet (Yeouido)',
        value: 'yeouido',
        NID: `0x3`,
        NODE_URL: 'https://bicon.net.solidwallet.io/api/v3',
        NODE_DEBUG_URL: 'https://bicon.net.solidwallet.io/api/debug/v3',
        CONTRACT_DEPLOY_ADDRESS: 'cx0000000000000000000000000000000000000000',
        CONTRACT_STATUS_ADDRESS: 'cx0000000000000000000000000000000000000001',
    },

    {
        name: 'ICON Testnet (Pagoda)',
        value: 'pagoda',
        NID: `0x50`,
        NODE_URL: 'https://zicon.net.solidwallet.io/api/v3',
        NODE_DEBUG_URL: 'https://zicon.net.solidwallet.io/api/debug/v3',
        CONTRACT_DEPLOY_ADDRESS: 'cx0000000000000000000000000000000000000000',
        CONTRACT_STATUS_ADDRESS: 'cx0000000000000000000000000000000000000001',
    },

    {
        name: 'ICON Mainnet',
        value: 'mainnet',
        NID: `0x1`,
        NODE_URL: 'https://ctz.solidwallet.io/api/v3',
        NODE_DEBUG_URL: 'https://ctz.solidwallet.io/api/debug/v3',
        CONTRACT_DEPLOY_ADDRESS: 'cx0000000000000000000000000000000000000000',
        CONTRACT_STATUS_ADDRESS: 'cx0000000000000000000000000000000000000001',

    }
]

