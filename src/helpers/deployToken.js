const { fetchContractContent } = require("./fetchContractContent")

export const deployToken = async ({
    tokenUrl,
    formValues
}) => {
    let contractContent = await fetchContractContent(tokenUrl);
    console.log("Contract Content", contractContent);
}