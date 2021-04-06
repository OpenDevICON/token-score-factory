import React from 'react';
import { Card } from 'react-bootstrap';
import AppInputField from '../AppInputField'

const BasicTokenInformationCard = (formik, label) => {

    return (
        <Card style={{ width: '100%', marginLeft: '10px', height: '100%' }}>
            <Card.Body>
                <div className="form-header">Basic Token Information</div>
                <hr className = "form-hr" />

                <AppInputField formik = {formik} label = "Name" id = "name" placeholder = "Name of your token"/>
                <AppInputField formik = {formik} label = "Symbol" id = "symbol" placeholder = "Token Symbol" info = "Usually 3-5 chars"/>
                <AppInputField type = "number" formik = {formik} label = "Decimals" id = "decimals" placeholder = "Decimal Percision of Token" info = "Eg: 18"/>
                <AppInputField type = "number" formik = {formik} label = "Initial Supply" id = "initialSupply" placeholder = "Initial Token Supply" info = "This amount of tokens will be available in your wallet"/>
                <AppInputField type = "number" formik = {formik} label = "Total Supply" id = "totalSupply" placeholder = "Total Token Supply" info = "Maximum number ot tokens that can be created"/>

            </Card.Body>
        </Card>
    )
}

export default BasicTokenInformationCard;