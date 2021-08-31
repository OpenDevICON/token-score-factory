import IconService, {HttpProvider, IconConverter, IconUtil} from 'icon-sdk-js';
import BigNumber from 'bignumber.js';
import { ICONEXResponse } from "./eventHandler";
import { ERROR_MESSAGES, WALLET_TYPE } from 'Constant';
import Transport from '@ledgerhq/hw-transport-u2f';
import AppIcx from '@ledgerhq/hw-app-icx';
import secp from 'secp256k1';
import ethUtil from 'ethereumjs-util';
import {sha3_256} from 'js-sha3';

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

const signTransaction = async (transaction, walletPath, address) => {
  const rawTransaction = IconConverter.toRawTransaction(transaction);
  const hashKey = IconUtil.generateHashKey(rawTransaction);
  const transport = await Transport.create();
  const icx = new AppIcx(transport);
  const { signedRawTxBase64, hashHex } = await icx.signTransaction(walletPath, hashKey);

  console.group("Verifying");
  console.log('signedRawTxBase64', signedRawTxBase64);
  console.log('hashHex', hashHex);

  // console.log('Validating with signedRawTxBase64');
  // const validateSignatur = validateSignature(signedRawTxBase64, address, hashKey);
  // console.log(validateSignatur);

  console.log('Validating with hashHex');
  const validateSignature2 = validateSignature(hashHex, address, hashKey);
  console.log(validateSignature2);

  console.groupEnd();

  rawTransaction.signature = signedRawTxBase64;
  return {
    getProperties: () => rawTransaction,
    getSignature: () => signedRawTxBase64
  };
}

const validateSignature = (signature, address, payload) => {
	const signatureArray = Buffer.from(signature, 'base64');
	const signatureBuffer = signatureArray.subarray(0, 64);
	const recoveryBuffer = signatureArray.subarray(64);

	//Genrate the public key from signature, recovery_key and payload
	const publicKey = secp.ecdsaRecover(signatureBuffer,
		parseInt(recoveryBuffer.toString('hex')),
		new Uint8Array(Buffer.from(payload, 'hex')),
		false);
	const publicKeyBuffer = ethUtil.toBuffer(publicKey.slice(1));

	console.log('Length of public key buffer:' + publicKeyBuffer.length);

	//Decode the address from public key hash by taking last 40 bytes
	//Adding hx as prefix for idenitifying the EOA in ICON
	const decodedAddress = 'hx' + sha3_256(publicKeyBuffer).slice(-40);

	console.log('Requestor address' + decodedAddress);

	return address === decodedAddress;
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
          if(ICONEXResponse.getTxnHash() === -1) {
            clearInterval(interval);
            reject({
                message: ERROR_MESSAGES.USER_CANCELLED_TRANSACTION});
          } else if (ICONEXResponse.getTxnHash()) {
            clearInterval(interval);
            resolve(ICONEXResponse.getTxnHash());
          }
        }, 1000);
      } else if (walletType === WALLET_TYPE.LEDGER) {
        console.log("ledger found");

        const address = localStorage.getItem('wallet_address');

        const provider = new HttpProvider(selectedNetworkData.NODE_URL);
        const iconService = new IconService(provider);  
        const walletPath = localStorage.getItem('ledger_path');
        const signedTransaction = await signTransaction(txnData, walletPath, address);
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