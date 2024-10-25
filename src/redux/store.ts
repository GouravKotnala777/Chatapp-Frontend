import { configureStore } from "@reduxjs/toolkit";
import miscReducer from "./reducers/navigationReducer";
import loginUserReducer from "./reducers/loginUserReducer";


const store = configureStore({
    reducer:{
        [miscReducer.name]:miscReducer.reducer,
        [loginUserReducer.name]:loginUserReducer.reducer
    }
});

export default store;