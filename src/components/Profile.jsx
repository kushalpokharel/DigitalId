import React from 'react';
import { useSelector } from 'react-redux';

export default function Profile(){
    const ipfsHash = useSelector(state => state.userReducer.ipfsHash);
    const contractAddr = useSelector(state => state.userReducer.contractAddr);

    console.log(ipfsHash)
    console.log(contractAddr);
    return(
        <h1>Your Profile Page</h1>
    )
};