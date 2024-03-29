import React from 'react';

const initialState={
    username : "",
    address : "",
    image : "",
    contractAddr:"",
    ipfsHash:"",
}

export const userReducer = (state=initialState, action) => {
    const {type, payload} = action;
    // console.log(action.payload);
    switch(type){
        case "GET_USER":
            return {
                ...state
            };
        case "SET_USERNAME":
            return{
                ...state,
                username:payload.username
                
            }
        case "SET_PHOTO":
            return{
                ...state,
                photo:payload.photo
                
            }
        case "SET_ADDRESS":
            return {
                ...state,
                address:payload.address
                
            }
        
        case "SET_CONTRACT":
            return{
                ...state,
                contractAddr:payload.address
            }

        case "SET_IPFS":
            return{
                ...state,
                ipfsHash:payload.ipfsHash
            }

        case "REMOVE_USER":
            return initialState;
            
        default:
            return state;
    }
}