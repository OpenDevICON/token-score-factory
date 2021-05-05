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

  const formik = useFormik({
    initialValues: {
      name: '',
      symbol: '',
      decimals: '',
      initialSupply: '',
      totalSupply: '',
      tokenType: 'simple_irc2',
      network: 'yeouido',
      termsOfUseAgreement: false,

      supplyType: '-',
      accessType: '-',
      transferType: '-',

      burnable: false,
      mintable: false,
      pausable: false,
      irc1363: false,
      tokenRecover: false,
      verifiedSourceCode: false,
      removeCopyright: false,

      estimatedTransactionFee: 0

    },
    validationSchema: Yup.object({
        name: Yup.string()
        .required('Required'),
        symbol: Yup.string()
        .required('Required'),
        decimals: Yup.number()
        .required('Required').positive().max(21),
        initialSupply: Yup.number()
        .required('Required').positive(),
        totalSupply: Yup.number()
        .required('Required').positive().when('initialSupply', (initialSupply, schema) => {
          return schema.test({
            test: totalSupply => !!initialSupply && (totalSupply > initialSupply || totalSupply === initialSupply),
            message: "Total Supply should be equal to or greater than initial supply."
          })
        }),
        tokenType: Yup.string()
        .required('Required'),
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
        tokenUrl: selectedTokenMapping.tokenUrl,
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

      formik.setFieldValue("supplyType", selectedTokenMapping.supplyType);
      formik.setFieldValue("accessType", selectedTokenMapping.accessType);
      formik.setFieldValue("transferType", selectedTokenMapping.transferType);

      formik.setFieldValue("burnable", selectedTokenMapping.burnable);
      formik.setFieldValue("mintable", selectedTokenMapping.mintable);
      formik.setFieldValue("pausable", selectedTokenMapping.pausable);
      formik.setFieldValue("irc1363", selectedTokenMapping.irc1363);
      formik.setFieldValue("tokenRecover", selectedTokenMapping.tokenRecover);
      formik.setFieldValue("verifiedSourceCode", selectedTokenMapping.verifiedSourceCode);
      formik.setFieldValue("removeCopyright", selectedTokenMapping.removeCopyright);

      formik.setFieldValue("estimatedTransactionFee", selectedTokenMapping.estimatedTransactionFee);

     // eslint-disable-next-line 
  }, [
    formik.values.tokenType])

    useEffect(() => {
      if(formik.values.supplyType === 'Capped') {
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
