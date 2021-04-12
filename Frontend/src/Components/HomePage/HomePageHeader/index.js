import React from 'react';
import { Col, Row } from 'react-bootstrap'
import infoSvg from 'Assets/svg/iconheader.svg';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import euroSvg from 'Assets/svg/euro.svg';
import dollarSvg from 'Assets/svg/dollar.svg';
import homePageInfoIconSvg from 'Assets/svg/homepage-info-icon.svg'

const HomePageHeader = () => {

    const history = useHistory();

    return (
        <>
            <Row className="info-header-homepage">
                <Col lg="4" className="tsf-info-image-container">
                    <img src={infoSvg} alt="tsf info" />

                </Col>

                <Col lg="8" className="header-info-container">
                    <div className="info-title">

                        <img src={euroSvg} alt="" />
                        <span className="info-title-item">TOKEN SCORE FACTORY</span>
                        <img className="info-title-item" src={dollarSvg} alt="" />

                    </div>


                    <div className="info-icon-container">
                        <img src={homePageInfoIconSvg} alt="" />

                    </div>

                    <div className="info-desc-container">

                        <span className="info-desc">
                            <span>Create IRC Tokens on the ICON blockchain. You can deploy your favourite tokens without writing a single line of code.</span>
                            <div to="/create" as="Button" className="create-now-button-link" >
                                <Button size="lg" variant="create-button" className="create-now-button" style={{ marginBottom: '10px' }}
                                    onClick={() => history.push('/create')}
                                >CREATE NOW</Button>
                            </div>
                        </span>

                    </div>

                </Col>
            </Row>
        </>
    )
}

export default HomePageHeader;