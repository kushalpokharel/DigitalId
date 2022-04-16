import React from 'react';

const initialState={
    citizenship : {
        "status":"NOT_REQUESTED"
    },
    license : {
        "status":"NOT_REQUESTED"
    }
    
}

export const statusReducer = (state=initialState, action) => {
    const {type, payload} = action;
    // console.log(action.payload);
    switch(type){
        case "SET_CITIZENSHIP_STATUS":
            return{
                ...state,
                citizenship:{
                    ...payload
                }
                
            }
        case "SET_LICENSE_STATUS":
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