import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap'
import infoSvg from 'Assets/svg/info-img.svg';
import walletSvg from 'Assets/svg/wallet.svg'
import { getWalletAddress, getCookie } from 'Helpers';

const Header = ({walletAddress, setWalletAddress}) => {

    useEffect(() => {
        if(getCookie('wallet_address')) {
            setWalletAddress(getCookie('wallet_address'))
        }
    }, [setWalletAddress])

    const handleOnWalletClick = async () => {

        let walletAddress = await getWalletAddress();
        setWalletAddress(walletAddress);

    }
    return (
        <>
            <Row style={{ minHeight: '70px', background: '#49B1B8', display: 'flex', alignItems: 'center', paddingLeft: '20px', paddingRight: '20px' }}>
                <Col className="tsf-title">
                    TOKEN SCORE FACTORY
            </Col>
                <Col style={{ display: 'flex', justifyContent: 'flex-end', alignItems: "center" }}>
                    {
                        walletAddress && 
                        <span className = "walletAddress">{walletAddress}</span>
                    }
                    <img src = {walletSvg} alt = "wallet" className = "wallet-image" onClick = {handleOnWalletClick} />

                </Col>
            </Row>

            <Row className="info-header">
                <Col lg="4">
                    <img src = {infoSvg} alt = "tsf info" />

                </Col>

                <Col lg="8" className = "header-info-container">
                    <div className = "info-title">
                        CREATE YOUR OWN IRC TOKENS WITH EASE
                    </div>

                    <div style = {{display: 'flex', alignItems: 'center', marginTop: '80px'}}>
                        <svg width="23" height="99" viewBox="0 0 23 99" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="11.5" y1="-5.02681e-07" x2="11.5" y2="99" stroke="#B6D3D3" stroke-width="23" />
                        </svg>

                        <span className = "info-desc">
                            Easily deploy Smart Contract for a Standard, Capped, Mintable, Burnable, Payable IRC Token. No login. No setup. No coding required.
                        </span>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Header;