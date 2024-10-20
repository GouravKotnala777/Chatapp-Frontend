import "../styles/components/settings.scss";
import { BiDotsVertical } from "react-icons/bi";
import { LuMessageSquarePlus } from "react-icons/lu";
import { Input } from "../utils/Utill";
import ChatListItem from "./chatListItem";
import { MdAccountCircle } from "react-icons/md";
import { IoIosLock, IoMdHelpCircle, IoMdNotifications } from "react-icons/io";
import { BsChatSquareTextFill } from "react-icons/bs";
import { FaKeyboard } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { GRAY_LIGHTER, PRIMARY } from "../constants/constants";

const settingList = [
    {settingName:"Account", settingIcon:<MdAccountCircle />},
    {settingName:"Privacy", settingIcon:<IoIosLock />},
    {settingName:"Chats", settingIcon:<BsChatSquareTextFill />},
    {settingName:"Notifications", settingIcon:<IoMdNotifications />},
    {settingName:"Keyboard Shortcuts", settingIcon:<FaKeyboard />},
    {settingName:"Help", settingIcon:<IoMdHelpCircle />},
    {settingName:"Logout", settingIcon:<IoLogOutOutline />}
]


const Settings = () => {
    

    return(
        <div className="settings_cont">
            <div className="settings_section_header">
                <div className="heading">Settings</div>
                <div className="icons">
                    <button className="icon"><LuMessageSquarePlus /></button>
                    <button className="icon"><BiDotsVertical /></button>
                </div>
            </div>
            <div className="search_section">
                <div className="search_cont_outer">
                <Input biSearchID="seachIconForSetting" faArrowLeftLongID="leftArrowIconForSetting" inputID="inputForSetting" ioMdCloseID="closeIconForSetting" />
                </div>
                <div className="search_tags_cont">
                    <ChatListItem chatName="Gourav" lastMessage="Honesty is the best policy" date="" imgHeight="80%" imgWidth="80px" />
                </div>
            </div>
            <div className="setting_section">
                <div className="setting_section_scrollable">
                    {
                        settingList.map((setting) => (
                            <div className="setting_list" style={{color:setting.settingName === "Logout" ? PRIMARY : GRAY_LIGHTER}}>
                                <div className="setting_icon">{setting.settingIcon}</div>
                                <div className="setting_name">{setting.settingName}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Settings;