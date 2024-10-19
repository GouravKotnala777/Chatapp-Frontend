import "../styles/components/status.scss";
import { BiDotsVertical } from "react-icons/bi";
import ChatListItem from "./chatListItem";
import { CgAddR } from "react-icons/cg";
import { IoAddCircleSharp } from "react-icons/io5";

const statusListData:{chatName:string; lastMessage:string; date:string;}[] = [
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

const Status = () => {

    return(
        <div className="status_cont">
            <div className="status_section_header">
                <div className="heading">Status</div>
                <div className="icons">
                    <button className="icon"><CgAddR /></button>
                    <button className="icon"><BiDotsVertical /></button>
                </div>
            </div>
            <div className="my_status_section">
                <div className="my_status">
                    <ChatListItem chatName="My Status" date="6 hr ago" lastMessage="Click to add status update" />
                    <div className="add_status_icon">
                        <IoAddCircleSharp className="IoAddCircleSharp" />
                    </div>
                </div>
            </div>
            <div className="status_section">
                <div className="viewed_heading">VIEWED</div>
                <div className="status_section_scrollable">
                    {
                        statusListData.map((status) => (
                            <ChatListItem chatName={status.chatName} date={status.date} lastMessage={status.lastMessage} />
                        ))
                    }
                </div>
                <div className="viewed_heading">RECENT UPDATES</div>
                <div className="status_section_scrollable">
                    {
                        statusListData.map((status) => (
                            <ChatListItem chatName={status.chatName} date={status.date} lastMessage={status.lastMessage} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Status;