import { setCookie } from "./cookie";
import { isChrome } from "./isChrome";

let walletAddress = null;

export const customRequestAddress = new CustomEvent('ICONEX_RELAY_REQUEST', {
    detail: {
      type: 'REQUEST_ADDRESS',
      id: 1234
    }
  });

const eventHandler = (event) => {
    const { type, payload } = event.detail;

    console.log("EventDetail", event.detail)


    switch (type) {
        case 'RESPONSE_ADDRESS':
            console.log("login", payload);
            walletAddress = payload;
            setCookie('wallet_address', payload, 12 * 2 * 100);
            break;
        
        default:
            return;
    }
}

export const getWalletAddress = () => {

    return new Promise((resolve, reject) => {

        if(isChrome()) {
            walletAddress = null;
            window.dispatchEvent(customRequestAddress);
            window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
    
            let interval = setInterval(() => {
                if(walletAddress) {
                    resolve(walletAddress);
                    clearInterval(interval);
                }
            }, 1000)
        } else {
            reject("Please use chrome or chromium browser");
        }


    })

}