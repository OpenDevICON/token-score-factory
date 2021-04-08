import { setCookie } from "./cookie";


export class ICONEXResponse {
    static walletAddress;
    static TxnHash;

    static getWalletAddress() {
        return this.walletAddress
    }

    static setWalletAddress(walletAddress) {
        this.walletAddress = walletAddress;
    }

    static getTxnHash() {
        console.log("Getting txn hash", this.TxnHash);
        return this.TxnHash
    }

    static setTxnHash(txnHash) {
        this.TxnHash = txnHash;
        console.log("Txn Hash Set to", this.TxnHash);
    }
}

export const eventHandler = (event) => {
    const { type, payload } = event.detail;

    console.log("EventDetail", event.detail)


    switch (type) {
        case 'RESPONSE_ADDRESS':
            console.log("login", payload);
            ICONEXResponse.setWalletAddress(payload);
            setCookie('wallet_address', payload, 12 * 2 * 100);
            break;

        case 'RESPONSE_JSON-RPC':
            console.log(payload);

            switch (payload.id) {
                case 6639:
                    console.log("SEt txhash", payload.result)
                    ICONEXResponse.setTxnHash(payload.result);
                    break;
                default:
                    break;
            }
            break;
        
        default:
            return;
    }
}