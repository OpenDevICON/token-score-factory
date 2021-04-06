import React from 'react';
import {Form, Col, Row} from 'react-bootstrap';

const AppInputField = ({formik, label, id, placeholder, as, children}) => {
    console.log("AppInputField", formik)
    return (
        <>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Row>
                <Col xs = {3}>
                    <Form.Label>{label}:</Form.Label>
                </Col>
                <Col xs = {9}>

                <Form.Control as = {as} id={id} type="email" placeholder={placeholder} {...formik.formik.getFieldProps(id)} style = {{backgroundColor: '#EEEEEE'}}>
                    {children}
                </Form.Control>
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