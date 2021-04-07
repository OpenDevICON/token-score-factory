import React from 'react';
import { Card } from 'react-bootstrap';
import AppInputField from '../AppInputField';
import {tokenTypeMapping} from 'Constant';
import NameValuePair from './NameValuePair';
import CheckedField from './CheckedField';
import {Row, Col} from 'react-bootstrap';

const TokenTypeCard = (formik, label) => {

    return (
        <Card style={{ width: '100%', height: '100%' }}>
            <Card.Body>
                <div className="form-header">Token Type</div>

                <hr className = "form-hr" />

                <AppInputField as = "select" formik = {formik} label = "Token Type" id = "tokenType" placeholder = "Name of your token" > 
                        {/* <option value="" disabled selected = "selected">Choose a token type</option> */}
                        {
                            tokenTypeMapping.map(tokenType => {
                                return <option key = {tokenType.value} value={tokenType.value}>{tokenType.name}</option>
                            }
                                
                                )
                        }

                </AppInputField>
                <NameValuePair name = "Supply Type" value = {formik.formik.values.supplyType} />
                <NameValuePair name = "Access Type" value = {formik.formik.values.accessType} />
                <NameValuePair name = "Transfer Type" value = {formik.formik.values.transferType} />

                <Row style = {{marginTop: '15px'}}>
                    <Col xs = "6">
                        <CheckedField checked = {formik.formik.values.burnable} name = {"Burnable"} />
                    </Col>

                    <Col xs = "6">
                        <CheckedField checked = {formik.formik.values.mintable} name = "Mintable"  />
                    </Col>
                </Row>

                <Row style = {{marginTop: '15px'}}>
                    <Col xs = "6">
                        <CheckedField checked = {formik.formik.values.irc1363} name = {"IRC1363"} />
                    </Col>

                    <Col xs = "6">
                        <CheckedField checked = {formik.formik.values.tokenRecover} name = "Token Recover"  />
                    </Col>

                </Row>

                <Row style = {{marginTop: '15px'}}>
                    <Col xs = "6">
                        <CheckedField checked = {formik.formik.values.verifiedSourceCode} name = {"Verified Source Code"} info = "Your source code will be automatically verified on Icon Tracker." />
                    </Col>

                    <Col xs = "6">
                        <CheckedField checked = {formik.formik.values.removeCopyright} name = "Remove Copyright" info = "Remove the link pointing to this page from your contract."  />
                    </Col>

                </Row>
            </Card.Body>
        </Card>
    )
}

export default TokenTypeCard;