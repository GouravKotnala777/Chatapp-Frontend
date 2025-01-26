import "../styles/components/chat.scss";
import { BiDotsVertical, BiLogIn, BiNews, BiRegistered } from "react-icons/bi";
import { LuMessageSquarePlus } from "react-icons/lu";
import ChatListItem from "./chatListItem";
import { Input, SpreadOptions } from "../utils/Utill";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PRIMARY_LIGHT } from "../constants/constants";
import { ChatTypes, ChatTypesPopulated, MessageTypesPopulated, NaviagationTypes, UserTypes } from "../types/types";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { getMyChats } from "../redux/api/api";
import { MiscReducerTypes, setSelectedChat, setSelectedNavigation } from "../redux/reducers/navigationReducer";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";



const contentArray:NaviagationTypes[] = ["Search user", "Contacts", "New group", "Friend requests", "New broadcast", "Linked devices", "Starred messages", "Payments", "Settings"];

const Chats = ({setIsMessangerForMobileActive, messagesArray, socket, myUserID,
    setIsSelectedUserOnline, totalReceivedFriendRequests

}:{setIsMessangerForMobileActive:Dispatch<SetStateAction<boolean>>; setSelectedNavigation:ActionCreatorWithPayload<NaviagationTypes>;
    messagesArray:MessageTypesPopulated[];
    socket:Socket<DefaultEventsMap, DefaultEventsMap>;
    myUserID:string;
    setIsSelectedUserOnline:Dispatch<SetStateAction<{success:boolean; socketID?:string; message?:string;}>>;
    totalReceivedFriendRequests?:number;
}) => {
    const [isOptionsDialogActive, setIsOptionsDialogActive] = useState<boolean>(false);
    const {selectedChat} = useSelector((state:{miscReducer:MiscReducerTypes}) => state.miscReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [myChats, setMyChats] = useState<ChatTypes[]>([]);


    const onSelectChatHandler = (data:ChatTypes|ChatTypesPopulated) => {
        dispatch(setSelectedChat(data));
        //console.log(data._id);
        //console.log(selectedChat);   
        //socket.on("isOnline", ({userID, userName, isOnline}:{userID:string; userName:string; isOnline:boolean;}) => {

        //});
    };
    const onClickThreeDotsHandler = () => {
        setIsOptionsDialogActive(!isOptionsDialogActive);
    };
    const navigateHandler = () => {
        dispatch(setSelectedNavigation("Friend requests"));
    }


    useEffect(() => {
        const fetchMyAllChats = getMyChats();

        fetchMyAllChats.then((data) => {
            console.log("from Chat.tsx ))))))))))");
            setMyChats(data.jsonData as ChatTypes[]);
            console.log("from Chat.tsx ))))))))))");
            
        })
        .catch((err) => {
            console.log("from Chat.tsx--------------");
            console.log(err);
            console.log("from Chat.tsx--------------");
        })
    }, []);
    useEffect(() => {
        if (selectedChat) {
            const mmbrID = (selectedChat?.members as UserTypes[]).map((item) => item._id ).find((item) => item !== myUserID);
            console.log("@@@@@@@@@@@@@@@@@@@@@ 1");
            socket.emit("isOnline", mmbrID, (response:{success:boolean; socketID?:string; message?:string;}) => {
                if (response.success) {
                    console.log(`Socket ID of user ${mmbrID}: ${response?.socketID}`);
                    setIsSelectedUserOnline({success:true, socketID:response?.socketID, message:""});
                } else {
                    console.log(`Error: ${response.message}`);
                    setIsSelectedUserOnline({success:false, socketID:"", message:response.message});
                }
            });
            console.log("@@@@@@@@@@@@@@@@@@@@@ 2");
        }
    }, [selectedChat]);

    return(
        <>
        {/*<pre style={{color:"white"}}>{JSON.stringify(messagesArray, null, `\t`)}</pre>*/}
            <div className="chat_cont">
                <div className="chat_section_header">
                    <div className="heading">Chats</div>
                    <div className="icons">
                        <button className="icon" onClick={() => navigate("/login")} ><BiLogIn /></button>
                        <button className="icon" onClick={() => navigate("/register")} ><BiRegistered /></button>
                        <button className="icon" onClick={navigateHandler} ><BiNews /></button>
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
                        {
                            (["Notifications"] as NaviagationTypes[]).map((tag) => (
                                <button key={tag} className="tag" onClick={() => dispatch(setSelectedNavigation(tag))}>
                                    {tag} {!!totalReceivedFriendRequests&&<span style={{border:"1px solid red", color:"white", fontWeight:"600", backgroundColor:"#aa0000", display:"inline-block", textAlign:"center", alignContent:"center", width:"18px", height:"18px", borderRadius:"10px"}}>{totalReceivedFriendRequests}</span>}
                                </button>
                            ))
                        }
                    </div>
                </div>
                <div className="chat_section">
                    <div className="chat_section_scrollable">
                        {/*<pre style={{color:"white"}}>{JSON.stringify(messagesArray, null, `\t`)}</pre>*/}
                        {
                            myChats?.map((chat) => (
                                <div key={chat._id} className="single_chat_outer" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onSelectChatHandler(chat)} onClick={() => onSelectChatHandler(chat)} style={{
                                    background:selectedChat?._id === chat._id ?
                                        PRIMARY_LIGHT
                                        :
                                        "unset"
                                }}>
                                    <ChatListItem isSelected={selectedChat?._id === chat._id} chatName={chat.chatName} lastMessage={messagesArray?.[messagesArray?.length-1]?.content?.contentMessage} date={chat.createdAt.toString().split("T")[0]} />
                                </div>
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
                        {
                            (["Notifications"] as NaviagationTypes[]).map((tag) => (
                                <button key={tag} className="tag" onClick={() => dispatch(setSelectedNavigation(tag))}>
                                    {tag} {!!totalReceivedFriendRequests&&<span style={{border:"1px solid red", color:"white", fontWeight:"600", backgroundColor:"#aa0000", display:"inline-block", textAlign:"center", alignContent:"center", width:"18px", height:"18px", borderRadius:"10px"}}>{totalReceivedFriendRequests}</span>}
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
                                    <ChatListItem isSelected={selectedChat?._id === chat._id} chatName={chat.chatName} lastMessage={messagesArray?.[messagesArray?.length-1]?.content?.contentMessage} date={chat.createdAt.toString().split("T")[0]} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chats;