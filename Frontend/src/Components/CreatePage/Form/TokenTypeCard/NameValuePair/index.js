import React from 'react';
import { Col, Row } from 'react-bootstrap';

const NameValuePair = ({ name, value }) => {
    return (
        <>
            <Row style = {{marginTop: '5px'}}>
                <Col md={3}>
                    <span className = "formKey">{name}:</span>
                </Col>
                <Col md={9}>

                    <span className = "formValue">{value}</span>

                </Col>
            </Row>
        </>

    )
}

export default NameValuePair;