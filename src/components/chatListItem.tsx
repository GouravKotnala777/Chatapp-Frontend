import "../styles/components/chat_list_cont.scss";
import photo from "../../public/user_placeholder.png";
import { IconType } from "react-icons";
import { GRAY_LIGHT, GRAY_LIGHTER } from "../constants/constants";

const ChatListItem = ({isSelected, chatName, lastMessage, date, imgHeight, imgWidth}:{isSelected?:boolean; chatName:string; lastMessage:string; date:string|IconType[]; imgHeight?:string; imgWidth?:string;}) => {

    return(
        <div className="chat_list_item_cont" key={chatName}>
            <div className="image_cont" style={{height:imgHeight?imgHeight:"50px", width:imgWidth?imgWidth:"50px"}}>
                <img src={photo} alt={photo} />
            </div>
            <div className="chat_info_cont">
                <div className="chat_name_cont">
                    <div className="chat_name" style={{
                        color:isSelected ? "black" : GRAY_LIGHTER
                    }}>{chatName}</div>
                    <div className="last_message" style={{
                        color:isSelected ? "black" : GRAY_LIGHT
                    }}>{lastMessage}</div>
                </div>
                {
                    date && typeof date === "string" ?
                        <div className="date_cont" style={{
                            color:isSelected ? "black" : GRAY_LIGHT
                        }}>
                            {date}
                        </div>
                        :
                        <div className="icons_cont">
                            {(date as IconType[]).map((Icon) => (
                                <Icon className="icon" />
                            ))}
                        </div>

                }
            </div>
        </div>
    )
};

export default ChatListItem;