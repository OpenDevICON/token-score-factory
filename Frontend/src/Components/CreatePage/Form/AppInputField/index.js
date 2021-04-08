import React from 'react';
import {Form, Col, Row} from 'react-bootstrap';

const AppInputField = ({formik, label, id, placeholder, as, children, info, type = "text", ...props}) => {
    return (
        <>
            <Form.Group>
                <Row>
                <Col md = {3}>
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

        </>

    )
}

export default AppInputField;