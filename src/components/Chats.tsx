import "../styles/components/chat.scss";
import { BiDotsVertical } from "react-icons/bi";
import { LuMessageSquarePlus } from "react-icons/lu";
import ChatListItem from "./chatListItem";
import { Input } from "../utils/Utill";
import { Dispatch, SetStateAction } from "react";
import { PRIMARY_LIGHT } from "../constants/constants";

const chatListData:{chatName:string; lastMessage:string; date:string;}[] = [
    {
        chatName:"GMSSS 2020 Reunion Group",
        lastMessage:"Only admin can message in this group.",
        date:"Yesterday"
    },
    {
        chatName:"Didi",
        lastMessage:"Jj",
        date:"Yesterday"
    },
    {
        chatName:"Gourav group",
        lastMessage:"Mammi left",
        date:"Yesterday"
    },
    {
        chatName:"WhatsApp",
        lastMessage:"Share updates in real-time with video notes just press and h...",
        date:"Yesterday"
    },
    {
        chatName:"Coca-Cola",
        lastMessage:"This bussiness is now using a secure service from Meta to mana...",
        date:"Yesterday"
    },
    {
        chatName:"+91-7830780809",
        lastMessage:"Photo",
        date:"Yesterday"
    },
    {
        chatName:"Airtel",
        lastMessage:"Photo",
        date:"2 days ago"
    },
    {
        chatName:"ACTC",
        lastMessage:"Photo",
        date:"3 days ago"
    },
    {
        chatName:"+91-8882732859",
        lastMessage:"Photo",
        date:"3 days ago"
    },
    {
        chatName:"Mammi",
        lastMessage:"Photo",
        date:"5 days ago"
    },
];

const Chats = ({isMessangerActive, setIsMessangerActive}:{isMessangerActive:{chatName:string; lastMessage:string; date:string;}|undefined; setIsMessangerActive:Dispatch<SetStateAction<{chatName:string; lastMessage:string; date:string;}|undefined>>;}) => {

    const onSelectChatHandler = (data:{chatName:string; lastMessage:string; date:string;}) => {
        setIsMessangerActive(data);
    };

    return(
        <div className="chat_cont">
            <div className="chat_section_header">
                <div className="heading">Chats</div>
                <div className="icons">
                    <button className="icon"><LuMessageSquarePlus /></button>
                    <button className="icon"><BiDotsVertical /></button>
                </div>
            </div>
            <div className="search_section">
                <div className="search_cont_outer">
                    <Input biSearchID="seachIconForChat" faArrowLeftLongID="leftArrowIconForChat" inputID="inputForChat" ioMdCloseID="closeIconForChat" />
                </div>
                <div className="search_tags_cont">
                    {
                        ["All", "Unread", "Favorites", "Groups"].map((tag) => (
                            <button className="tag">
                                {tag}
                            </button>
                        ))
                    }
                </div>
            </div>
            <div className="chat_section">
                <div className="chat_section_scrollable">

                    {
                        chatListData.map((chat) => (
                            <div className="single_chat_outer" onClick={() => onSelectChatHandler(chat)} style={{
                                background:isMessangerActive?.chatName === chat.chatName ?
                                    PRIMARY_LIGHT
                                    :
                                    "unset"
                            }}>
                                <ChatListItem isSelected={isMessangerActive?.chatName === chat.chatName} chatName={chat.chatName} lastMessage={chat.lastMessage} date={chat.date} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Chats;