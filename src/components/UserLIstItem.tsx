import "../styles/components/chat_list_cont.scss";
import photo from "../../public/user_placeholder.png";
import { IconType } from "react-icons";
import { GRAY_DARKER, GRAY_LIGHT, GRAY_LIGHTER } from "../constants/constants";
import { useState } from "react";
import { SpreadOptions } from "../utils/Utill";
import { BiCheck } from "react-icons/bi";

const UserListItem = ({isSelected, userID, userName, lastMessage, date, imgHeight, imgWidth}:{isSelected?:boolean; userID:string; userName:string; lastMessage:string; date:string|IconType[]; imgHeight?:string; imgWidth?:string;}) => {
    const [isSelectedChatOptionActive, setIsSelectedChatOptionActive] = useState<boolean>(false);


    return(
        <div className="chat_list_item_cont" key={userID}>
            <div className="image_cont" style={{height:imgHeight?imgHeight:"50px", width:imgWidth?imgWidth:"50px"}}>
                <img src={photo} alt={photo} />
            </div>
            <div className="chat_info_cont">
                <div className="chat_name_cont">
                    <div className="chat_name" style={{
                        color:isSelected ? "black" : GRAY_LIGHTER
                    }}>{userName}</div>
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
                            {/*{isSelected && <BiSolidDownArrow className="BiSolidDownArrow" onClick={() => setIsSelectedChatOptionActive(!isSelectedChatOptionActive)} />}*/}
                            <SpreadOptions contentArray={["Add members", "Archive chat", "Mute notifications", "Delete chat", "Pin chat", "Mark as unread", "Block"]} isOpen={isSelectedChatOptionActive} setIsOpen={setIsSelectedChatOptionActive} />
                        </div>
                        :
                        <div className="icons_cont" style={{gap:"20px"}}>
                            {
                                //JSON.stringify(isSelected)
                                isSelected &&
                                    <BiCheck style={{fontSize:"1.3rem", marginRight:"10px", color:GRAY_DARKER}} />
                            }
                        </div>

                }
            </div>
        </div>
    )
};

export default UserListItem;