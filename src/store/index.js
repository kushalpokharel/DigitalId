import { configureStore } from "@reduxjs/toolkit";

import {userReducer} from "../reducers/userReducer";
import { ipfsDataReducer } from "../reducers/ipfsDataReducer";
import {statusReducer} from "../reducers/statusReducer";

const store = configureStore({
    reducer: {
        statusReducer:statusReducer,
        userReducer:userReducer,
        ipfsDataReducer:ipfsDataReducer,
    },
});
export default store;
