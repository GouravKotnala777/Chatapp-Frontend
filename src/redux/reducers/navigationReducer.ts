import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatTypes, ChatTypesPopulated, NaviagationTypes } from "../../types/types";

export interface MiscReducerTypes {
    selectedNavigation:NaviagationTypes;
    selectedChat:ChatTypes|ChatTypesPopulated|null;
}

const initialState:MiscReducerTypes = {
    selectedNavigation:"Chats",
    selectedChat:null
}

const miscReducer = createSlice({
    name:"miscReducer",
    initialState:initialState,
    reducers:{
        setSelectedNavigation:(state, action:PayloadAction<NaviagationTypes>) => {
            state.selectedNavigation = action.payload;
        },
        setSelectedChat:(state, action:PayloadAction<ChatTypes|ChatTypesPopulated|null>) => {
            state.selectedChat = action.payload;
        }
    }
});

export const {setSelectedNavigation, setSelectedChat} = miscReducer.actions;
export default miscReducer;