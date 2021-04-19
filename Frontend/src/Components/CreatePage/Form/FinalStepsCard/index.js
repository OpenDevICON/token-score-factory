import React from 'react';
import { Card } from 'react-bootstrap';
import AppInputField from '../AppInputField';
import { networkMapping } from 'Constant';
import { Col, Form, Row, Button } from 'react-bootstrap';

const FinalStepsCard = (formik) => {

    return (
        <Card style={{ width: '100%', marginTop: '20px', marginBottom: '20px' }}>
            <Card.Body>

                <div className="form-header" style={{ textAlign: 'center' }}>Final Steps</div>

                <hr className="form-hr" />
                <Row>
                <Col lg="6" className = "final-steps-left">

                    <AppInputField as="select" formik={formik} label="Network" id="network" placeholder="Name of your token" alwaysShow >
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

                <Col lg = "6">
                    <div className = "charge-header">
                        <div>
                            Charges
                        </div>
                    </div>


                    <Row className = "chargeRow">
                        <Col xs = "6">
                            <Form.Label>Estimated Transaction Fee:</Form.Label>
                        </Col>
                        <Col xs = "6" style = {{display: 'flex', alignItems: 'center'}}>
                            <span className = "charge-value">{formik.formik.values.estimatedTransactionFee} ICX</span>
                        </Col>
                    </Row>

                </Col>
                </Row>
                <div className = "submit-button-container">
                    <Button variant="info" type="submit">CREATE</Button>{' '}
                </div>
            </Card.Body>
        </Card>
    )
}

export default FinalStepsCard;