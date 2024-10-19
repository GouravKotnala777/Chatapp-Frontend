import "../styles/components/chat.scss";
import { BiDotsVertical, BiSearch } from "react-icons/bi";
import { LuMessageSquarePlus } from "react-icons/lu";
import ChatListItem from "./chatListItem";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

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

const Chats = () => {

    const onFocusHandler = () => {
        const BiSearch = document.getElementById("BiSearch");
        const FaArrowLeftLong = document.getElementById("FaArrowLeftLong");
        const IoMdClose = document.getElementById("IoMdClose");

        if (BiSearch && FaArrowLeftLong && IoMdClose) {
            BiSearch.style.rotate = "-180deg";
            BiSearch.style.opacity = "0";
            FaArrowLeftLong.style.rotate = "0deg";
            FaArrowLeftLong.style.opacity = "1";
            IoMdClose.style.rotate = "0deg";
            IoMdClose.style.opacity = "1";
        }
    };
    const onBlurHandler = () => {
        const BiSearch = document.getElementById("BiSearch");
        const FaArrowLeftLong = document.getElementById("FaArrowLeftLong");
        const IoMdClose = document.getElementById("IoMdClose");

        if (BiSearch && FaArrowLeftLong && IoMdClose) {
            BiSearch.style.rotate = "0deg";
            BiSearch.style.opacity = "1";
            FaArrowLeftLong.style.rotate = "180deg";
            FaArrowLeftLong.style.opacity = "0";
            IoMdClose.style.rotate = "180deg";
            IoMdClose.style.opacity = "0";
            
        }
    };

    const searchInputClearHandler = () => {
        const searchChatInp = document.getElementById("search_chat_inp") as HTMLInputElement;

        if (searchChatInp) {
            searchChatInp.value = "";
        }
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
                <div className="search_cont">
                    <div className="search_icon" onClick={searchInputClearHandler}>
                        <BiSearch id="BiSearch" className="BiSearch" />
                        <FaArrowLeftLong id="FaArrowLeftLong" className="FaArrowLeftLong" />
                    </div>
                    <input type="text" name="search" placeholder="Search" id="search_chat_inp" onFocus={onFocusHandler} onBlur={onBlurHandler} />
                    <div className="search_icon" onClick={searchInputClearHandler}>
                        <IoMdClose id="IoMdClose" className="IoMdClose" />
                    </div>
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
                            <ChatListItem chatName={chat.chatName} lastMessage={chat.lastMessage} date={chat.date} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Chats;