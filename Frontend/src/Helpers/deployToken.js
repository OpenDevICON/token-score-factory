import { networkMapping, tokenTypeMapping, ERROR_MESSAGES } from 'Constant';
import { NotificationManager } from 'react-notifications';
import { deployContractService } from './deployContractService';
import { getTxResultService } from './getTxResultService';
const { fetchContractContent } = require("./fetchContractContent")

export const deployToken = async ({
    tokenUrl,
    formValues
}) => {
    try {
        const selectedTokenMapping = tokenTypeMapping.find(tokenType => formValues.tokenType === tokenType.value);

        const getTokenInformation = (key) => {
            return selectedTokenMapping.tokenInformation.includes(key) ? formValues[key] : undefined;
        }

        const getTokenInformationNumericValues = (key) => {
            let tokenInfo = getTokenInformation(key);
            return tokenInfo ? `${tokenInfo}` : undefined;
        }

        let contractContent = await fetchContractContent(tokenUrl);

        const paramsObj = {
            '_name': getTokenInformation('name'),
            '_symbol': getTokenInformation('symbol'),
            '_decimals': getTokenInformationNumericValues('decimals'),
            '_initialSupply': getTokenInformationNumericValues('initialSupply'),
            // '_totalSupply': getTokenInformationNumericValues('tokenSupply'),
        };
    
        console.log("Contract Content", contractContent);
        console.log("Params Object", paramsObj);
    
        const selectedNetworkData = networkMapping.find(network => network.value === formValues.network);
    
        const txHash = await deployContractService(contractContent, paramsObj, selectedNetworkData);
        console.log("txHash", txHash);
        NotificationManager.info("Token Deploy Request Sent.");

        const txResult = await getTxResultService(txHash, 1, selectedNetworkData);
        if (txResult.status === 0) {
            throw Error(txResult.failure.message);
        } else if (txResult.status === 1) {
            // NotificationManager.success("Token Deployed Successfully")
            return (
                {
                    txHash,
                    scoreAddress: txResult.scoreAddress
                }           
            )
        }
    } catch(err) {
        if(err.message !== ERROR_MESSAGES.USER_CANCELLED_TRANSACTION) {
            NotificationManager.error(err.message, "Error Deplying Token")
        }
        throw Error(err.message);
    }

}