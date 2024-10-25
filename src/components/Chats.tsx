import "../styles/components/chat.scss";
import { BiDotsVertical, BiLogIn } from "react-icons/bi";
import { LuMessageSquarePlus } from "react-icons/lu";
import ChatListItem from "./chatListItem";
import { Input, SpreadOptions } from "../utils/Utill";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PRIMARY_LIGHT } from "../constants/constants";
import { ChatTypes, NaviagationTypes } from "../types/types";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { getMyChats } from "../redux/api/api";
import { MiscReducerTypes, setSelectedChat } from "../redux/reducers/navigationReducer";
import { useDispatch, useSelector } from "react-redux";
//import { MiscReducerTypes } from "../redux/reducers/navigationReducer";

//const chatListData:{_id:string; chatName:string; lastMessage:string; date:string;}[] = [
//    {
//        _id:"1",
//        chatName:"GMSSS 2020 Reunion Group",
//        lastMessage:"Only admin can message in this group.",
//        date:"Yesterday"
//    },
//    {
//        _id:"2",
//        chatName:"Didi",
//        lastMessage:"Jj",
//        date:"Yesterday"
//    },
//    {
//        _id:"3",
//        chatName:"Gourav group",
//        lastMessage:"Mammi left",
//        date:"Yesterday"
//    },
//    {
//        _id:"4",
//        chatName:"WhatsApp",
//        lastMessage:"Share updates in real-time with video notes just press and h...",
//        date:"Yesterday"
//    },
//    {
//        _id:"5",
//        chatName:"Coca-Cola",
//        lastMessage:"This bussiness is now using a secure service from Meta to mana...",
//        date:"Yesterday"
//    },
//    {
//        _id:"6",
//        chatName:"+91-7830780809",
//        lastMessage:"Photo",
//        date:"Yesterday"
//    },
//    {
//        _id:"7",
//        chatName:"Airtel",
//        lastMessage:"Photo",
//        date:"2 days ago"
//    },
//    {
//        _id:"8",
//        chatName:"ACTC",
//        lastMessage:"Photo",
//        date:"3 days ago"
//    },
//    {
//        _id:"9",
//        chatName:"+91-8882732859",
//        lastMessage:"Photo",
//        date:"3 days ago"
//    },
//    {
//        _id:"10",
//        chatName:"Mammi",
//        lastMessage:"Photo",
//        date:"5 days ago"
//    },
//];
const contentArray:NaviagationTypes[] = ["New group", "New broadcast", "Linked devices", "Starred messages", "Payments", "Settings"];

