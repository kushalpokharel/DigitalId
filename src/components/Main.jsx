import React, { useEffect, useState } from 'react';
import web3 from '../ethereum/web3';
import store from '../store/index';
import {useSelector, useDispatch} from 'react-redux';
import Factory from '../ethereum/factory';
import { useNavigate } from "react-router-dom";
import Identity from '../ethereum/identity';

function Main() {
    const address = useSelector(state => state.userReducer.address);
    const user  = useSelector(state => state.userReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    function handleAccountsChanged(accounts){
        console.log("account changed");
        dispatch(
            {
                type:"REMOVE_USER",
                payload:{
                    
                }
            }
        );

        initialSetup()

    }

    const initialSetup = async ()=>{
       
        if(typeof window.ethereum === 'undefined'){
            alert("Metamask is not installed");
        }
        const accounts = await web3.eth.getAccounts();
        const acc = accounts[0];
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        if(accounts.length === 0){
            console.log("metamask locked")
            return;
        }
        dispatch(
            {
                type:"SET_ADDRESS",
                payload:{
                    "address": acc
                }
            }
        );
        
        const contractAddr = await Factory.methods.getUserContractAddress().call({from:acc});
        if(contractAddr=="0x0000000000000000000000000000000000000000")
        {
            navigate('/signup');
        }
        else{
            
            navigate('/home');
        }
    }

    useEffect(
        () => initialSetup,
        []);

    // useEffect(()=>{
    //         console.log("user changed");
    //         
    //     },
    //     [address]);
    
    console.log("user is ",user );
    return (
      <div className='main'>
        
      </div>
    );
}

export default Main;