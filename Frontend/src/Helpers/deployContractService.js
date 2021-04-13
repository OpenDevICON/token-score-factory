import IconService, {HttpProvider, IconConverter, IconUtil} from 'icon-sdk-js';
import BigNumber from 'bignumber.js';
import { ICONEXResponse } from "./eventHandler";
import { WALLET_TYPE } from 'Constant';
import Transport from '@ledgerhq/hw-transport-u2f';
import AppIcx from '@ledgerhq/hw-app-icx';

async function estimateStepForDeployment(from, content, selectedNetworkData) {
  const timestampInDecimal = Date.now() * 1000;
  const timestamp = '0x' + timestampInDecimal.toString(16); //to hex string
  const txObj = {
    jsonrpc: "2.0",
    method: "debug_estimateStep",
    id: 1234,
    params: {
      version: '0x3',
      from,
      to: selectedNetworkData.CONTRACT_DEPLOY_ADDRESS,
      timestamp,
      nid: selectedNetworkData.NID,
      nonce: "0x1",
      dataType: "deploy",
      data: {
        contentType: "application/zip",
        content, // compressed SCORE data
      }
    }
  }

  try {
    const responsePromise = await fetch(selectedNetworkData.NODE_DEBUG_URL,
      {
        method: 'POST',
        body: JSON.stringify(txObj),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const responseJSON = await responsePromise.json();

    return responseJSON.result;

  } catch (err) {
    console.error("FETCH:", err);
    throw err;
  }
}

const signTransaction = async (transaction, walletPath) => {
  const rawTransaction = IconConverter.toRawTransaction(transaction);
  const hashKey = IconUtil.generateHashKey(rawTransaction);
  const transport = await Transport.create();
  const icx = new AppIcx(transport);
  const { signedRawTxBase64 } = await icx.signTransaction(walletPath, hashKey);
  rawTransaction.signature = signedRawTxBase64;
  return {
    getProperties: () => rawTransaction,
    getSignature: () => signedRawTxBase64
  };
}

export async function deployContractService(contractContent, params = {}, selectedNetworkData) {

  return new Promise(async (resolve, reject) => {

    try {

      const { IconConverter, IconBuilder } = IconService;
      const deployBuilder = new IconBuilder.DeployTransactionBuilder();

      const stepLimitInHex = await estimateStepForDeployment(localStorage.getItem('wallet_address'), contractContent, selectedNetworkData);
      const stepLimit = new BigNumber(stepLimitInHex).toNumber();

      const txnData = deployBuilder
        .nid(selectedNetworkData.NID)
        .from(localStorage.getItem('wallet_address'))
        .to(selectedNetworkData.CONTRACT_DEPLOY_ADDRESS)
        .stepLimit(new BigNumber(stepLimit).plus(1000000))
        .version(IconConverter.toBigNumber(3))
        .timestamp(Date.now() * 1000)
        .contentType('application/zip')
        .content(contractContent)
        .nonce(IconConverter.toBigNumber(1))
        .params(params)
        .build();

      const walletType = localStorage.getItem('wallet_type');
      if(walletType === WALLET_TYPE.ICONEX) {
        const txnPayload = {
          jsonrpc: '2.0',
          method: 'icx_sendTransaction',
          id: 6639,
          params: IconConverter.toRawTransaction(txnData),
        };
        console.log(txnPayload);
        window.parent.dispatchEvent(
          new CustomEvent('ICONEX_RELAY_REQUEST', {
            detail: {
              type: 'REQUEST_JSON-RPC',
              payload: txnPayload,
            },
          }),
        );
        ICONEXResponse.setTxnHash(null);
        let interval = setInterval(() => {
          if (ICONEXResponse.getTxnHash()) {
            resolve(ICONEXResponse.getTxnHash());
            clearInterval(interval);
          }
        }, 1000)
      } else if (walletType === WALLET_TYPE.LEDGER) {
        const provider = new HttpProvider(selectedNetworkData.NODE_URL);
        const iconService = new IconService(provider);  
        const walletPath = localStorage.getItem('ledger_path');
        const signedTransaction = await signTransaction(txnData, walletPath);
        console.log("Signed tx = ", signedTransaction);
        try{
          const res = await iconService.sendTransaction(signedTransaction).execute();
          resolve(res);
        } catch(err) {
          console.log(`ERROR MESSAGE FROM LEDGER WALLET:: ${JSON.stringify(err)}`);
          reject(`ERROR MESSAGE FROM LEDGER WALLET:: ${JSON.stringify(err)}`);
        }
      }


    } catch (err) {
      reject(err);
    }
  })


}