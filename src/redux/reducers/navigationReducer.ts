import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatTypes, ChatTypesPopulated, MessageTypesPopulated, NaviagationTypes } from "../../types/types";

export interface MiscReducerTypes {
    selectedNavigation:NaviagationTypes;
    selectedChat:ChatTypes|ChatTypesPopulated|null;
    isMessageSelectionActive:boolean;
    selectedMessages:MessageTypesPopulated[];
}

const initialState:MiscReducerTypes = {
    selectedNavigation:"Chats",
    selectedChat:null,
    isMessageSelectionActive:false,
    selectedMessages:[]
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
        },
        setIsMessageSelectionActive:(state, action:PayloadAction<boolean>) => {
            state.isMessageSelectionActive = action.payload;
        },
        setSelectedMessages:(state, action:PayloadAction<MessageTypesPopulated|null>) => {
            console.log("----------- (0)");
            if (action.payload === null) {
                console.log("----------- (1)");
                state.selectedMessages = [];
                console.log("----------- (2)");
            }
            else{
                console.log("----------- (3)");
                
                if (state.selectedMessages.find((msg) => msg._id === action.payload?._id)) {
                    console.log("----------- (4)");
                    state.selectedMessages = state.selectedMessages.filter((msg) => msg._id !== action.payload?._id)
                    console.log("----------- (5)");
                }
                else{
                    console.log("----------- (6)");
                    state.selectedMessages.push(action.payload);
                    console.log("----------- (7)");
                }
            }
            //state.selectedMessages = action.payload
        }
    }
});

export const {setSelectedNavigation, setSelectedChat, setIsMessageSelectionActive, setSelectedMessages} = miscReducer.actions;
export default miscReducer;