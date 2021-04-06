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
                <AppInputField formik = {formik} label = "Symbol" id = "symbol" placeholder = "Token Symbol"/>
                <AppInputField formik = {formik} label = "Decimals" id = "decimals" placeholder = "Decimal Percision of Token"/>
                <AppInputField formik = {formik} label = "Initial Supply" id = "initialSupply" placeholder = "Initial Token Supply"/>
                <AppInputField formik = {formik} label = "Total Supply" id = "totalSupply" placeholder = "Total Token Supply"/>

            </Card.Body>
        </Card>
    )
}

export default BasicTokenInformationCard;