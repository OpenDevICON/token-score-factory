import React from 'react';
import { Col, Row } from 'react-bootstrap';
import walletSvg from 'Assets/svg/wallet-blue.svg';
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
                <Col md = "3" className="homepage-info">
                    <img src={walletSvg} alt="" />
                    <span className="homepage-info-title">Install ICONex Wallet</span>
                    <span className="homepage-info-content">You need to have ICONex wallet with some ICX to pay for transaction fees.</span>
                </Col>

                <Col md = "3" className="homepage-info">
                    <img src={iconSvg} alt="" />
                    <span className="homepage-info-title">Get Some ICX</span>
                    <span className="homepage-info-content">If you are on testnet, you can get some ICX from the faucet:&nbsp; 
                        <a href="http://faucet.ibriz.ai/" rel="noreferrer" target="_blank">https://faucet.ibriz.ai/</a>
                    </span>
                </Col>



                <Col md = "3" className="homepage-info">
                    <img src={listSvg} alt="" />
                    <span className="homepage-info-title">Provide Token Information</span>
                    <span className="homepage-info-content">Enter your token name, symbol, initial supply and total supply information.</span>

                </Col>

                <Col md = "3" className="homepage-info">
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