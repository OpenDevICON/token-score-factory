import React from 'react';
import { Col, Row } from 'react-bootstrap';
import checkedsvg from 'Assets/svg/checked.svg'
import uncheckedsvg from 'Assets/svg/unchecked.svg'

const CheckedField = ({ checked, name, info }) => {
    return (
        <>
            <Row>
                <Col xs="1">
                    {checked ? <img src = {checkedsvg} alt = "checked" /> : 
                        <img src = {uncheckedsvg} alt = "unchecked" />}
                </Col>
                <Col xs="10" style={{paddingLeft: '0px'}}>
                    <span style = {{display: 'flex', flexDirection: 'column'}}>
                        {
                            <span className="form-check-field-name" style = {{marginLeft: '0px'}}>{name}</span>

                        }

                        {
                            info && <span className="form-check-field-info">{info}</span>
                        }
                    </span>
                </Col>
            </Row>
        </>


    )
}

export default CheckedField;