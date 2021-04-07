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

        tokenUrl: 'https://test-bucket-file-parse.s3-ap-southeast-1.amazonaws.com/sample_token.zip',
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

        tokenUrl: 'https://test-bucket-file-parse.s3-ap-southeast-1.amazonaws.com/sample_token.zip',

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

        tokenUrl: 'https://test-bucket-file-parse.s3-ap-southeast-1.amazonaws.com/sample_token.zip',

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

        tokenUrl: 'https://test-bucket-file-parse.s3-ap-southeast-1.amazonaws.com/sample_token.zip',

    }
]

export const networkMapping = [
    {
        name: 'ICON Testnet',
        value: 'testnet'
    },

    {
        name: 'ICON Mainnet',
        value: 'mainnet'
    }
]