import "../styles/pages/home.scss";
import { CiSettings } from "react-icons/ci";
import photo from "../../public/vite.svg";
import messangerPlaceholderImg from "../../public/hero_img.png";
import { Button, Heading, Para } from "../utils/Utill";
import { MouseEvent, useState } from "react";
import Tooltip from "../components/Tooltip";
import { BsChatSquareText } from "react-icons/bs";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { IoCall, IoPeopleOutline } from "react-icons/io5";
import { MdOutlineFeedback } from "react-icons/md";
import Status from "../components/Status";
import Chats from "../components/Chats";




const Home = () => {
    const [isTooltipActive, setIsTooltipActive] = useState<boolean>(false);
    const [tooltipPosition, setTooltipPosition] = useState<{x:number; y:number;}>({x:0, y:0});
    const [tooltipContent, setTooltipContent] = useState<string>("");
    const [activeNavigation, setActiveNavigation] = useState<string>("");


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

                    <button className="nav_icon" value="Community" onClick={(e) => navigationHandler(e)} onMouseOver={(e) => showTooltipHandler(e)}  onMouseOut={hideTooltipHandler}>
                        <div className="icon_and_name">
                            <IoPeopleOutline className="icon" />
                            <div className="icon_name">Communities</div>
                        </div>
                    </button>

                    <button className="nav_icon" value="Call" onClick={(e) => navigationHandler(e)} onMouseOver={(e) => showTooltipHandler(e)}  onMouseOut={hideTooltipHandler}>
                        <div className="icon_and_name">
                            <IoCall className="icon" />
                            <div className="icon_name">Call</div>
                        </div>
                    </button>
                </div>
                <div className="setting_cont">
                    <button className="nav_icon" value="Chats" onClick={(e) => navigationHandler(e)} onMouseOver={(e) => showTooltipHandler(e)}  onMouseOut={hideTooltipHandler}>
                        <div className="icon_and_name">
                            <CiSettings className="icon" />
                            <div className="icon_name">Setting</div>
                        </div>
                    </button>
                    <button className="nav_icon" value="Chats" onClick={(e) => navigationHandler(e)} onMouseOver={(e) => showTooltipHandler(e)}  onMouseOut={hideTooltipHandler}>
                        <div className="icon_and_name">
                            <img src={photo} alt={photo} />
                            <div className="icon_name">Profile</div>
                        </div>
                    </button>
                </div>
            </div>




            {
                activeNavigation === "Chats" ?
                    <Chats />
                    :
                    activeNavigation === "Status" ?
                        <Status />
                        :
                        <h1>Hello</h1>
            }





            
            <div className="message_cont">
                <div className="messagenger_placeholder">
                    <img className="placeholder_img" src={messangerPlaceholderImg} alt={messangerPlaceholderImg} />
                    <Heading value="Download WhatsApp for Windows" color="#e1e1e1" />
                    <Para value="make calls, share your screen and get a faster experience when you download the Windows app." />
                    <Button value="Get from Microsoft Store" color="white" />
                </div>
            </div>
        </div>
        </>
    )

};

export default Home;