import React from 'react';
import { Card } from 'react-bootstrap';
import AppInputField from '../AppInputField';
import { networkMapping } from 'Constant';
import { Col, Form } from 'react-bootstrap';

const FinalStepsCard = (formik) => {

    return (
        <Card style={{ width: '100%', marginRight: '20px', height: '100%' }}>
            <Card.Body>

                <div className="form-header" style={{ textAlign: 'center' }}>Final Steps</div>

                <hr className="form-hr" />
                <Col lg="6">

                    <AppInputField as="select" formik={formik} label="Network" id="network" placeholder="Name of your token" >
                        {/* <option value="" disabled selected = "selected">Choose a token type</option> */}
                        {
                            networkMapping.map(network => {
                                return <option key={network.value} value={network.value}>{network.name}</option>
                            }

                            )
                        }

                    </AppInputField>

                    <Form.Group className = "terms-of-use">
                        <Form.Check type="checkbox" label = "I have thoroughly read and agreed to Token Score Factory’s Terms of Use."
                            {...formik.formik.getFieldProps('termsOfUseAgreement')}/>

                        {formik.formik.touched['termsOfUseAgreement'] && formik.formik.errors['termsOfUseAgreement'] ? (
                        <div style = {{color: 'red'}}>{formik.formik.errors['termsOfUseAgreement']}</div>
                ) : null}
                    </Form.Group>
                </Col>

                <button type="submit">Submit</button>
            </Card.Body>
        </Card>
    )
}

export default FinalStepsCard;