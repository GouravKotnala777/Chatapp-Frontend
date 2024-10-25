import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserTypes } from "../../types/types";

export interface LoginUserReducerTypes {
    isLoading:boolean;
    user:UserTypes|null;
    isError:boolean;
};

const loginUserReducerInitialState:LoginUserReducerTypes = {
    isLoading:true,
    user:null,
    isError:false
};

const loginUserReducer = createSlice({
    initialState:loginUserReducerInitialState,
    name:"loginUserReducer",
    reducers:({
        setLoginUser:(state, action:PayloadAction<LoginUserReducerTypes>) => {
            state.isLoading = action.payload.isLoading;
            state.user = action.payload.user;
            state.isError = action.payload.isError;
        }
    })
});

export const {setLoginUser} = loginUserReducer.actions;
export default loginUserReducer;