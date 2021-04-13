import React, { useState } from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import ledgerImg from 'Assets/images/ledgern.png';
import iconImg from 'Assets/images/iconn.png';
import { getWalletAddress } from 'Helpers';
import { WALLET_TYPE } from 'Constant';

const iconStyle = {
    height: '1.5em',
    display: 'inline'
};

const selectWalletStyle = {
    margin: '20px',
    borderBottom: '1px solid #ffff',
    paddingBottom: '10px'
};

function SelectWalletModal({ walletAddress, setWalletAddress, ...props }) {

    const [selectedWalletType, setSelectedWalletType] = useState("");

    const handleBtnClick = async (walletType) => {
        setSelectedWalletType(walletType);

        if (walletType === WALLET_TYPE.ICONEX) {
            let walletAddress = await getWalletAddress();          
            setWalletAddress(walletAddress);
            localStorage.setItem('wallet_address', walletAddress, 12 * 2 * 100);
            localStorage.setItem('wallet_type', WALLET_TYPE.ICONEX);
            props.onHide();

        } else if (walletType === WALLET_TYPE.ICONEX) {

        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row style={selectWalletStyle}>
                    <Col className="select-wallet-col">
                        <Button
                            active={selectedWalletType === WALLET_TYPE.LEDGER}
                            onClick={() => { handleBtnClick(WALLET_TYPE.LEDGER) }}
                            variant="info"
                        >
                            <img style={iconStyle} src={ledgerImg} alt="" />
                            {/* {' '}Ledger */}
                        </Button>
                    </Col>
                    <Col className="select-wallet-col">
                        <Button
                            active={selectedWalletType === WALLET_TYPE.ICONEX}
                            onClick={() => { handleBtnClick(WALLET_TYPE.ICONEX) }}
                            variant="info"
                        >
                            <img style={iconStyle} src={iconImg} alt="" />
                        </Button>
                    </Col>
                </Row><h4>Centered Modal</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
          </p>
            </Modal.Body>
            <Modal.Footer>
                Hello
        </Modal.Footer>
        </Modal>
    );
}

export default SelectWalletModal;