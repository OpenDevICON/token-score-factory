import React, { useState, useEffect } from 'react';
import Transport from '@ledgerhq/hw-transport-u2f';
import AppIcx from '@ledgerhq/hw-app-icx';
import { NotificationManager } from 'react-notifications';
import LedgerWalletTable from './LedgerWalletTable';
import { Spinner } from 'react-bootstrap';

const BASE_PATH = `44'/4801368'/0'/0'`;

//------------------------------------------------------------------
const LedgerTab = ({
    walletAddress,
    setWalletAddress,
    onClose,
    callBackAfterSelectingWalletAddress
}) => {
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [icx, setIcx] = useState(null);
    // const [walletAddresses, setWalletAddresses] = useState(['hx9038432859428523','hx9038432859428523','hx9038432859428523','hx9038432859428523', 'hx49854929ae83', 'hx328549854893594', 'hx894325982589']);
    const [walletAddresses, setWalletAddresses] = useState([]);
    const [walletPaths, setWalletPaths] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const addressPerPage = 4;

    useEffect(() => {
        connectToLedger();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (isConnected) {
            loadAddresses(false, icx);
        }
        // eslint-disable-next-line
    }, [currPage]);

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
                        NotificationManager.error(error.message, "Connecting to Ledger Failed")
                    }
                    else {
                        NotificationManager.error(error, "Connecting to Ledger Failed")
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
                onClose();
            });
    };

    return (
        <div className="ledger-tab">

            {walletAddresses.length > 0 && (
                <div className="ledger-table">
                    <LedgerWalletTable
                        walletAddress={walletAddress}
                        setWalletAddress={setWalletAddress}
                        walletPaths={walletPaths}
                        walletAddresses={walletAddresses}
                        currPage={currPage}
                        setCurrPage={setCurrPage}
                        closeModal={onClose}
                        callBackAfterSelectingWalletAddress={() => {
                            if (callBackAfterSelectingWalletAddress && callBackAfterSelectingWalletAddress instanceof Function) {
                                callBackAfterSelectingWalletAddress();
                            }
                        }}
                    />
                </div>
            )}

            {
                walletAddresses.length < 1 && isConnecting &&
                (
                    <div className="please-wait">
                        <Spinner animation="border" role="status" style={{ display: 'flex', justifyContent: 'center' }}>
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                        <div style={{ color: '#DDDDDD' }}
                        >Please wait</div>
                    </div>
                )
            }

        </div>
    );
};

export default LedgerTab;
