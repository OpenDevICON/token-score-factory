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
        qstn: `What are IRC2 mintable tokens?`,
        ans: `<p>IRC2 Mintable tokens are IRC2-compatible tokens with one added feature: new tokens can be created at any time and added to total supply. Standard IRC2 tokens don't have this feature, which makes them a fixed supply tokens. </p>
        <p>Tokens can be minted by the owner of SCORE only.</p>
        `
    },
    {
        qstn: `What are IRC2 burnable tokens?`,
        ans: `<p>IRC2 Burnable tokens are IRC2-compatible tokens with one added feature: tokens can be burned(destroyed) at any time and reduced from the total supply. Standard IRC2 tokens don't have this feature, which makes them a fixed supply tokens.</p>
        <p>Tokens holders can burn the token they own.</p>`
    },
    {
        qstn: `What are IRC2 pausable tokens?`,
        ans: `<p>IRC2 Pausable tokens are IRC2-compatible tokens with one added feature: token transfers can be paused and unpaused as per the requirement. Standard IRC2 tokens don't have this feature.</p>
        <p>Tokens can be paused by the owner of SCORE only.</p>
        `
    },

    {
        qstn: `What are ICR3 tokens?`,
        ans: `<span>IRC3 tokens are ICON’s non-fungible token (NFT) standard, inspired by ERC721.</span>`
    },
    {
        qstn: `What are IRC3 mintable tokens?`,
        ans: `<p>IRC3 Mintable tokens are IRC3-compatible tokens, in which new NFTS can be minted using the SCORE for that contract. Minted tokens cannot be burned.
        </p>
        <p>It has 2 extensions that can be toggled via checkbox:
        <br/>&nbsp;&nbsp;&nbsp;&nbsp;i) Anyone can mint IRC3 Tokens.
        <br/>&nbsp;&nbsp;&nbsp;&nbsp;ii) Only SCORE owner can mint IRC3 Tokens.      
        </p>
        `
    },
    {
        qstn: `What are IRC3 burnable tokens?`,
        ans: `<p>IRC3 Burnable tokens are IRC3-compatible tokens, in which new NFTS can be minted and burned using the SCORE for that contract. Minted tokens can be burned.
        Once a token is burned, another token with same token id can be created.</p>
        <p>It has 2 extensions that can be toggled via checkbox:
        <br/>&nbsp;&nbsp;&nbsp;&nbsp;i) Anyone can mint IRC3 Tokens.
        <br/>&nbsp;&nbsp;&nbsp;&nbsp;ii) Only SCORE owner can mint IRC3 Tokens.   
        </p>`
    },
]