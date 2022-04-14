import React, { useEffect, useState } from 'react';
import web3 from '../ethereum/web3';
import store from '../store/index';
import {useSelector, useDispatch} from 'react-redux';

function Main() {
    const address = useSelector(state => state.userReducer.address);
    const user  = useSelector(state => state.userReducer);

    const dispatch = useDispatch();
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
        if(accounts.length === 0){
            console.log("metamask locked")
            return;
        }
        dispatch(
            {
                type:"SET_ADDRESS",
                payload:{
                    "address": accounts[0]
                }
            }
        );
        window.ethereum.on('accountsChanged', handleAccountsChanged);
    
    }

    useEffect(
        () => initialSetup,
        []);

    // useEffect(()=>{
    //         console.log("user address changed");
            
    //     },
    //     [address]);
    
    console.log("user is ",user );
    return (
      <div className='main'>
        
      </div>
    );
}

export default Main;