export const faqList = [
    {
        qstn: `What is a token?`,
        ans: `<p>A token is a representation of something in blockchain. This something can be money, services, shares in a company or anything. By representing something as tokens, we can allow smart contract to interact with them.</p>
        <p>Tokens can be used to represent an investor's stake in the company or they can be used for an economic purpose, just like legal tender. This means token holders can use them to make purchases or they can trade tokens just like other securities to make a profit.</p>`
    },
    {
        qstn: `What are ICR2 tokens?`,
        ans: `<span>IRC2 token are standard tokens equivalent to ERC20 for ICON blockchain. They help to keep track of fungible tokens.</span>`
    },
    {
        qstn: `What are mintable tokens?`,
        ans: `<p>IRC2 Mintable tokens are IRC2-compatible tokens with one added feature: new tokens can be created at any time and added to total supply. Standard IRC2 tokens don't have this feature, which makes them a fixed supply tokens. </p>
        <p>New tokens can be minted only by minters and owner of the contract which is set when the SCORE is first deployed or updated.</p>
        `
    },
    {
        qstn: `What are burnable tokens?`,
        ans: `<p>IRC2 Burnable tokens are IRC2-compatible tokens with one added feature: tokens can be burned(destroyed) at any time and reduced from the total supply. Standard IRC2 tokens don't have this feature, which makes them a fixed supply tokens.</p>
        <p>Tokens can be burnt only by burners and the owner of the contract which is set when the SCORE is first deployed or updated.</p>
        `
    },
    {
        qstn: `What are pausable tokens?`,
        ans: `<p>IRC2 Pausable tokens are IRC2-compatible tokens with one added feature: token transfers can be paused and unpaused as per the requirement. Standard IRC2 tokens don't have this feature.</p>
        <p>Only owner of SCORE and pausers can pause and unpause token transfers. When paused, no token transfers can take place - this also includes minting, burning.</p>
        `
    }
]