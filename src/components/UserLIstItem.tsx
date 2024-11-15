import "../styles/components/chat_list_cont.scss";
import photo from "../../public/user_placeholder.png";
import { IconType } from "react-icons";
import { GRAY_DARKER, GRAY_LIGHT, GRAY_LIGHTER } from "../constants/constants";
import { Dispatch, SetStateAction, useState } from "react";
import { SpreadOptions } from "../utils/Utill";
import { BiCheck, BiSolidDownArrow } from "react-icons/bi";
import { FriendRequestStatusType, NaviagationTypes } from "../types/types";

const UserListItem = ({selectedNavigation, isSelected, userID, userName, lastMessage, date, replyFriendRequestHandler, imgHeight, imgWidth, optionsArray,
    setIsStartChatClicked
}:{
    selectedNavigation?:NaviagationTypes;
    isSelected?:boolean;
    userID:string;
    userName:string;
    lastMessage:string;
    date:string|IconType[];
    replyFriendRequestHandler?:({ friendRequestID, status }: {friendRequestID: string; status: FriendRequestStatusType;}) => Promise<void>; imgHeight?:string; imgWidth?:string;
    optionsArray?:NaviagationTypes[];
    setIsStartChatClicked:Dispatch<SetStateAction<boolean>>;
}) => {
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
                            {
                                isSelected &&
                                    (selectedNavigation === "Add members" ?
                                        <BiCheck style={{fontSize:"1.3rem", marginRight:"10px", color:GRAY_DARKER}} />
                                        :
                                        <BiSolidDownArrow className="BiSolidDownArrow" style={{fontSize:"1.3rem", marginRight:"10px"}} onClick={(e) => {e.stopPropagation(); setIsSelectedChatOptionActive(!isSelectedChatOptionActive);}}  />)
                            }
                            <SpreadOptions contentArray={optionsArray as NaviagationTypes[]} isOpen={isSelectedChatOptionActive} setIsOpen={setIsSelectedChatOptionActive}
                                setIsStartChatClicked={setIsStartChatClicked}
                             />
                        </div>
                        :
                        <div className="icons_cont" style={{gap:"20px"}}>
                            {
                                date&&typeof date === "object"&&(date as IconType[]).map((Icon) => (
                                    isSelected && <Icon className={Icon.name === "CgRemove"?"CgRemove icon":"CgAdd icon"} onClick={() => replyFriendRequestHandler&&replyFriendRequestHandler({friendRequestID:userID, status:Icon.name === "CgRemove"?"rejected":"accepted"})} />
                                ))
                            }
                        </div>

                }
            </div>
        </div>
    )
};

export default UserListItem;