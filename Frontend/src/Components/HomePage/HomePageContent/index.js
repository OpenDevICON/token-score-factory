import React from 'react';
import { Col, Row } from 'react-bootstrap';
import iconSvg from 'Assets/svg/icon.svg';
import rocketSvg from 'Assets/svg/rocket.svg';
import FAQ from './FAQ';

const HomePageContent = () => {
    return (
        <>
            <Row className="homepage-header-container">
                <span className="homepage-header">Getting Started</span>
            </Row>

            <Row>
                <Col className="homepage-info">
                    <img src={iconSvg} alt="" />
                    <span className="homepage-info-title">Install ICONex Wallet</span>
                    <span className="homepage-info-content">You need to have ICONex wallet with some ICX to pay for transaction fees.</span>
                </Col>



                <Col className="homepage-info">
                    <svg width="50" height="50" viewBox="0 0 124 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7052 27.6142H9.92764L0 15.9227L6.77752 8.12838L13.3641 15.7L26.8237 0L33.6012 7.90568L16.7052 27.6142ZM47.6336 11.1348H124V22.2695H47.6336V11.1348ZM47.6336 44.5391H124V55.6738H47.6336V44.5391ZM124 77.9433H47.6336V89.0781H124V77.9433ZM47.6336 111.348H124V122.482H47.6336V111.348ZM9.92764 61.0185H16.7052L33.6012 41.31L26.8237 33.5156L13.3641 49.2157L6.77752 41.5327L0 49.4383L9.92764 61.0185ZM16.7052 94.5341H9.92764L0 82.954L6.77752 75.0483L13.3641 82.7313L26.8237 66.9199L33.6012 74.8256L16.7052 94.5341ZM9.92764 128.05H16.7052L33.6012 108.341L26.8237 100.436L13.3641 116.247L6.77752 108.564L0 116.358L9.92764 128.05Z" fill="#35C5C9" />
                    </svg>
                    <span className="homepage-info-title">Provide Token Information</span>
                    <span className="homepage-info-content">You need to have ICONex wallet with some ICX to pay for transaction fees.</span>

                </Col>

                <Col className="homepage-info">
                    <img src={rocketSvg} alt="" />
                    <span className="homepage-info-title">Deploy Token</span>
                    <span className="homepage-info-content">Deploy your token to your preferred ICON network.</span>

                </Col>
            </Row>

            <FAQ />

        </>
    )
}

export default HomePageContent;