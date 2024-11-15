import "../styles/pages/home.scss";
import { CiSettings } from "react-icons/ci";
import photo from "../../public/vite.svg";
import messangerPlaceholderImg from "../../public/hero_img1.png";
import { Button, Heading, Para } from "../utils/Utill";
import { MouseEvent, useEffect, useState } from "react";
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
import { BiDotsVertical } from "react-icons/bi";
import { FaRegLaughBeam } from "react-icons/fa";
import { MdKeyboardVoice } from "react-icons/md";
import { FaCamera, FaPlus } from "react-icons/fa6";
import Messages from "../components/Messages";
import { ChatTypes, ChatTypesPopulated, ContentMessageType, DialogParentTypes, MessageTypes, MessageTypesPopulated, NaviagationTypes, UserTypes } from "../types/types";
import Messanger from "./Messanger";
import { MiscReducerTypes, setSelectedNavigation } from "../redux/reducers/navigationReducer";
import { useDispatch, useSelector } from "react-redux";
import NewGroup from "./NewGroup";
import { createChat, myProfile, selectedChatMessages } from "../redux/api/api";
import { setLoginUser } from "../redux/reducers/loginUserReducer";
import Contacts from "../components/Contancts";
import ChatMembersList from "../components/ChatMembersList";
import SearchUser from "../components/SearchUser";
import ReceivedFriendRequests from "../components/ReceivedFriendRequests";
import DeleteChat from "../components/DeleteChat";
import MessageInput from "../components/MessageInput";
import ChatInfo from "./ChatInfo";
import UserInfo from "./UserInfo";
import DialogWrapper from "../components/DialogWrapper";





