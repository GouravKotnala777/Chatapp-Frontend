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





const Home = () => {
    const [isTooltipActive, setIsTooltipActive] = useState<boolean>(false);
    const [tooltipPosition, setTooltipPosition] = useState<{x:number; y:number;}>({x:0, y:0});
    const [tooltipContent, setTooltipContent] = useState<string>("");
    const [activeNavigation, setActiveNavigation] = useState<string>("Chats");
    const [isMessangerActive, setIsMessangerActive] = useState<{chatName:string; lastMessage:string; date:string;}>();


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
        setActiveNavigation(e.currentTarget.value);
    }

    return(
        <>
        <Tooltip content={tooltipContent} position={tooltipPosition} isTooltipActive={isTooltipActive} />
        <div className="home_bg">
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




            {
                activeNavigation === "Chats" ?
                    <Chats setIsMessangerActive={setIsMessangerActive} />
                    :
                    activeNavigation === "Status" ?
                        <Status />
                        :
                        activeNavigation === "Communities" ?
                            <Communities />
                            :
                            activeNavigation === "Channels" ?
                                <Channels />
                                :
                                activeNavigation === "Settings" ?
                                    <Settings />
                                    :
                                    activeNavigation === "Profile" ?
                                        <Profile />
                                        :
                                        <h1>From Home Page...</h1>
            }





            
            <div className="message_cont">
                {
                    isMessangerActive ? 
                        <div className="messagenger">
                            <div className="upper_part">
                                <ChatListItem chatName="Didi" lastMessage="last seen today at 8:06 am" date={[FaCamera, IoVideocam, BiSearch , BiDotsVertical]} />
                            </div>
                            <div className="middle_part">
                                <div className="messages_cont">
                                    
                                    <div className="incomming_message_cont">
                                        <div className="content">H</div>
                                        <div className="date">8:05 am</div>
                                    </div>
                                    <div className="incomming_message_cont">
                                        <div className="content">He</div>
                                        <div className="date">8:05 am</div>
                                    </div>
                                    <div className="incomming_message_cont">
                                        <div className="content">Hello</div>
                                        <div className="date">8:05 am</div>
                                    </div>
                                    <div className="default_message_cont">
                                        <div className="content">Hello</div>
                                        <div className="date">8:05 am</div>
                                    </div>
                                    <div className="outgoing_message_cont">
                                        <div className="content">Hello</div>
                                        <div className="date">8:05 am</div>
                                    </div>
                                    <div className="incomming_message_cont">
                                        <div className="content">Hello my</div>
                                        <div className="date">8:05 am</div>
                                    </div>
                                    <div className="incomming_message_cont">
                                        <div className="content">Hello my name</div>
                                        <div className="date">8:05 am</div>
                                    </div>
                                    <div className="outgoing_message_cont">
                                        <div className="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae dolore accusantium obcaecati distinctio odit facilis fugiat, omnis quia voluptas. Deleniti modi unde aspernatur similique excepturi dolorum commodi adipisci voluptas quasi.</div>
                                        <div className="date">8:05 am</div>
                                    </div>
                                    <div className="incomming_message_cont">
                                        <div className="content">Hello my name is gourav</div>
                                        <div className="date">8:05 am</div>
                                    </div>
                                    <div className="incomming_message_cont">
                                        <div className="content">Hello my name is gourav skdjsdaj sdkoajsd sakdjkajssn dsdjkasd ksjdkas ksjdkl lkjsdkaj asfhuhdc w wcjwenkmdniois dashdnsma</div>
                                        <div className="date">8:05 am</div>
                                    </div>
                                    <div className="incomming_message_cont">
                                        <div className="content">Hello my name is gourav</div>
                                        <div className="date">8:05 am</div>
                                    </div>
                                    <div className="incomming_message_cont">
                                        <div className="content">Hello my name is gourav</div>
                                        <div className="date">8:05 am</div>
                                    </div>
                                    <div className="incomming_message_cont">
                                        <div className="content">Hello my name is gourav</div>
                                        <div className="date">8:05 am</div>
                                    </div>
                                    <div className="incomming_message_cont">
                                        <div className="content">Hello my name is gourav</div>
                                        <div className="date">8:05 am</div>
                                    </div>



                                </div>
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
                            <Heading value="Download WhatsApp for Windows" color="#e1e1e1" />
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