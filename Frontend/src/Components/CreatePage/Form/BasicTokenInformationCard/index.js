import React from 'react';
import { Card } from 'react-bootstrap';
import AppInputField from '../AppInputField'

const BasicTokenInformationCard = (formik, label) => {

    return (
        <Card style={{ width: '100%', height: '100%' }}>
            <Card.Body>
                <div className="form-header">Basic Token Information</div>
                <hr className = "form-hr" />

                <AppInputField formik = {formik} label = "Name" id = "name" placeholder = "Name of your token" info="&nbsp;"/>
                <AppInputField formik = {formik} label = "Symbol" id = "symbol" placeholder = "Token Symbol" info = "Usually 3-5 chars"/>
                <AppInputField type = "number" formik = {formik} label = "Decimals" id = "decimals" placeholder = "Decimal Precision of Token" info = "Eg: 18" min = {0}/>
                <AppInputField type = "number" formik = {formik} label = "Initial Supply" id = "initialSupply" placeholder = "Initial Token Supply" info = "This amount of tokens will be available in your wallet" min = {0}/>
                <AppInputField type = "number" formik = {formik} label = "Total Supply" id = "totalSupply" placeholder = "Total Token Supply" info = "Maximum number ot tokens that can be created" min = {0} disabled={formik.formik.values.supplyType === 'Fixed'}/>

                <AppInputField formik = {formik} label = "Admin" id = "admin" placeholder = "Admin wallet address" info="&nbsp;"/>
                <AppInputField formik = {formik} label = "Issuer" id = "issuer" placeholder = "Issuer wallet address" info="&nbsp;"/>
                <AppInputField type = "number" formik = {formik} label = "No. of issuers" id = "noOfIssuers" placeholder = "No. of issuers" min = {0} info="&nbsp;"/>

            </Card.Body>
        </Card>
    )
}

export default BasicTokenInformationCard;