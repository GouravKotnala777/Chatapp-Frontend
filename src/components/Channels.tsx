import { BiDotsVertical } from "react-icons/bi";
import { CgAddR } from "react-icons/cg";
import ChatListItem from "./chatListItem";
import "../styles/components/channels.scss";


const channelListData:{chatName:string; followers:string; follow:string;}[] = [
    {
        chatName:"GMSSS 2020 Reunion Group",
        followers:"7.7M followers",
        follow:"follow"
    },
    {
        chatName:"Didi",
        followers:"15.4M followers",
        follow:"follow"
    },
    {
        chatName:"Gourav group",
        followers:"189.8M followers",
        follow:"follow"
    },
    {
        chatName:"WhatsApp",
        followers:"1.4M followers",
        follow:"follow"
    },
    {
        chatName:"Coca-Cola",
        followers:"14M followers",
        follow:"follow"
    },
    {
        chatName:"+91-7830780809",
        followers:"4.2K followers",
        follow:"follow"
    },
    {
        chatName:"Airtel",
        followers:"300K followers",
        follow:"follow"
    },
    {
        chatName:"ACTC",
        followers:"70M followers",
        follow:"follow"
    },
    {
        chatName:"+91-8882732859",
        followers:"13.7M followers",
        follow:"follow"
    },
    {
        chatName:"Mammi",
        followers:"187K followers",
        follow:"follow"
    },
];

const Channels = () => {

    return(
        <div className="channels_cont">
            <div className="channel_section_header">
                <div className="heading">Channels</div>
                <div className="icons">
                    <button className="icon"><CgAddR /></button>
                    <button className="icon"><BiDotsVertical /></button>
                </div>
            </div>
            <div className="my_channel_section">
                <div className="my_channel">
                    {/*<Heading value="Stay updated on your favorite topics" padding="0" />
                    <Para value="Find channels to follow below" margin="0 auto" padding="0" />*/}
                </div>
            </div>
            <div className="channel_section">
                <div className="viewed_heading">SUBSCRIBED CHANNELS</div>
                <div className="channel_section_scrollable">
                    {
                        channelListData.map((status) => (
                            <ChatListItem chatName={status.chatName} date={status.follow} lastMessage={status.followers} />
                        ))
                    }
                </div>
                <div className="viewed_heading">POPULAR CHANNELS</div>
                <div className="channel_section_scrollable">
                    {
                        channelListData.map((status) => (
                            <ChatListItem chatName={status.chatName} date={status.follow} lastMessage={status.followers} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Channels;