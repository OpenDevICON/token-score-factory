import { getByDisplayValue } from '@testing-library/dom';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

const CheckedField = ({ checked, name, info }) => {
    return (
        <>
            <Row>
                <Col xs="1">
                    {checked ? <svg width="22" height="22" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 29C0 21.3087 3.05535 13.9325 8.4939 8.4939C13.9325 3.05535 21.3087 0 29 0C36.6913 0 44.0675 3.05535 49.5061 8.4939C54.9446 13.9325 58 21.3087 58 29C58 36.6913 54.9446 44.0675 49.5061 49.5061C44.0675 54.9446 36.6913 58 29 58C21.3087 58 13.9325 54.9446 8.4939 49.5061C3.05535 44.0675 0 36.6913 0 29H0ZM27.3451 41.412L44.0413 20.5397L41.0253 18.1269L26.7883 35.9175L16.704 27.5152L14.2293 30.4848L27.3451 41.4159V41.412Z" fill="#49B1B8" />
                    </svg> : <svg width="22" height="22" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50.7083 9.29163C39.3333 -2.08337 20.6666 -2.08337 9.29163 9.29163C-2.08337 20.6666 -2.08337 39.3333 9.29163 50.7083C20.6666 62.0833 39.0416 62.0833 50.4166 50.7083C61.7916 39.3333 62.0833 20.6666 50.7083 9.29163ZM38.1666 42.25L30 34.0833L21.8333 42.25L17.75 38.1666L25.9166 30L17.75 21.8333L21.8333 17.75L30 25.9166L38.1666 17.75L42.25 21.8333L34.0833 30L42.25 38.1666L38.1666 42.25Z" fill="#CF4D4D" />
                    </svg>}
                </Col>
                <Col xs="10">
                    <span style = {{display: 'flex', flexDirection: 'column'}}>
                        {
                            <span className="form-check-field-name">{name}</span>

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