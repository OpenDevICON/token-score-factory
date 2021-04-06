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
        verifiedSourceCode: false,
        removeCopyright: false
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
        removeCopyright: true
    },

    {
        name: 'Burnable IRC2',
        value: 'burnable_irc2',
        supplyType: 'Capped',
        accessType: 'Role Based',
        transferType: 'Unstoppable',

        burnable: false,
        mintable: false,
        irc1363: true,
        tokenRecover: false,
        verifiedSourceCode: true,
        removeCopyright: false
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
        removeCopyright: false
    }
]