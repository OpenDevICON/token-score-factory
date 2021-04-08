import { NotificationManager } from 'react-notifications';
import { deployContractService } from './deployContractService';
import { getTxResultService } from './getTxResultService';
const { fetchContractContent } = require("./fetchContractContent")

export const deployToken = async ({
    tokenUrl,
    formValues
}) => {
    let contractContent = await fetchContractContent(tokenUrl);
    const paramsObj = {
        '_name': formValues.name,
        '_symbol': formValues.symbol,
        '_decimals': `${formValues.decimals}`,
        '_initialSupply': `${formValues.initialSupply}`,
    };

    console.log("Contract Content", contractContent);
    console.log("Params Object", paramsObj);

    const txHash = await deployContractService(contractContent, paramsObj, formValues.network);
    console.log("txHash", txHash);

    const txResult = await getTxResultService(txHash, 1);
    if (txResult.status === 0) {
        NotificationManager.error(txResult.failure.message, "Token Deploy Failed")
    } else if (txResult.status === 1) {
        NotificationManager.success("Token Deployed Successfully")
    }
}