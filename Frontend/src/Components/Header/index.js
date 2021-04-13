import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import walletSvg from 'Assets/svg/wallet.svg'
import { Link, useLocation } from 'react-router-dom';
import ClassName from 'classnames';
import SelectWalletModal from './SelectWalletModal';

const Header = ({ walletAddress, setWalletAddress }) => {

    let location = useLocation();
    const [selectWalletModalShow, setSelectWalletModalShow] = React.useState(false);

    useEffect(() => {
        if (localStorage.getItem('wallet_address')) {
            setWalletAddress(localStorage.getItem('wallet_address'))
        }
    }, [setWalletAddress])

    const handleOnWalletClick = async () => {

        // let walletAddress = await getWalletAddress();
        // setWalletAddress(walletAddress);
        setSelectWalletModalShow(true)

    }
    return (
        <Row style={{ background: '#49B1B8', display: 'flex', alignItems: 'center', paddingLeft: '20px', paddingRight: '20px' }} className="header-main">
            <Col sm="4">
                <Link to='/' className="tsf-title">
                    TOKEN SCORE FACTORY
            </Link>
            </Col>
            <Col className="nav-links-container" sm="4" style={{ display: 'flex', justifyContent: 'center', alignItems: "center", height: '60px' }}>
                <Link to='/' className={ClassName('nav-link', { active: (location.pathname === '/') })}> Home </Link>
                <Link to='/create' className={ClassName('nav-link', { active: (location.pathname === '/create') })} > Create </Link>
            </Col>
            <Col style={{ display: 'flex', justifyContent: 'flex-end', alignItems: "center" }} sm="4">
                {
                    walletAddress &&
                    <span className="walletAddress">
                        {`${walletAddress?.slice(0, 4)}...${walletAddress?.slice(walletAddress.length - 3)}`}
                    </span>
                }
                <img src={walletSvg} alt="wallet" className="wallet-image" onClick={handleOnWalletClick} />

            </Col>

            <SelectWalletModal
                show={selectWalletModalShow}
                onHide={() => setSelectWalletModalShow(false)}
                walletAddress={walletAddress}
                setWalletAddress={setWalletAddress}
            />
        </Row>
    )

}

export default Header;