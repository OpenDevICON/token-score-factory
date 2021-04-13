import React from 'react';
import { Col, Row } from 'react-bootstrap';
import iconSvg from 'Assets/svg/icon.svg';
import rocketSvg from 'Assets/svg/rocket.svg';
import listSvg from 'Assets/svg/list.svg';
import FAQList from './FAQList';

const HomePageContent = () => {
    return (
        <>
            <Row className="homepage-header-container">
                <span className="homepage-header">Getting Started</span>
            </Row>

            <Row>
                <Col md = "4" className="homepage-info">
                    <img src={iconSvg} alt="" />
                    <span className="homepage-info-title">Install ICONex Wallet</span>
                    <span className="homepage-info-content">You need to have ICONex wallet with some ICX to pay for transaction fees.</span>
                </Col>



                <Col md = "4" className="homepage-info">
                    <img src={listSvg} alt="" />
                    <span className="homepage-info-title">Provide Token Information</span>
                    <span className="homepage-info-content">Enter your token name, symbol, initial supply and total supply information.</span>

                </Col>

                <Col md = "4" className="homepage-info">
                    <img src={rocketSvg} alt="" />
                    <span className="homepage-info-title">Deploy Token</span>
                    <span className="homepage-info-content">Deploy your token to your preferred ICON network.</span>

                </Col>
            </Row>

            <FAQList />

        </>
    )
}

export default HomePageContent;