import "../styles/pages/messanger.scss";
import { FaRegLaughBeam } from "react-icons/fa"
import ChatListItem from "../components/chatListItem"
import Messages from "../components/Messages"
import { FaCamera, FaPlus } from "react-icons/fa6"
import { Input } from "../utils/Utill"
import { MdKeyboardVoice } from "react-icons/md"
import { IoVideocam } from "react-icons/io5"
import { BiDotsVertical, BiLeftArrow, BiSearch } from "react-icons/bi"
import { ChatTypes } from "../types/types"
import { Dispatch, SetStateAction } from "react";


const Messanger = ({selectedChat, setIsMessangerForMobileActive}:{selectedChat:ChatTypes; setIsMessangerForMobileActive:Dispatch<SetStateAction<boolean>>;}) => {

    return(
        <div className="messagenger_mobile">
            <div className="upper_part">
                <BiLeftArrow className="BiLeftArrow" onClick={() => setIsMessangerForMobileActive(false)} />
                <ChatListItem chatName={selectedChat?.chatName as string} lastMessage={`last seen today at ${selectedChat?.date} am`} date={[FaCamera, IoVideocam, BiSearch , BiDotsVertical]} />
            </div>
            <div className="middle_part">
                <Messages />
            </div>
            <div className="lower_part">
                <div className="icon"><FaRegLaughBeam /></div>
                <div className="icon"><FaPlus /></div>
                <div className="search_cont_outer">
                    <Input biSearchID="seachIconForMessanger" faArrowLeftLongID="leftArrowIconForMessanger" inputID="inputForMessanger" ioMdCloseID="closeIconForMessanger" />
                </div>
                <div className="icon"><MdKeyboardVoice /></div>
            </div>
        </div>
    )
};

export default Messanger;