import React from 'react';

const initialState={
    citizenship : {
        "Full Name" : "",
        "Address" : "",
        "DOB" : "",
        "Father's Name":"",
        "Mother's Name" : "",
        "Citizenship Number" : "",
        "Date Of Registration" : "",
    },
    license : {
        "Full Name" : "",
        "Address" : "",
        "DOB" : "",
        "Father's Name":"",
        "Mother's Name" : "",
        "License Number" : "",
        "Date Of Registration" : "",
    }
    
}

export const ipfsDataReducer = (state=initialState, action) => {
    const {type, payload} = action;
    // console.log(action.payload);
    switch(type){
        case "GET_DATA":
            return {
                ...state
            };
        case "SET_CITIZENSHIP":
            return{
                ...state,
                citizenship:{
                    ...payload
                }
                
            }
        case "SET_LICENSE":
            return{
                ...state,
                license: {
                    ...payload
                }
                
            }
            
        default:
            return state;
    }
}