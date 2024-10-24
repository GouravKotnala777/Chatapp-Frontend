import { configureStore } from "@reduxjs/toolkit";
import miscReducer from "./reducers/navigationReducer";


const store = configureStore({
    reducer:{
        [miscReducer.name]:miscReducer.reducer
    }
});

export default store;