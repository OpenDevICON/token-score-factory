import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import BasicTokenInformationCard from './BasicTokenInformationCard';
import TokenTypeCard from './TokenTypeCard';
import {Row, Col} from 'react-bootstrap';
import FinalStepsCard from './FinalStepsCard';
import {tokenTypeMapping} from 'Constant';

const InputForm = () => {

  const formik = useFormik({
    initialValues: {
      name: '',
      symbol: '',
      decimals: '',
      initialSupply: '',
      totalSupply: '',
      tokenType: 'simple_irc2',
      network: 'testnet',
      termsOfUseAgreement: false,

      supplyType: '-',
      accessType: '-',
      transferType: '-',

      burnable: false,
      mintable: false,
      irc1363: false,
      tokenRecover: false,
      verifiedSourceCode: false,
      removeCopyright: false

    },
    validationSchema: Yup.object({
        name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
        symbol: Yup.string()
        .required('Required'),
        decimals: Yup.number()
        .required('Required'),
        initialSupply: Yup.number()
        .required('Required'),
        totalSupply: Yup.number()
        .required('Required'),
        tokenType: Yup.string()
        .required('Required')    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
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
  }, [formik.values.tokenType])

  return (
    <form onSubmit={formik.handleSubmit} className = "form" style = {{paddingLeft: '20px', paddingRight: '20px'}} >

      <Row style = {{paddingTop: '10px'}}>
        <Col lg="6">
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