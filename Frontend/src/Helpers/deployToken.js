import { networkMapping } from 'Constant';
import { NotificationManager } from 'react-notifications';
import { deployContractService } from './deployContractService';
import { getTxResultService } from './getTxResultService';
const { fetchContractContent } = require("./fetchContractContent")

export const deployToken = async ({
    tokenUrl,
    formValues
}) => {
    try {
        let contractContent = await fetchContractContent(tokenUrl);
        const paramsObj = {
            '_name': formValues.name,
            '_symbol': formValues.symbol,
            '_decimals': `${formValues.decimals}`,
            '_initialSupply': `${formValues.initialSupply}`,
        };
    
        console.log("Contract Content", contractContent);
        console.log("Params Object", paramsObj);
    
        const selectedNetworkData = networkMapping.find(network => network.value === formValues.network);
    
        const txHash = await deployContractService(contractContent, paramsObj, selectedNetworkData);
        console.log("txHash", txHash);
    
        const txResult = await getTxResultService(txHash, 1, selectedNetworkData);
        if (txResult.status === 0) {
            NotificationManager.error(txResult.failure.message, "Token Deploy Failed");
            throw Error(txResult.failure.message);
        } else if (txResult.status === 1) {
            NotificationManager.success("Token Deployed Successfully")
            return (
                {
                    txHash,
                    scoreAddress: txResult.scoreAddress
                }           
            )
        }
    } catch(err) {
        NotificationManager.error(err.message, "Error Deplying Token")
        throw Error(err.message);
    }

}