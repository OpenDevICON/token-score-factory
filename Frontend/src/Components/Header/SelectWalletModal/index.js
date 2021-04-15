import React, { useEffect, useState } from 'react';
import Transport from '@ledgerhq/hw-transport-u2f';
import AppIcx from '@ledgerhq/hw-app-icx';
import { NotificationManager } from 'react-notifications';
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

const BASE_PATH = `44'/4801368'/0'/0'`;

function SelectWalletModal({ walletAddress, setWalletAddress, callBackAfterSelectingWalletAddress, ...props }) {

    const [selectedWalletType, setSelectedWalletType] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [icx, setIcx] = useState(null);
    // const [walletAddresses, setWalletAddresses] = useState(['hx9038432859428523','hx9038432859428523','hx9038432859428523','hx9038432859428523', 'hx49854929ae83', 'hx328549854893594', 'hx894325982589']);
    const [walletAddresses, setWalletAddresses] = useState([]);
    const [walletPaths, setWalletPaths] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const addressPerPage = 4;

    useEffect(() => {
        if (isConnected) {
            loadAddresses(false, icx);
        }
        // eslint-disable-next-line
    }, [currPage]);

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
            connectToLedger();
        }
    }

    const loadAddresses = async (suppressError, icx) => {
        let i = 0;
        let counter;
        const addresses = [];
        const paths = [];
        while (i < addressPerPage) {
            suppressError = true;
            counter = (currPage - 1) * addressPerPage + i;
            console.log('counter = ', counter);
            const path = `${BASE_PATH}/${counter}'`;
            console.log('PATH= ', path);
            let { address } = await icx.getAddress(path, false, true);
            address = address.toString();
            console.log('a wallet ', address);
            addresses.push(address);
            paths.push(path);
            i++;
        }
        console.log('ADDRESSES FOR A PAGE: ', addresses);
        setWalletAddresses(addresses);
        setWalletPaths(paths);
    };

    const connectToLedger = () => {
        let suppressError = false;

        setIsConnecting(true);
        Transport.create()
            .then(async (transport) => {
                transport.setDebugMode(false);
                const icx = new AppIcx(transport);
                setIcx(icx);
                console.log('Transportation channel established');
                try {
                    setIsConnected(true);
                    //test if its working first
                    await icx.getAddress(`${BASE_PATH}/0'`, false, true);

                    //our func here
                    await loadAddresses(suppressError, icx);

                    setIsConnecting(false);
                } catch (error) {
                    if (suppressError) {
                        console.warn('Failed connecting to Ledger.', error.message);
                        // NotificationManager.error(error.message instanceof string , "Connecting to Ledger Failed")
                        NotificationManager.error("Connecting to Ledger Failed")
                    }
                    else {
                        // NotificationManager.error(error, "Connecting to Ledger Failed")
                        NotificationManager.error("Connecting to Ledger Failed")
                        console.error(error);
                    }
                    setIsConnected(false);
                    setIsConnecting(false);
                }
            })
            .catch((error) => {
                NotificationManager.error(error?.message, "Transport channel could not be established")
                setIsConnecting(false);
                setIsConnected(false);
                props.onHide();
            });
    };

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
                        <Col>
                            <LedgerTab
                                onClose={() => props.onHide()}
                                walletAddress={walletAddress}
                                setWalletAddress={setWalletAddress}
                                walletAddresses={walletAddresses}
                                walletPaths={walletPaths}
                                currPage={currPage}
                                setCurrPage={setCurrPage}
                                isConnecting={isConnecting}
                                callBackAfterSelectingWalletAddress={() => {
                                    if (callBackAfterSelectingWalletAddress && callBackAfterSelectingWalletAddress instanceof Function) {
                                        callBackAfterSelectingWalletAddress();
                                    }
                                }} />
                        </Col>

                    </Row>
                }
            </Modal.Body>
        </Modal>
    );
}

export default SelectWalletModal;