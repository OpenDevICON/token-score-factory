import {deployContractService} from './deployContractService';
const { fetchContractContent } = require("./fetchContractContent")

export const deployToken = async ({
    tokenUrl,
    formValues
}) => {
    let contractContent = await fetchContractContent(tokenUrl);
    const paramsObj = {
        '_name': formValues.name,
        '_symbol': formValues.symbol,
        '_decimals': formValues.decimals,
        '_initialSupply': formValues.initialSupply,
    };

    console.log("Contract Content", contractContent);
    console.log("Params Object", paramsObj);

    const txHash = await deployContractService(contractContent, paramsObj);


}