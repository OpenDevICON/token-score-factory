import React from 'react';
import { Col, Row } from 'react-bootstrap';

const NameValuePair = ({ name, value }) => {
    return (
        <>
            <Row style = {{marginTop: '5px'}}>
                <Col xs={3}>
                    <span className = "formKey">{name}</span>
                </Col>
                <Col xs={9}>

                    <span className = "formValue">{value}</span>

                </Col>
            </Row>
        </>

    )
}

export default NameValuePair;