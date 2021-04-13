import React, { useState } from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import ledgerImg from 'Assets/images/ledgern.png';
import iconImg from 'Assets/images/iconn.png';
import { getWalletAddress } from 'Helpers';
import { WALLET_TYPE } from 'Constant';
import LedgerTab from './LedgerTab';

const selectWalletStyle = {
    margin: '20px',
    paddingBottom: '10px'
};

function SelectWalletModal({ walletAddress, setWalletAddress, callBackAfterSelectingWalletAddress, ...props }) {

    const [selectedWalletType, setSelectedWalletType] = useState("");

    const handleSelectWalletType = async (walletType) => {
        setSelectedWalletType(walletType);

        if (walletType === WALLET_TYPE.ICONEX) {
            let walletAddress = await getWalletAddress();
            setWalletAddress(walletAddress);
            localStorage.setItem('wallet_address', walletAddress, 12 * 2 * 100);
            localStorage.setItem('wallet_type', WALLET_TYPE.ICONEX);
            if (callBackAfterSelectingWalletAddress && callBackAfterSelectingWalletAddress instanceof Function){
                callBackAfterSelectingWalletAddress();
            }
            props.onHide();

        } else if (walletType === WALLET_TYPE.LEDGER) {

        }
    }

    return (
        <Modal
            {...props}
            size="mdlg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="select-wallet"
        >
            <Modal.Body>
                <Row style={selectWalletStyle}>
                    <Col className="select-wallet-col">
                        <Button
                            active={selectedWalletType === WALLET_TYPE.LEDGER}
                            onClick={() => { handleSelectWalletType(WALLET_TYPE.LEDGER) }}
                            variant="info"
                            className="ledger-button wallet-button"
                        >
                            <img src={ledgerImg} alt="" />
                            {/* {' '}Ledger */}
                        </Button>
                    </Col>
                    <Col className="select-wallet-col">
                        <Button
                            active={selectedWalletType === WALLET_TYPE.ICONEX}
                            onClick={() => { handleSelectWalletType(WALLET_TYPE.ICONEX) }}
                            variant="info"
                            className="iconex-button wallet-button"
                        >
                            <img src={iconImg} alt="" />
                        </Button>
                    </Col>
                </Row>

                {
                    (selectedWalletType === WALLET_TYPE.LEDGER) &&
                    <Row>
                        <LedgerTab
                            onClose={() => props.onHide()}
                            walletAddress={walletAddress}
                            setWalletAddress={setWalletAddress}
                            callBackAfterSelectingWalletAddress = {() => callBackAfterSelectingWalletAddress()} />
                    </Row>
                }

            </Modal.Body>
        </Modal>
    );
}

export default SelectWalletModal;