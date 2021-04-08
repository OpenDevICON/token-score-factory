import React, { useEffect } from 'react';
import InputForm from '../../Components/CreatePage/Form';
import Header from '../../Components/CreatePage/Header';
import { getCookie } from 'Helpers';

const CreatePage = () => {

    let [walletAddress, setWalletAddress] = React.useState(null);

    useEffect(() => {
        console.log("Cookie wallet", getCookie('wallet_address'))
        if(getCookie('wallet_address')) {
            setWalletAddress(getCookie('wallet_address'))
        }
    }, [])

    return( 
        <>
            <Header walletAddress = {walletAddress} setWalletAddress = {setWalletAddress} />
            <InputForm setWalletAddress = {walletAddress} />
        </>
    )
}

export default CreatePage;