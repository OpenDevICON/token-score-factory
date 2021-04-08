import { isChrome } from "./isChrome";
import {eventHandler, ICONEXResponse} from './eventHandler';

window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);

export const customRequestAddress = new CustomEvent('ICONEX_RELAY_REQUEST', {
    detail: {
      type: 'REQUEST_ADDRESS',
      id: 1234
    }
  });

export const getWalletAddress = () => {

    return new Promise((resolve, reject) => {

        if(isChrome()) {
            ICONEXResponse.setWalletAddress(null);
            window.dispatchEvent(customRequestAddress);
    
            let interval = setInterval(() => {
                console.log(ICONEXResponse.getWalletAddress());
                if(ICONEXResponse.getWalletAddress()) {
                    clearInterval(interval);
                    resolve(ICONEXResponse.getWalletAddress());
                }
            }, 1000)
        } else {
            reject("Please use chrome or chromium browser");
        }


    })

}