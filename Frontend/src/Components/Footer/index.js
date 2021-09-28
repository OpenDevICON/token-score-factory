import React from 'react';
import { Col, Row } from 'react-bootstrap';
import techflowImg from 'Assets/images/techflow.png';
import { useLocation } from 'react-router';

const Footer = () => {

    const location = useLocation();
    return (
        <div className="footer">
            <Row>
                <Col lg = "6" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column'  }} className = "developedBy">
                    <span className="footer-text">Developed By:</span>
                    <a style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40px' }} href="https://techflow.space/" target="_blank" rel="noreferrer">
                        <img src={techflowImg} alt="" style={{width: '90px'}} />
                    </a>
                </Col>

                <Col lg = "6" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column' }} className = "supportedBy">
                    <span className="footer-text">Supported By:</span>
                    <a style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40px' }} href="https://iconosphere.io/" target="_blank" rel="noreferrer">
                    <span className="footer-text ibriz-text">ICONOsphere.io</span>

                    </a>
                </Col>
                    
            </Row>
            <Row>
                <Col lg="4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <a target="_blank" rel="noreferrer" href="https://docs.google.com/document/d/1pU3scz6pqBM9y9Vq6ZD6KpJiKhSadld3uqR6JvkvoSw/edit?usp=sharing" className="footer-text">Terms of Use</a>
                </Col>

                <Col lg="4" style={{ display: 'flex', flexDirection: 'column'}} className={location.pathname === '/' ? "footer-middle-col-home": "footer-middle-col"}>
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