import { configureStore } from "@reduxjs/toolkit";

import {userReducer} from "../reducers/userReducer";
import { ipfsDataReducer } from "../reducers/ipfsDataReducer";

const store = configureStore({
    reducer: {
        
        userReducer:userReducer,
        ipfsDataReducer:ipfsDataReducer,
    },
});
export default store;
