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

    }
]

export const networkMapping = [
    {
        name: 'ICON Testnet (Yeouido)',
        value: 'testnet',
        NID: `0x3`
    },

    {
        name: 'ICON Mainnet',
        value: 'mainnet',
        NID: `0x1`
    }
]

const IconService = require('icon-sdk-js');
const { HttpProvider } = IconService;

export const CONTRACT_DEPLOY_ADDRESS = 'cx0000000000000000000000000000000000000000';
export const CONTRACT_STATUS_ADDRESS = 'cx0000000000000000000000000000000000000001';

export const NODE_DEBUG_URL = 'https://bicon.net.solidwallet.io/api/debug/v3';
export const NODE_URL = 'https://bicon.net.solidwallet.io/api/v3';

export const provider = new HttpProvider(NODE_URL);
export const iconService = new IconService(provider);
