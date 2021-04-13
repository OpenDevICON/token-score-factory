import { WALLET_TYPE } from 'Constant';
import React from 'react';
import { Table } from 'react-bootstrap';

const LedgerWalletTable = ({ walletAddress, setWalletAddress, walletPaths, walletAddresses, currPage, setCurrPage, closeModal }) => {
    console.log(currPage);

    const handleAddressChange = (walletAddress, ledgerPath) => {

        setWalletAddress(walletAddress);

        localStorage.setItem('wallet_address', walletAddress, 12 * 2 * 100);
        localStorage.setItem('wallet_type', WALLET_TYPE.LEDGER);
        localStorage.setItem('ledger_path', ledgerPath);
        closeModal();

    };

    return (
        <>
            <Table striped bordered size="sm">
                <thead className="ledger-table-header">
                    <tr>
                        <th> </th>
                        <th>Wallet Address</th>
                    </tr>
                </thead>
                <tbody>
                    {walletAddresses.map((addr, id) => {
                        return (
                            <tr key={id}>
                                <td>
                                    <input
                                        type="radio"
                                        value={addr}
                                        checked={addr === walletAddress}
                                        onChange={() =>
                                            handleAddressChange(addr, walletPaths[id])
                                        }
                                    />
                                </td>
                                <td>{addr}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
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