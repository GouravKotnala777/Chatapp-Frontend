import "../styles/components/settings.scss";
import { BiDotsVertical } from "react-icons/bi";
import { LuMessageSquarePlus } from "react-icons/lu";
import { Input, SpreadOptions } from "../utils/Utill";
import { MdAccountCircle } from "react-icons/md";
import { IoIosLock, IoMdHelpCircle, IoMdNotifications } from "react-icons/io";
import { BsChatSquareTextFill } from "react-icons/bs";
import { FaKeyboard } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { GRAY_LIGHTER, PRIMARY } from "../constants/constants";
import { Dispatch, SetStateAction } from "react";
import { NaviagationTypes } from "../types/types";
import { setSelectedNavigation } from "../redux/reducers/navigationReducer";
import { useDispatch, useSelector } from "react-redux";
import UserListItem from "./UserLIstItem";
import { LoginUserReducerTypes } from "../redux/reducers/loginUserReducer";

const settingList = [
    {settingName:"Account", settingIcon:<MdAccountCircle />},
    {settingName:"Privacy", settingIcon:<IoIosLock />},
    {settingName:"Chats", settingIcon:<BsChatSquareTextFill />},
    {settingName:"Notifications", settingIcon:<IoMdNotifications />},
    {settingName:"Keyboard Shortcuts", settingIcon:<FaKeyboard />},
    {settingName:"Help", settingIcon:<IoMdHelpCircle />},
    {settingName:"Logout", settingIcon:<IoLogOutOutline />}
];
const contentArray:NaviagationTypes[] = ["New group", "New broadcast", "Linked devices", "Starred messages", "Payments", "Settings"];


const Settings = ({isOptionsDialogActive, setIsOptionsDialogActive}:{isOptionsDialogActive:boolean; setIsOptionsDialogActive:Dispatch<SetStateAction<boolean>>;}) => {
    const {user} = useSelector((state:{loginUserReducer:LoginUserReducerTypes}) => state.loginUserReducer);
    const dispatch = useDispatch();


    return(
        <div className="settings_cont">
            <div className="settings_section_header">
                <div className="heading">Settings</div>
                <div className="icons">
                    <button className="icon"><LuMessageSquarePlus /></button>
                    <button className="icon"><BiDotsVertical /></button>
                    <SpreadOptions contentArray={contentArray} isOpen={isOptionsDialogActive} setIsOpen={setIsOptionsDialogActive} />
                </div>
            </div>
            <div className="search_section">
                <div className="search_cont_outer">
                <Input biSearchID="seachIconForSetting" faArrowLeftLongID="leftArrowIconForSetting" inputID="inputForSetting" ioMdCloseID="closeIconForSetting" />
                </div>
                <div className="search_tags_cont" onClick={() => dispatch(setSelectedNavigation("Profile"))}>
                    {/*<ChatListItem chatName={singleSelectedUser.name} lastMessage="Honesty is the best policy" date="aaa" imgHeight="80%" imgWidth="80px" />*/}
                    <UserListItem userID={user?._id as string} userName={user?.name as string} lastMessage={"kjljkas"} date={""}  />
                </div>
            </div>
            <div className="setting_section">
                <div className="setting_section_scrollable">
                    {
                        settingList.map((setting, index) => (
                            <div className="setting_list" key={index} style={{color:setting.settingName === "Logout" ? PRIMARY : GRAY_LIGHTER}}>
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