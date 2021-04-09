import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ibrizSvg from 'Assets/svg/ibriz.svg';

const Footer = () => {
    return (
        <div className="footer">
            <Row>
                <Col lg="4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <a target="_blank" href="/" className="footer-text">Terms of Use</a>
                </Col>

                <Col lg="4" style={{ display: 'flex', flexDirection: 'column', paddingTop: '30px' }}>
                    <span className="footer-text">Developed By:</span>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={ibrizSvg} alt="" />
                        <span className="footer-text ibriz-text">iBriz.ai</span>
                    </div>
                    <span className="footer-text">Feedbacks</span>
                </Col>

                <Col lg="4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <span className="footer-text">©2021 All Rights Reserved.</span>
                </Col>
            </Row>
        </div>

    )
}

export default Footer;