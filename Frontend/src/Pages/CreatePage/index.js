import React from 'react';
import InputForm from '../../Components/CreatePage/Form';
import CreatePageHeader from '../../Components/CreatePage/CreatePageHeader';

const CreatePage = ({walletAddress, setWalletAddress}) => {

    return( 
        <>
            <CreatePageHeader walletAddress = {walletAddress} setWalletAddress = {setWalletAddress} />
            <InputForm 
                walletAddress = {walletAddress}
                setWalletAddress = {setWalletAddress} />
        </>
    )
}

export default CreatePage;