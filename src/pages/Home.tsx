import "../styles/pages/home.scss";
import { CiSettings } from "react-icons/ci";
import photo from "../../public/vite.svg";
import messangerPlaceholderImg from "../../public/hero_img1.png";
import { Button, Heading, Input, Para } from "../utils/Utill";
import { MouseEvent, useState } from "react";
import Tooltip from "../components/Tooltip";
import { BsChatSquareText } from "react-icons/bs";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { IoPeopleOutline, IoVideocam } from "react-icons/io5";
import Status from "../components/Status";
import Chats from "../components/Chats";
import Communities from "../components/Communities";
import { GrChannel } from "react-icons/gr";
import Channels from "../components/Channels";
import Settings from "../components/Settings";
import Profile from "../components/Profile";
import ChatListItem from "../components/chatListItem";
import { BiDotsVertical, BiSearch } from "react-icons/bi";
import { FaRegLaughBeam } from "react-icons/fa";
import { MdKeyboardVoice } from "react-icons/md";
import { FaCamera, FaPlus } from "react-icons/fa6";
import Messages from "../components/Messages";
import { ChatTypes, NaviagationTypes } from "../types/types";
import Messanger from "./Messanger";
import { MiscReducerTypes, setSelectedChat, setSelectedNavigation } from "../redux/reducers/navigationReducer";
import { useDispatch, useSelector } from "react-redux";
import NewGroup from "./NewGroup";





const Home = () => {
    const [isTooltipActive, setIsTooltipActive] = useState<boolean>(false);
    const [tooltipPosition, setTooltipPosition] = useState<{x:number; y:number;}>({x:0, y:0});
    const [tooltipContent, setTooltipContent] = useState<string>("");
    const [isMessangerForMobileActive, setIsMessangerForMobileActive] = useState<boolean>(false);
    const {selectedNavigation, selectedChat} = useSelector((state:{miscReducer:MiscReducerTypes;}) => state.miscReducer);
    const dispatch = useDispatch();


    const showTooltipHandler = (e:MouseEvent<HTMLButtonElement>) => {
        //document.getElementById("aaaa")?.getBoundingClientRect
        setIsTooltipActive(true);
        const rect = e.currentTarget.getBoundingClientRect();
        console.log({x:e.currentTarget.offsetLeft, y:e.currentTarget.offsetTop, rectTop:rect.top + window.scrollY, rectLeft:rect.left + rect.width + 10});
        
        setTooltipPosition({x:e.currentTarget.offsetLeft, y:e.currentTarget.offsetTop});
        setTooltipContent(e.currentTarget.value);
    };
    const hideTooltipHandler = () => {
        setIsTooltipActive(false);
    };
    const navigationHandler = (e:MouseEvent<HTMLButtonElement>) => {
        dispatch(setSelectedNavigation(e.currentTarget.value as NaviagationTypes));
    };

    return(
        <>
        <Tooltip content={tooltipContent} position={tooltipPosition} isTooltipActive={isTooltipActive} />
        {/*{selectedNavigation}*/}
        <div className="home_bg">
            {
                !isMessangerForMobileActive &&
                    <div className="navbar_cont">
                        <div className="nav_cont">
                            <button className="nav_icon" value="Chats" onClick={(e) => navigationHandler(e)} onMouseOver={(e) => showTooltipHandler(e)}  onMouseOut={hideTooltipHandler}>
                                <div className="icon_and_name">
                                    <BsChatSquareText className="icon" />
                                    <div className="icon_name">Chats</div>
                                </div>
                            </button>

                            <button className="nav_icon" value="Status" onClick={(e) => navigationHandler(e)} onMouseOver={(e) => showTooltipHandler(e)}  onMouseOut={hideTooltipHandler}>
                                <div className="icon_and_name">
                                    <HiOutlineStatusOnline className="icon" />
                                    <div className="icon_name">Status</div>
                                </div>
                            </button>

                            <button className="nav_icon" value="Communities" onClick={(e) => navigationHandler(e)} onMouseOver={(e) => showTooltipHandler(e)}  onMouseOut={hideTooltipHandler}>
                                <div className="icon_and_name">
                                    <IoPeopleOutline className="icon" />
                                    <div className="icon_name">Communities</div>
                                </div>
                            </button>

                            <button className="nav_icon" value="Channels" onClick={(e) => navigationHandler(e)} onMouseOver={(e) => showTooltipHandler(e)}  onMouseOut={hideTooltipHandler}>
                                <div className="icon_and_name">
                                    <GrChannel className="icon" />
                                    <div className="icon_name">Channels</div>
                                </div>
                            </button>
                        </div>
                        <div className="setting_cont">
                            <button className="nav_icon" value="Settings" onClick={(e) => navigationHandler(e)} onMouseOver={(e) => showTooltipHandler(e)}  onMouseOut={hideTooltipHandler}>
                                <div className="icon_and_name">
                                    <CiSettings className="icon" />
                                    <div className="icon_name">Setting</div>
                                </div>
                            </button>
                            <button className="nav_icon" value="Profile" onClick={(e) => navigationHandler(e)} onMouseOver={(e) => showTooltipHandler(e)}  onMouseOut={hideTooltipHandler}>
                                <div className="icon_and_name">
                                    <img src={photo} alt={photo} />
                                    <div className="icon_name">Profile</div>
                                </div>
                            </button>
                        </div>
                    </div>
            }




            {
                selectedNavigation === "Chats" && isMessangerForMobileActive ?
                    <Messanger selectedChat={selectedChat as ChatTypes} setIsMessangerForMobileActive={setIsMessangerForMobileActive} />
                    :
                    selectedNavigation === "Chats" && !isMessangerForMobileActive ?
                        <Chats setIsMessangerForMobileActive={setIsMessangerForMobileActive} selectedChat={selectedChat} setSelectedChat={setSelectedChat} setSelectedNavigation={setSelectedNavigation} />
                        :
                        selectedNavigation === "Status" ?
                            <Status />
                            :
                            selectedNavigation === "Communities" ?
                                <Communities />
                                :
                                selectedNavigation === "Channels" ?
                                    <Channels />
                                    :
                                    selectedNavigation === "Settings" ?
                                        <Settings isOptionsDialogActive={false} setIsOptionsDialogActive={setIsMessangerForMobileActive} />
                                        :
                                        selectedNavigation === "New group" ?
                                            <NewGroup />
                                            :
                                            selectedNavigation === "Profile" ?
                                                <Profile />
                                                :
                                                <h1>From Home Page...</h1>
            }





            
            <div className="message_cont">
                {
                    selectedChat ? 
                        <div className="messagenger">
                            <div className="upper_part">
                                <ChatListItem chatName={selectedChat.chatName} lastMessage={`last seen today at ${selectedChat.date} am`} date={[FaCamera, IoVideocam, BiSearch , BiDotsVertical]} />
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
                        :
                        <div className="messagenger_placeholder">
                            <img className="placeholder_img" src={messangerPlaceholderImg} alt={messangerPlaceholderImg} />
                            <Heading value="Download WhatsApp for Windows" color="#e1e1e1" fontSize="1.2rem" />
                            <Para value="make calls, share your screen and get a faster experience when you download the Windows app." />
                            <Button value="Get from Microsoft Store" color="white" />
                        </div>
                }
            </div>
        </div>
        </>
    )

};

export default Home;