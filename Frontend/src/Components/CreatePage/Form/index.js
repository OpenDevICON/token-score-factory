import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import BasicTokenInformationCard from './BasicTokenInformationCard';
import TokenTypeCard from './TokenTypeCard';
import {Row, Col} from 'react-bootstrap';
import FinalStepsCard from './FinalStepsCard';
import {networkMapping, tokenTypeMapping} from 'Constant';
import { deployToken } from 'Helpers';
import SelectWalletModal from 'Components/Header/SelectWalletModal';
import DeployResultModal from './DeployResultModal';

const InputForm = ({walletAddress, setWalletAddress}) => {

  const [selectWalletModalShow, setSelectWalletModalShow] = React.useState(false);
  const [deployResultModalShow, setDeployResultModalShow] = React.useState(false);
  const [deployResult, setDeployResult] = React.useState({});
  const [selectedTokenMapping, setSelectedTokenMapping] = React.useState();

  const formik = useFormik({
    initialValues: {
      name: '',
      symbol: '',
      decimals: '',
      initialSupply: '',
      totalSupply: '',
      tokenType: 'simple_irc2',
      network: 'sejong',
      termsOfUseAgreement: false,

      supplyType: '',
      accessType: '-',
      transferType: '-',

      burnable: undefined,
      mintable: undefined,
      pausable: undefined,
      irc1363: undefined,
      tokenRecover: undefined,
      verifiedSourceCode: undefined,
      removeCopyright: undefined,

      onlyOwnerCanMint: false,

      estimatedTransactionFee: 0,
      estimatedTransactionFeeOnlyOwner: 0,

      admin: undefined,
      issuer: undefined,
      noOfIssuers: undefined

    },
    validationSchema: Yup.object({
        name: selectedTokenMapping?.tokenInformation.includes('name') && Yup.string()
        .required('Required'),
        symbol: selectedTokenMapping?.tokenInformation.includes('symbol') && Yup.string()
        .required('Required'),
        decimals: selectedTokenMapping?.tokenInformation.includes('decimals') && Yup.number()
        .required('Required').positive().max(77),
        initialSupply: selectedTokenMapping?.tokenInformation.includes('initialSupply') && Yup.number()
        .required('Required').positive(),
        totalSupply: selectedTokenMapping?.tokenInformation.includes('totalSupply') && Yup.number().positive().when('initialSupply', (initialSupply, schema) => {
          return schema.test({
            test: totalSupply => selectedTokenMapping.supplyType === 'Fixed' || !totalSupply || !initialSupply || (initialSupply && (totalSupply >= initialSupply)),
            message: "Total Supply should be equal to or greater than initial supply."
          })
        }),
        tokenType: Yup.string()
        .required('Required'),
        admin: selectedTokenMapping?.tokenInformation.includes('admin') && Yup.string().required('Required').trim().matches(/hx[\w\d]{40}/, 'Invalid wallet address' ).max(42, 'Invalid wallet address'),
        issuer: selectedTokenMapping?.tokenInformation.includes('issuer') && Yup.string().required('Required').trim().matches(/hx[\w\d]{40}/, 'Invalid wallet address').max(42, 'Invalid wallet address'),
        noOfIssuers: selectedTokenMapping?.tokenInformation.includes('noOfIssuers') && Yup.number(),

        termsOfUseAgreement: Yup.boolean().isTrue('You must agree to the terms of use in order to deploy the token.')    }),
    onSubmit: async (values) => {
      let walletAddress = localStorage.getItem('wallet_address');
      if (!walletAddress) {
        setSelectWalletModalShow(true);
      } else {
        deployTokenWithFormValues();
      }
    },
  });

  async function deployTokenWithFormValues () {
    try {
      setDeployResult({});
      const selectedTokenMapping = tokenTypeMapping.find(tokenType => formik.values.tokenType === tokenType.value);
      const selectedNetworkData = networkMapping.find(network => network.value === formik.values.network);
      const deployResult = await deployToken({
        tokenUrl: (!['mintable_irc3', 'burnable_irc3'].includes(formik.values.tokenType) || !formik.values.onlyOwnerCanMint) ? selectedTokenMapping.tokenUrl : selectedTokenMapping.tokenUrlOnlyOwner,
        formValues: formik.values
      });
      console.log("Deploy Result-", deployResult);
      setDeployResultModalShow(true);
      setDeployResult({...deployResult,
                      selectedNetworkData,
                      success: true });
    } catch(e) {
      console.log("Error1", e.message)
      // setDeployResultModalShow(true);
      // setDeployResult({...deployResult,
      //                 errorMessage: e.message,
      //                 success: false });
    }
  }
  useEffect(() => {
      const selectedTokenMapping = tokenTypeMapping.find(tokenType => formik.values.tokenType === tokenType.value);
      setSelectedTokenMapping(selectedTokenMapping);
      formik.setFieldValue("supplyType", selectedTokenMapping.supplyType);
      formik.setFieldValue("accessType", selectedTokenMapping.accessType);
      formik.setFieldValue("transferType", selectedTokenMapping.transferType);

      formik.setFieldValue("burnable", selectedTokenMapping.burnable);
      formik.setFieldValue("mintable", selectedTokenMapping.mintable);
      formik.setFieldValue("pausable", selectedTokenMapping.pausable);
      formik.setFieldValue("approval", selectedTokenMapping.approval);
      formik.setFieldValue("tokenUri", selectedTokenMapping.tokenUri);
      formik.setFieldValue("irc1363", selectedTokenMapping.irc1363);
      formik.setFieldValue("tokenRecover", selectedTokenMapping.tokenRecover);
      formik.setFieldValue("verifiedSourceCode", selectedTokenMapping.verifiedSourceCode);
      formik.setFieldValue("removeCopyright", selectedTokenMapping.removeCopyright);

      formik.setFieldValue("estimatedTransactionFee", selectedTokenMapping.estimatedTransactionFee);
      formik.setFieldValue("estimatedTransactionFeeOnlyOwner", selectedTokenMapping.estimatedTransactionFeeOnlyOwner);

     // eslint-disable-next-line 
  }, [
    formik.values.tokenType])

    useEffect(() => {
      if(formik.values.supplyType === 'Fixed') {
        formik.setFieldValue("totalSupply", formik.values.initialSupply);
      }
     // eslint-disable-next-line 
  }, [formik.values.initialSupply, formik.values.supplyType])

  return (
    <form onSubmit={formik.handleSubmit} className = "form" style = {{paddingLeft: '20px', paddingRight: '20px'}} >

      <Row style = {{paddingTop: '10px'}}>
        <Col lg="6" className = "basic-token-info-col">
            <BasicTokenInformationCard formik = {formik}/>
        </Col>

        <Col lg="6">
            <TokenTypeCard formik = {formik}/>
        </Col>
      </Row>

      <Row>
          <Col lg="12">
                <FinalStepsCard formik = {formik} />         
          </Col>
      </Row>

      {
        selectWalletModalShow && 
          <SelectWalletModal
          show={selectWalletModalShow}
          onHide={() => setSelectWalletModalShow(false)}
          walletAddress={walletAddress}
          setWalletAddress={setWalletAddress}
          callBackAfterSelectingWalletAddress = {() => {
            deployTokenWithFormValues();
          }}
      />
      }

      <DeployResultModal
        show={deployResultModalShow}
        onHide={() => setDeployResultModalShow(false)}
        deployResult={deployResult} />
      
    </form>
  );
};

export default InputForm;
