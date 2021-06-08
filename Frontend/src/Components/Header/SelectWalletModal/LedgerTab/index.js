import React from 'react';
import LedgerWalletTable from './LedgerWalletTable';
import { Spinner } from 'react-bootstrap';


//------------------------------------------------------------------
const LedgerTab = ({
    walletAddress,
    setWalletAddress,
    onClose,
    callBackAfterSelectingWalletAddress,
    walletAddresses,
    walletPaths,
    currPage,
    setCurrPage,
    isConnecting,
}) => {






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
