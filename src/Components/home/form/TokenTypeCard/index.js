import React from 'react';
import { Card } from 'react-bootstrap';
import AppInputField from '../AppInputField';
import {tokenTypeMapping} from 'Constant';
import NameValuePair from './NameValuePair';

const TokenTypeCard = (formik, label) => {
    console.log("formik", formik.formik);

    const selectedTokenMapping = tokenTypeMapping.find(tokenType => formik.formik.values.tokenType === tokenType.value);
    return (
        <Card style={{ width: '100%', marginRight: '20px' }}>
            <Card.Body>
                <div className="form-header">Token Type</div>

                <AppInputField as = "select" formik = {formik} label = "Token Type" id = "tokenType" placeholder = "Name of your token" > 
                        {/* <option value="" disabled selected = "selected">Choose a token type</option> */}
                        {
                            tokenTypeMapping.map(tokenType => {
                                return <option value={tokenType.value}>{tokenType.name}</option>
                            }
                                
                                )
                        }

                </AppInputField>
                <NameValuePair name = "Supply Type" value = {selectedTokenMapping?.supplyType ?? '-'} />
                <NameValuePair name = "Access Type" value = {selectedTokenMapping?.accessType ?? '-'} />
                <NameValuePair name = "Transfer Type" value = {selectedTokenMapping?.transferType ?? '-'} />

                <button type="submit">Submit</button>
            </Card.Body>
        </Card>
    )
}

export default TokenTypeCard;