const Home = () => {
    const [isTooltipActive, setIsTooltipActive] = useState<boolean>(false);
    const [tooltipPosition, setTooltipPosition] = useState<{x:number; y:number;}>({x:0, y:0});
    const [tooltipContent, setTooltipContent] = useState<string>("");
    const [isMessangerForMobileActive, setIsMessangerForMobileActive] = useState<boolean>(false);
    const {selectedNavigation, selectedChat, isMessageSelectionActive, selectedMessages} = useSelector((state:{miscReducer:MiscReducerTypes;}) => state.miscReducer);
    const [singleSelectedUser, setSingleSelectedUser] = useState<Pick<UserTypes, "_id"|"name"|"email">>({_id:"", name:"", email:""});
    const dispatch = useDispatch();
    const [messageType, setMessageType] = useState<ContentMessageType>("text");
    const [messageInp, setMessageInp] = useState<string>("");
    const [messageArray, setMessageArray] = useState<MessageTypesPopulated[]>([]);
    const [singleMessage, setSingleMessage] = useState<MessageTypes>({_id:"", chatID:"", sender:"", messageStatus:"read" , content:"", attachment:[], isForwarded:false, deletedFor:[], createdAt:"", updatedAt:""});
    const [refresh, setRefresh] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isDeleteForMeClicked, setIsDeleteForMeClicked] = useState<boolean>(false);
    const [isDeleteForAllClicked, setIsDeleteForAllClicked] = useState<boolean>(false);
    const [isStartChatClicked, setIsStartChatClicked] = useState<boolean>(false);
    const [dialogParent, setDialogParent] = useState<DialogParentTypes>("Delete for me");



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
    const createNonGroupChatHandler = async () => {
        const res = await createChat({chatName:singleSelectedUser.name, description:"aaaa", isGroupChat:false, members:[singleSelectedUser._id]});

        //if (res.success) {
        //}
        console.log("------  createNonGroupChatHandler");
        console.log(res.message);
        console.log("------  createNonGroupChatHandler");
    };

    useEffect(() => {
        const fetchMyProfile = myProfile();

        fetchMyProfile.then((data) => {
            console.log("from Home.tsx ))))))))))");
            dispatch(setLoginUser({isLoading:false, user:data.message as UserTypes, isError:false}))
            console.log("from Home.tsx ))))))))))");
            
        })
        .catch((err) => {
            console.log("from Home.tsx--------------");
            console.log(err);
            console.log("from Home.tsx--------------");
        })
    }, []);

    useEffect(() => {
        const getMessages = selectedChatMessages({chatID:selectedChat?._id as string});

        getMessages.then((data) => {
            console.log("----- getMessages Home.tsx");
            console.log(data);
            setMessageArray(data.message as MessageTypesPopulated[]);
            console.log("----- getMessages Home.tsx");
        })
        .catch((err) => {
            console.log("----- getMessages Home.tsx");
            console.log(err);
            console.log("----- getMessages Home.tsx");
        })
    }, [selectedChat]);
    
    useEffect(() => {
        if (isStartChatClicked === true) {
            createNonGroupChatHandler();
        }
        setIsStartChatClicked(false);
    }, [isStartChatClicked]);

    return(
        <>
        <DialogWrapper heading="Delete message?" parent={dialogParent} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} setIsDeleteForMeClicked={setIsDeleteForMeClicked} setIsDeleteForAllClicked={setIsDeleteForAllClicked} />
        <Tooltip content={tooltipContent} position={tooltipPosition} isTooltipActive={isTooltipActive} />
        {/*{JSON.stringify(singleSelectedUser)}*/}
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
                    <Messanger
                        refresh={refresh}
                        setRefresh={setRefresh}
                        messageInp={messageInp}
                        setMessageInp={setMessageInp}
                        messageType={messageType}
                        setMessageType={setMessageType}
                        messageArray={messageArray}
                        setMessageArray={setMessageArray}
                        singleMessage={singleMessage}
                        setSingleMessage={setSingleMessage}
                        singleSelectedUser={singleSelectedUser}
                        setSingleSelectedUser={setSingleSelectedUser}
                        selectedChat={selectedChat as ChatTypes}
                        setIsMessangerForMobileActive={setIsMessangerForMobileActive}
                        isDeleteForMeClicked={isDeleteForMeClicked}
                        isDeleteForAllClicked={isDeleteForAllClicked}
                        setIsDeleteForMeClicked={setIsDeleteForMeClicked}
                        setIsDeleteForAllClicked={setIsDeleteForAllClicked}
                        isMessageSelectionActive={isMessageSelectionActive}
                        selectedMessages={selectedMessages}
                        setIsDialogOpen={setIsDialogOpen}
                        setDialogParent={setDialogParent}
                        selectedNavigation={selectedNavigation}
                         />
                    :
                    selectedNavigation === "Chats" && !isMessangerForMobileActive ?
                        <Chats 
                            setIsMessangerForMobileActive={setIsMessangerForMobileActive}
                            setSelectedNavigation={setSelectedNavigation}
                            messagesArray={messageArray}
                         />
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
                                        <Settings  isOptionsDialogActive={false} setIsOptionsDialogActive={setIsMessangerForMobileActive} />
                                        :
                                        selectedNavigation === "New group" ?
                                            <NewGroup />
                                            :
                                            selectedNavigation === "Profile" ?
                                                <Profile />
                                                :
                                                selectedNavigation === "Add members" ?
                                                    <Contacts singleSelectedUser={singleSelectedUser} setSingleSelectedUser={setSingleSelectedUser} setIsStartChatClicked={setIsStartChatClicked} />
                                                    :
                                                    selectedNavigation === "Contacts" ?
                                                        <Contacts singleSelectedUser={singleSelectedUser} setSingleSelectedUser={setSingleSelectedUser} setIsStartChatClicked={setIsStartChatClicked} />
                                                        :
                                                        selectedNavigation === "Remove members" ?
                                                            <ChatMembersList />
                                                            :
                                                            selectedNavigation === "Search user" ?
                                                                <SearchUser />
                                                                :
                                                                selectedNavigation === "Friend requests" ?
                                                                    <ReceivedFriendRequests />
                                                                    :
                                                                    selectedNavigation === "Delete chat" ?
                                                                        <DeleteChat singleSelectedUser={singleSelectedUser._id} />
                                                                        :
                                                                        selectedNavigation === "Delete freind" ?
                                                                            <DeleteChat singleSelectedUser={singleSelectedUser._id} />
                                                                            :
                                                                            selectedNavigation === "Chat info" ?
                                                                                <ChatInfo selectedNavigation={selectedNavigation} selectedChat={selectedChat as ChatTypesPopulated} singleSelectedUser={singleSelectedUser} setSingleSelectedUser={setSingleSelectedUser} />
                                                                                :
                                                                                selectedNavigation === "User info" ?
                                                                                    <UserInfo singleSelectedUser={singleSelectedUser} setSingleSelectedUser={setSingleSelectedUser} />
                                                                                    :
                                                                                    selectedNavigation === "Forward" ?
                                                                                        <Contacts singleSelectedUser={singleSelectedUser} setSingleSelectedUser={setSingleSelectedUser} setIsStartChatClicked={setIsStartChatClicked} />
                                                                                        :
                                                                                        <Chats
                                                                                            setIsMessangerForMobileActive={setIsMessangerForMobileActive}
                                                                                            setSelectedNavigation={setSelectedNavigation}
                                                                                            messagesArray={messageArray}
                                                                                        />
                                                                                        //<h1 style={{color:"white"}}>From Home Page...</h1>
            }





            
            <div className="message_cont">
                {
                    selectedChat ? 
                        <div className="messagenger">
                            <div className="upper_part">
                                <div className="single_chat_outer"
                                    tabIndex={0}
                                    onKeyDown={(e) => {if (e.key === "Enter") {
                                        e.stopPropagation(); dispatch(setSelectedNavigation("Chat info"));
                                    }}}
                                    onClick={(e) => {e.stopPropagation(); dispatch(setSelectedNavigation("Chat info"))}}
                                    >
                                    <ChatListItem chatName={selectedChat.chatName} lastMessage={`last seen today at ${"---selectedChat.date---"} am`} iconsArray={[FaCamera, IoVideocam , BiDotsVertical]} />
                                </div>
                            </div>
                            <div className="middle_part">
                                <Messages messageArray={messageArray}
                                    setMessageArray={setMessageArray}
                                    isMessageSelectionActive={isMessageSelectionActive}
                                    selectedMessages={selectedMessages}
                                    setIsDialogOpen={setIsDialogOpen}
                                    isDeleteForMeClicked={isDeleteForMeClicked}
                                    setIsDeleteForMeClicked={setIsDeleteForMeClicked}
                                    isDeleteForAllClicked={isDeleteForAllClicked}
                                    setIsDeleteForAllClicked={setIsDeleteForAllClicked}
                                    setDialogParent={setDialogParent}
                                    selectedNavigation={selectedNavigation}
                                    selectedChat={selectedChat}
                                 />
                            </div>
                            {
                                !isMessageSelectionActive &&
                                    <div className="lower_part">
                                        <div className="icon"><FaRegLaughBeam /></div>
                                        <div className="icon"><FaPlus /></div>
                                        <div className="search_cont_outer">
                                            <MessageInput refresh={refresh} setRefresh={setRefresh} singleSelectedUser={singleSelectedUser} setSingleSelectedUser={setSingleSelectedUser} messageInp={messageInp} setMessageInp={setMessageInp} messageType={messageType} setMessageType={setMessageType} messageArray={messageArray} setMessageArray={setMessageArray} singleMessage={singleMessage} setSingleMessage={setSingleMessage} />
                                        </div>
                                        <div className="icon"><MdKeyboardVoice /></div>
                                    </div>
                            }
                        </div>
                        :
                        <div className="messagenger_placeholder">
                            <img className="placeholder_img" src={messangerPlaceholderImg} alt={messangerPlaceholderImg} />
                            <Heading value="Download WhatsApp for Windows" color="#e1e1e1" fontSize="1.2rem" />
                            <Para value="make calls, share your screen and get a faster experience when you download the Windows app." margin="0 auto" />
                            <Button value="Get from Microsoft Store" color="white" />
                        </div>
                }
            </div>
        </div>
        </>
    )

};

export default Home;