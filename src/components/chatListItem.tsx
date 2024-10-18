import "../styles/components/chat_list_cont.scss";
import photo from "../../public/user_placeholder.png";

const ChatListItem = ({chatName, lastMessage, date}:{chatName:string; lastMessage:string; date:string;}) => {

    return(
        <div className="chat_list_item_cont" key={chatName}>
            <div className="image_cont">
                <img src={photo} alt={photo} />
            </div>
            <div className="chat_info_cont">
                <div className="chat_name_cont">
                    <div className="chat_name">{chatName}</div>
                    <div className="last_message">{lastMessage}</div>
                </div>
                <div className="date_cont">
                    {date}
                </div>
            </div>
        </div>
    )
};

export default ChatListItem;