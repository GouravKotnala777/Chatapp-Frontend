import { BiDotsVertical, BiSearch } from "react-icons/bi";
import "../styles/pages/home.scss";
import { CiSettings } from "react-icons/ci";
import photo from "../../public/vite.svg";
import messangerPlaceholderImg from "../../public/hero_img.png";
import ChatListItem from "../components/chatListItem";
import { Button, Heading, Para } from "../utils/Utill";
import { MouseEvent, useState } from "react";
import Tooltip from "../components/Tooltip";
import { BsChatSquareText } from "react-icons/bs";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { IoPeopleOutline } from "react-icons/io5";
import { MdOutlineFeedback } from "react-icons/md";
import { LuMessageSquarePlus } from "react-icons/lu";

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


const Home = () => {
    const [isTooltipActive, setIsTooltipActive] = useState<boolean>(false);
    const [tooltipPosition, setTooltipPosition] = useState<{x:number; y:number;}>({x:0, y:0});
    const [tooltipContent, setTooltipContent] = useState<string>("");


    const showTooltipHandler = (e:MouseEvent<HTMLButtonElement>) => {
        //document.getElementById("aaaa")?.getBoundingClientRect
        setIsTooltipActive(true);
        const rect = e.currentTarget.getBoundingClientRect();
        console.log({x:e.currentTarget.offsetLeft, y:e.currentTarget.offsetTop, rectTop:rect.top + window.scrollY, rectLeft:rect.left + rect.width + 10});
        
        setTooltipPosition({x:e.currentTarget.offsetLeft, y:e.currentTarget.offsetTop});
        setTooltipContent(e.currentTarget.value);
    };
    const hideTooltipHandler = () => {
        setIsTooltipActive(false);
    };

    return(
        <>
        <Tooltip content={tooltipContent} position={tooltipPosition} isTooltipActive={isTooltipActive} />
        <div className="home_bg">
            <div className="navbar_cont">
                <div className="nav_cont">
                    <button className="nav_icon" value="Chats" onMouseOver={(e) => showTooltipHandler(e)}  onMouseOut={hideTooltipHandler}><BsChatSquareText /></button>
                    <button className="nav_icon" value="Status" onMouseOver={(e) => showTooltipHandler(e)}  onMouseOut={hideTooltipHandler}><HiOutlineStatusOnline /></button>
                    <button className="nav_icon" value="Community" onMouseOver={(e) => showTooltipHandler(e)}  onMouseOut={hideTooltipHandler}><IoPeopleOutline /></button>
                    <button className="nav_icon" value="Feedback" onMouseOver={(e) => showTooltipHandler(e)}  onMouseOut={hideTooltipHandler}><MdOutlineFeedback /></button>
                </div>
                <div className="setting_cont">
                    <button className="nav_icon" value="Setting" onMouseOver={(e) => showTooltipHandler(e)}  onMouseOut={hideTooltipHandler}><CiSettings /></button>
                    <button className="nav_icon" value="Profile" onMouseOver={(e) => showTooltipHandler(e)}  onMouseOut={hideTooltipHandler}><img src={photo} alt={photo} /></button>
                </div>
            </div>





            <div className="chat_cont">
                <div className="chat_section_header">
                    <div className="heading">Chats</div>
                    <div className="icons">
                        <div className="icon"><LuMessageSquarePlus /></div>
                        <div className="icon"><BiDotsVertical /></div>
                    </div>
                </div>
                <div className="search_section">
                    <div className="search_cont">
                        <div className="search_icon"><BiSearch className="BiSearch" /></div><input type="text" name="search" placeholder="Search" />
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




            
            <div className="message_cont">
                <div className="messagenger_placeholder">
                    <img className="placeholder_img" src={messangerPlaceholderImg} alt={messangerPlaceholderImg} />
                    <Heading value="Download WhatsApp for Windows" color="#e1e1e1" />
                    <Para value="make calls, share your screen and get a faster experience when you download the Windows app." />
                    <Button value="Get from Microsoft Store" color="white" />
                </div>
            </div>
        </div>
        </>
    )

};

export default Home;