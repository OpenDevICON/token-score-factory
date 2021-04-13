import { WALLET_TYPE } from 'Constant';
import React from 'react';

const LedgerWalletTable = ({ walletAddress, setWalletAddress, walletPaths, walletAddresses, currPage, setCurrPage, closeModal, callBackAfterSelectingWalletAddress }) => {
    console.log(currPage);

    const handleAddressChange = (walletAddress, ledgerPath) => {

        setWalletAddress(walletAddress);

        localStorage.setItem('wallet_address', walletAddress, 12 * 2 * 100);
        localStorage.setItem('wallet_type', WALLET_TYPE.LEDGER);
        localStorage.setItem('ledger_path', ledgerPath);
        if (callBackAfterSelectingWalletAddress && callBackAfterSelectingWalletAddress instanceof Function){
            callBackAfterSelectingWalletAddress();
        }
        closeModal();

    };

    return (
        <>
            <div
                className="table-row table-header"
            >
                Select a wallet address
            </div>
            {walletAddresses.map((addr, id) => {
                return (
                    <div key={id} onClick={() => handleAddressChange(addr, walletPaths[id])}
                        className="table-row"
                    // checked={addr === walletAddress}
                    >
                        {addr}
                    </div>
                );
            })}
            <span className="table-page">
                <button
                    className="table-page-btn"
                    onClick={() => setCurrPage((cPage) => cPage - 1)}
                    disabled={currPage > 1 ? false : true}
                >
                    Prev
      </button>{' '}
      ||{' '}
                <button
                    className="table-page-btn"
                    onClick={() => setCurrPage((cPage) => cPage + 1)}
                >
                    Next
      </button>
            </span>
        </>
    );
};

export default LedgerWalletTable;