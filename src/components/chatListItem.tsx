import "../styles/components/chat_list_cont.scss";
import photo from "../../public/user_placeholder.png";
import { IconType } from "react-icons";
import { GRAY_LIGHT, GRAY_LIGHTER } from "../constants/constants";
import { BiSolidDownArrow } from "react-icons/bi";
import { useState } from "react";
import { SpreadOptions } from "../utils/Utill";

const ChatListItem = ({isSelected, chatName, lastMessage, date, imgHeight, imgWidth}:{isSelected?:boolean; chatName:string; lastMessage:string; date:string|IconType[]; imgHeight?:string; imgWidth?:string;}) => {
    const [isSelectedChatOptionActive, setIsSelectedChatOptionActive] = useState<boolean>(false);

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
                            {date} {isSelected && <BiSolidDownArrow className="BiSolidDownArrow" onClick={(e) => {e.stopPropagation(); setIsSelectedChatOptionActive(!isSelectedChatOptionActive);}} />}
                            <SpreadOptions contentArray={["Add members", "Remove members", "Archive chat", "Mute notifications", "Delete chat", "Pin chat", "Mark as unread", "Block"]} isOpen={isSelectedChatOptionActive} setIsOpen={setIsSelectedChatOptionActive} />
                        </div>
                        :
                        <div className="icons_cont">
                            {(date as IconType[])?.map((Icon, index) => (
                                <Icon className="icon" key={index} />
                            ))}
                        </div>

                }
            </div>
        </div>
    )
};

export default ChatListItem;