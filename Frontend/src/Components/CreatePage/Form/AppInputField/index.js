import { tokenTypeMapping } from 'Constant';
import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';

const AppInputField = ({ formik, label, id, placeholder, as, children, info, type = "text", alwaysShow = false, ...props }) => {

    const selectedTokenMapping = tokenTypeMapping.find(tokenType => formik.formik.values.tokenType === tokenType.value);

    return (
        <>
        {
        (selectedTokenMapping.tokenInformation.includes(id) || alwaysShow) &&
            <Form.Group style={{marginBottom: '0.6rem'}}>
                <Row>
                <Col md = {3} style={{display: 'flex', alignItems: 'center'}}>
                    <Form.Label>{label}:</Form.Label>
                </Col>
                <Col md = {9}>

                <Form.Control as = {as} id={id} type={type} placeholder={placeholder} {...formik.formik.getFieldProps(id)} style = {{backgroundColor: '#EEEEEE'}} {...props}>
                    {children}
                </Form.Control>
                {
                    info &&  <span className = "form-input-info">{info}</span>
                }
               
                {formik.formik.touched[id] && formik.formik.errors[id] ? (
                <div style = {{color: 'red'}}>{formik.formik.errors[id]}</div>
                ) : null}
                </Col>
                </Row>
            </Form.Group>
        }
        </>

    )
}

export default AppInputField;