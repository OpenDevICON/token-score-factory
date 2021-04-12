import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import BasicTokenInformationCard from './BasicTokenInformationCard';
import TokenTypeCard from './TokenTypeCard';
import {Row, Col} from 'react-bootstrap';
import FinalStepsCard from './FinalStepsCard';
import {tokenTypeMapping} from 'Constant';
import { deployToken, getCookie, getWalletAddress } from 'Helpers';

const InputForm = ({setWalletAddress}) => {

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
        .required('Required').positive(),
        initialSupply: Yup.number()
        .required('Required').positive(),
        totalSupply: Yup.number()
        .required('Required').positive(),
        tokenType: Yup.string()
        .required('Required'),
        termsOfUseAgreement: Yup.boolean().isTrue('You must agree to the terms of use in order to deploy the token.')    }),
    onSubmit: async (values) => {
      const selectedTokenMapping = tokenTypeMapping.find(tokenType => values.tokenType === tokenType.value);

      let walletAddress = getCookie('wallet_address');
      if (!walletAddress) {
        walletAddress = await getWalletAddress();
        setWalletAddress(walletAddress);
      }

      deployToken({
        tokenUrl: selectedTokenMapping.tokenUrl,
        formValues: values
      });


    },
  });
  useEffect(() => {
      const selectedTokenMapping = tokenTypeMapping.find(tokenType => formik.values.tokenType === tokenType.value);

      formik.setFieldValue("supplyType", selectedTokenMapping.supplyType);
      formik.setFieldValue("accessType", selectedTokenMapping.accessType);
      formik.setFieldValue("transferType", selectedTokenMapping.transferType);

      formik.setFieldValue("burnable", selectedTokenMapping.burnable);
      formik.setFieldValue("mintable", selectedTokenMapping.mintable);
      formik.setFieldValue("irc1363", selectedTokenMapping.irc1363);
      formik.setFieldValue("tokenRecover", selectedTokenMapping.tokenRecover);
      formik.setFieldValue("verifiedSourceCode", selectedTokenMapping.verifiedSourceCode);
      formik.setFieldValue("removeCopyright", selectedTokenMapping.removeCopyright);

      formik.setFieldValue("estimatedTransactionFee", selectedTokenMapping.estimatedTransactionFee);

     // eslint-disable-next-line 
  }, [
    formik.values.tokenType])

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



    </form>
  );
};

export default InputForm;
