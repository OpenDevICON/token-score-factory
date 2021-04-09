import { getCookie } from "./cookie";
import IconService from 'icon-sdk-js';
import BigNumber from 'bignumber.js';
import { ICONEXResponse } from "./eventHandler";


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

export async function deployContractService(contractContent, params = {}, selectedNetworkData) {

  return new Promise(async (resolve, reject) => {

    try {

      const { IconConverter, IconBuilder } = IconService;
      const deployBuilder = new IconBuilder.DeployTransactionBuilder();

      const stepLimitInHex = await estimateStepForDeployment(getCookie('wallet_address'), contractContent, selectedNetworkData);
      const stepLimit = new BigNumber(stepLimitInHex).toNumber();

      const txnData = deployBuilder
        .nid(selectedNetworkData.NID)
        .from(getCookie('wallet_address'))
        .to(selectedNetworkData.CONTRACT_DEPLOY_ADDRESS)
        .stepLimit(new BigNumber(stepLimit).plus(1000000))
        .version(IconConverter.toBigNumber(3))
        .timestamp(Date.now() * 1000)
        .contentType('application/zip')
        .content(contractContent)
        .nonce(IconConverter.toBigNumber(1))
        .params(params)
        .build();

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

    } catch (err) {
      reject(err);
    }
  })


}