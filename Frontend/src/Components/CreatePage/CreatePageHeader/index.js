import React from 'react';
import { Col, Row } from 'react-bootstrap'
import infoSvg from 'Assets/svg/info-img.svg';
import verticalLineSvg from 'Assets/svg/vertical-line.svg';

const CreatePageHeader = () => {

    return (
        <>
            <Row className="info-header">
                <Col lg="4" className = "tsf-info-image-container">
                    <img src = {infoSvg} alt = "tsf info" />

                </Col>

                <Col lg="8" className = "header-info-container">
                    <div className = "info-title">
                        CREATE YOUR OWN IRC TOKENS WITH EASE
                    </div>

                    <div className = "info-desc-container">
                        <img src={verticalLineSvg} alt="" />

                        <span className = "info-desc">
                            Easily deploy Smart Contract for a Standard, Capped, Mintable, Burnable, Payable IRC Token. No login. No setup. No coding required.
                        </span>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default CreatePageHeader;