import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ibrizSvg from 'Assets/svg/ibriz.svg';
import { useLocation } from 'react-router';

const Footer = () => {

    const location = useLocation();
    return (
        <div className="footer">
            <Row>
                <Col lg="4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <a target="_blank" rel="noreferrer" href="https://docs.google.com/document/d/1pU3scz6pqBM9y9Vq6ZD6KpJiKhSadld3uqR6JvkvoSw/edit?usp=sharing" className="footer-text">Terms of Use</a>
                </Col>

                <Col lg="4" style={{ display: 'flex', flexDirection: 'column'}} className={location.pathname === '/' ? "footer-middle-col-home": "footer-middle-col"}>
                    <span className="footer-text">Developed By:</span>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={ibrizSvg} alt="" />
                        <span className="footer-text ibriz-text">iBriz.ai</span>
                    </div>
                    <a target="_blank" rel="noreferrer" href="https://docs.google.com/forms/d/e/1FAIpQLSeRoIUnEgUwRjbaEExVEyBAowR4xMPARqd5ZawRkKNfmtNKiQ/viewform" className="footer-text">Feedback</a>

                </Col>

                <Col lg="4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <span className="footer-text">©2021 All Rights Reserved.</span>
                </Col>
            </Row>
        </div>

    )
}

export default Footer;