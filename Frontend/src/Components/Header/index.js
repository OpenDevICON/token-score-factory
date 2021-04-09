import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import walletSvg from 'Assets/svg/wallet.svg'
import { getCookie, getWalletAddress } from 'Helpers';

const Header = ({walletAddress, setWalletAddress}) => {

    useEffect(() => {
        console.log("Cookie wallet", getCookie('wallet_address'))
        if(getCookie('wallet_address')) {
            setWalletAddress(getCookie('wallet_address'))
        }
    }, [setWalletAddress])

    const handleOnWalletClick = async () => {

        let walletAddress = await getWalletAddress();
        setWalletAddress(walletAddress);

    }
    return (
        <Row style={{ minHeight: '70px', background: '#49B1B8', display: 'flex', alignItems: 'center', paddingLeft: '20px', paddingRight: '20px' }}>
        <Col className="tsf-title">
            TOKEN SCORE FACTORY
        </Col>
        <Col style={{ display: 'flex', justifyContent: 'flex-end', alignItems: "center" }}>
            {
                walletAddress && 
                <span className = "walletAddress">
                    {`${walletAddress?.slice(0, 4)}...${walletAddress?.slice(walletAddress.length - 3)}`}
                </span>
            }
            <img src = {walletSvg} alt = "wallet" className = "wallet-image" onClick = {handleOnWalletClick} />

        </Col>
    </Row>
    )

}

export default Header;