const Chats = ({setIsMessangerForMobileActive}:{setIsMessangerForMobileActive:Dispatch<SetStateAction<boolean>>; setSelectedNavigation:ActionCreatorWithPayload<NaviagationTypes>;}) => {
    const [isOptionsDialogActive, setIsOptionsDialogActive] = useState<boolean>(false);
    const {selectedChat} = useSelector((state:{miscReducer:MiscReducerTypes}) => state.miscReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [myChats, setMyChats] = useState<ChatTypes[]>([]);


    const onSelectChatHandler = (data:ChatTypes) => {
        dispatch(setSelectedChat(data));
        console.log(data._id);
        console.log(selectedChat);
        
    };
    const onClickThreeDotsHandler = () => {
        setIsOptionsDialogActive(!isOptionsDialogActive);
    };


    useEffect(() => {
        const fetchMyAllChats = getMyChats();

        fetchMyAllChats.then((data) => {
            console.log("from Chat.tsx ))))))))))");
            setMyChats(data.message as ChatTypes[]);
            console.log("from Chat.tsx ))))))))))");
            
        })
        .catch((err) => {
            console.log("from Chat.tsx--------------");
            console.log(err);
            console.log("from Chat.tsx--------------");
        })
    }, []);

    return(
        <>
        {/*<pre style={{color:"white"}}>{JSON.stringify(selectedChat, null, `\t`)}</pre>*/}
            <div className="chat_cont">
                <div className="chat_section_header">
                    <div className="heading">Chats</div>
                    <div className="icons">
                        <button className="icon" onClick={() => navigate("/login")} ><BiLogIn /></button>
                        <button className="icon"><LuMessageSquarePlus /></button>
                        <button className="icon" onClick={onClickThreeDotsHandler}>
                            <BiDotsVertical />
                            <SpreadOptions contentArray={contentArray} isOpen={isOptionsDialogActive} setIsOpen={setIsOptionsDialogActive} />
                        </button>
                    </div>
                </div>
                <div className="search_section">
                    <div className="search_cont_outer">
                        <Input biSearchID="seachIconForChat" faArrowLeftLongID="leftArrowIconForChat" inputID="inputForChat" ioMdCloseID="closeIconForChat" />
                    </div>
                    <div className="search_tags_cont">
                        {
                            ["All", "Unread", "Favorites", "Groups"].map((tag) => (
                                <button key={tag} className="tag">
                                    {tag}
                                </button>
                            ))
                        }
                    </div>
                </div>
                <div className="chat_section">
                    <div className="chat_section_scrollable">
                        {
                            myChats?.map((chat) => (
                                <div key={chat._id} className="single_chat_outer" onClick={() => onSelectChatHandler(chat)} style={{
                                    background:selectedChat?._id === chat._id ?
                                        PRIMARY_LIGHT
                                        :
                                        "unset"
                                }}>
                                    <ChatListItem isSelected={selectedChat?._id === chat._id} chatName={chat.chatName} lastMessage={"------chat?.lastMessage------"} date={chat.createdAt.toString().split("T")[0]} />
                                </div>
                                //<pre>{JSON.stringify(, null, `\t`)}</pre>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="chat_cont_mobile">
                <div className="chat_section_header">
                    <div className="heading">Chats</div>
                    <div className="icons">                        
                        <button className="icon"><LuMessageSquarePlus /></button>
                        <button className="icon" onClick={onClickThreeDotsHandler}>
                            <BiDotsVertical />
                            <SpreadOptions contentArray={contentArray} isOpen={isOptionsDialogActive} setIsOpen={setIsOptionsDialogActive} />
                        </button>
                    </div>
                </div>
                <div className="search_section">
                    <div className="search_cont_outer">
                        <Input biSearchID="seachIconForChat" faArrowLeftLongID="leftArrowIconForChat" inputID="inputForChat" ioMdCloseID="closeIconForChat" />
                    </div>
                    <div className="search_tags_cont">
                        {
                            ["All", "Unread", "Favorites", "Groups"].map((tag) => (
                                <button key={tag} className="tag">
                                    {tag}
                                </button>
                            ))
                        }
                    </div>
                </div>
                <div className="chat_section">
                    <div className="chat_section_scrollable">
                        {
                            myChats.map((chat) => (
                                <div key={chat._id} className="single_chat_outer" onClick={() => {onSelectChatHandler(chat); setIsMessangerForMobileActive(true);}} style={{
                                    background:selectedChat?._id === chat._id ?
                                        PRIMARY_LIGHT
                                        :
                                        "unset"
                                }}>
                                    <ChatListItem isSelected={selectedChat?._id === chat._id} chatName={chat.chatName} lastMessage={"----chat.lastMessage----"} date={chat.createdAt.toString().split("T")[0]} />
                                </div>
                                //<Link to="/chat/single" className="single_chat_outer" onClick={() => onSelectChatHandler(chat)} style={{
                                //    background:selectedChat?._id === chat._id ?
                                //        PRIMARY_LIGHT
                                //        :
                                //        "unset"
                                //}}>
                                //    <ChatListItem isSelected={selectedChat?._id === chat._id} chatName={chat.chatName} lastMessage={chat.lastMessage} date={chat.date} />
                                //</Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chats;