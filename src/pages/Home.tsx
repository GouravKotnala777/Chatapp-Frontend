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
import { ChatTypes, ChatTypesPopulated, ContentMessageType, DialogParentTypes, MessageTypes, MessageTypesPopulated, NaviagationTypes, NotificationStatusTypes, NotificationTypeTypes, UserTypes } from "../types/types";
import Messanger from "./Messanger";
import { MiscReducerTypes, setSelectedNavigation } from "../redux/reducers/navigationReducer";
import { useDispatch, useSelector } from "react-redux";
import NewGroup from "./NewGroup";
import { allReceivedFriendRequests, createChat, myNotifications, selectedChatMessages, sendAttachment } from "../redux/api/api";
import Contacts from "../components/Contancts";
import ChatMembersList from "../components/ChatMembersList";
import SearchUser from "../components/SearchUser";
import ReceivedFriendRequests from "../components/ReceivedFriendRequests";
import DeleteChat from "../components/DeleteChat";
import MessageInput from "../components/MessageInput";
import ChatInfo from "./ChatInfo";
import UserInfo from "./UserInfo";
import DialogWrapper from "../components/DialogWrapper";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { io, Socket } from "socket.io-client";
import { Toaster } from "react-hot-toast";
import Notifications from "../components/Notifications";




let socket:Socket<DefaultEventsMap, DefaultEventsMap>;

const Home = ({user}:{user:UserTypes|null}) => {
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
    const [isAttachmentOpen, setIsAttachmentOpen] = useState<boolean>(false);
    const [isSelectedUserOnline, setIsSelectedUserOnline] = useState<{success:boolean; socketID?:string; message?:string;}>({success:false, socketID:"", message:""});
    const [friendRequests, setFriendRequests] = useState<{_id:string; from:{_id:string; name:string; email:string;}; to:{_id:string; name:string; email:string;}; date:Date;}[]>([]);
    const [notifications, setNotifications] = useState<{
        _id:string;
        receiverID:string;
        notificationType:NotificationTypeTypes;
        status:NotificationStatusTypes;
        content:string;
        redirectedURL?:string;
        newFor:string[];
        visibleFor:string[];
        createdAt:Date;
    }[]>([]);
    //const [totalReceivedFriendRequests, setTotalReceivedFriendRequests] = useState<number>(0);


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
        const getMessages = selectedChatMessages({chatID:selectedChat?._id as string});

        getMessages.then((data) => {
            console.log("----- getMessages Home.tsx");
            console.log(data);
            setMessageArray(data.jsonData as MessageTypesPopulated[]);
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

    useEffect(() => {
        const getAllReceivedFriendRequests = allReceivedFriendRequests();

        getAllReceivedFriendRequests.then((data) => {
            console.log("----- allReceivedFriendRequests");
            console.log(data);
            if (data.success === true) {
                setFriendRequests(data.jsonData as {_id:string; from:{_id:string; name:string; email:string;}; to:{_id:string; name:string; email:string;}; date:Date;}[]);
                //setTotalReceivedFriendRequests((data.jsonData as {_id:string; from:{_id:string; name:string; email:string;}; to:{_id:string; name:string; email:string;}; date:Date;}[]).length);
            }
            console.log("----- allReceivedFriendRequests");
        }).catch((err) => {
            console.log("----- allReceivedFriendRequests");
            console.log(err);
            console.log("----- allReceivedFriendRequests");
        });
    }, []);

    useEffect(() => {
        const myNotificationsRes = myNotifications();

        myNotificationsRes.then((data) => {
            if (data.success === true) {
                console.log({myNotificationsRes});
                
                setNotifications(data.jsonData as []);
            }
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        socket = io(import.meta.env.VITE_SERVER_URL);
        socket.emit("registerUser", {userID:user?._id, userName:user?.name});


        //const mmbrID = (selectedChat?.members as UserTypes[]).map((item) => item._id ).find((item) => item !== user?._id);
        console.log("@@@@@@@@@@@@@@@@@@@@@ 1");
        socket.on("setIsOnline", ({success, socketID}:{success:boolean; socketID:string;}) => {
            setIsSelectedUserOnline({success, socketID})
        });
        console.log("@@@@@@@@@@@@@@@@@@@@@ 2");

        

        socket.on("messageReceived", ({message, receivers}:{message:MessageTypesPopulated; receivers:UserTypes[];}) => {
            console.log("sender => "+ message.sender);
            console.log("receivers => "+ receivers);
            console.log("message => "+message.content?.contentMessage);
            setMessageArray((prev) => [...prev, message]);
        });


        socket.on("sendFriendRequest", (request:{
            _id: string;
            from: {
                _id: string;
                name: string;
                email: string;
            };
            to: {
                _id: string;
                name: string;
                email: string;
            };
            date: Date;
        }) => {
            console.log("::::::::::::::::::::::::::: (1)");
            console.log(request);
            setFriendRequests((prev) => [...prev, request]);
            console.log("::::::::::::::::::::::::::: (2)");

            //toast.success(`${request.from.name} sended you friend request`, {
            //    duration:2000,
            //    position:"top-center"
            //});
        });


        socket.on("replyFriendRequest", (request) => {
            console.log("!!!!!!!!!!!!!!!!!!!!!!!! (1)");
            console.log(request);
            setFriendRequests((prev) => prev.filter((item) => item._id !== request.requestID));
            console.log("!!!!!!!!!!!!!!!!!!!!!!!! (2)");
            //toast.success(`${request.requestReceiverName} accepted your friend request`, {
            //    duration:2000,
            //    position:"top-center"
            //});
        });


        socket.on("newNotification", (noti) => {
            console.log("!!!!!!!!!!!!!!!!!!!!!!!! (1)");
            console.log(noti);
            setNotifications((prev) => [...prev, noti]);
            console.log("!!!!!!!!!!!!!!!!!!!!!!!! (2)");
            //toast.success(`${request.requestReceiverName} accepted your friend request`, {
            //    duration:2000,
            //    position:"top-center"
            //});
        });
    }, [user]);

    return(
        <>
        <DialogWrapper heading="Delete message?" parent={dialogParent} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} setIsDeleteForMeClicked={setIsDeleteForMeClicked} setIsDeleteForAllClicked={setIsDeleteForAllClicked} />
        <Tooltip content={tooltipContent} position={tooltipPosition} isTooltipActive={isTooltipActive} />
        <Toaster />
        {/*<pre>{JSON.stringify(notifications)}</pre>*/}
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
                        socket={socket}
                         />
                    :
                    selectedNavigation === "Chats" && !isMessangerForMobileActive ?
                        <Chats
                            totalReceivedFriendRequests={notifications.filter((noti) => noti.visibleFor.includes(user?._id as string)).length}
                            setIsMessangerForMobileActive={setIsMessangerForMobileActive}
                            setSelectedNavigation={setSelectedNavigation}
                            messagesArray={messageArray}
                            socket={socket}
                            myUserID={user?._id as string}
                            setIsSelectedUserOnline={setIsSelectedUserOnline}
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
                                                                            //ISKE LIYE CONTROLLER BANANA HAI
                                                                <SearchUser friendRequests={friendRequests} setFriendRequests={setFriendRequests} user={user}
                                                                    notifications={notifications} setNotifications={setNotifications}
                                                                />
                                                                :
                                                                selectedNavigation === "Friend requests" ?
                                                                    <ReceivedFriendRequests friendRequests={friendRequests} setFriendRequests={setFriendRequests}
                                                                        notifications={notifications} setNotifications={setNotifications} user={user} />
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
                                                                                        selectedNavigation === "Notifications" ?
                                                                                            <Notifications notifications={notifications} setNotifications={setNotifications} />
                                                                                            :
                                                                                            <Chats
                                                                                                totalReceivedFriendRequests={notifications.filter((noti) => noti.visibleFor.includes(user?._id as string)).length}
                                                                                                setIsMessangerForMobileActive={setIsMessangerForMobileActive}
                                                                                                setSelectedNavigation={setSelectedNavigation}
                                                                                                messagesArray={messageArray}
                                                                                                socket={socket}
                                                                                                myUserID={user?._id as string}
                                                                                                setIsSelectedUserOnline={setIsSelectedUserOnline}
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
                                    <ChatListItem chatName={selectedChat.chatName} lastMessage={isSelectedUserOnline.success === true ?"online":`last seen today at ${"---selectedChat.date---"} am`} iconsArray={[FaCamera, IoVideocam , BiDotsVertical]} />
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
                                    socket={socket}
                                 />
                            </div>
                            {
                                !isMessageSelectionActive &&
                                    <div className="lower_part">
                                        <div className="icon"><FaRegLaughBeam /></div>
                                        <div className="icon" onClick={() => setIsAttachmentOpen(!isAttachmentOpen)}>
                                            <FaPlus />
                                            <div className="attachment_dialog_menu" style={{zIndex:isAttachmentOpen?"22":"-1"}}>
                                                <div className="attachment_menu_cont" style={{transform:isAttachmentOpen?`scale(1,1)`:`scale(1,0)`}}>
                                                    {
                                                        [{heading:"Image", ext:".jpg, .jpeg, .png"}, {heading:"Video", ext:"video/*"}, {heading:"Audio", ext:"audio/*"}, {heading:"File", ext:".pdf, .doc, .xls, .xlsx, .docx, .txt"}, {heading:"Archives", ext:".zip, .rar, .7z"}].map(item => (
                                                            <div className="menu" key={item.heading}>
                                                                <span className="menu_span">{item.heading}</span>
                                                                <input type="file" accept={item.ext} className="menu_file_input"
                                                                    onChange={(e) => {
                                                                        const formData = new FormData();
                                                                        formData.append("messageType", item.heading.toLowerCase());
                                                                        formData.append("chatID", selectedChat._id);
                                                                        formData.append("image", e.target.files?.[0] as File);

                                                                        console.log(formData);

                                                                        const sendImage = sendAttachment(formData);

                                                                        sendImage.then((resolve) => {
                                                                            console.log(resolve);
                                                                            if (resolve.success === true) {
                                                                                setMessageArray((prev) => [...prev, (resolve.jsonData as MessageTypesPopulated)]);
                                                                                socket.emit("messageSent", {message:resolve.jsonData as MessageTypesPopulated, receivers:(selectedChat?.members as UserTypes[]).filter((userData => userData._id !== user?._id))})
                                                                            }
                                                                        }).catch((err) => {
                                                                            console.log(err);
                                                                        })
                                                                    }}
                                                                />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="search_cont_outer">
                                            <MessageInput socket={socket} refresh={refresh} setRefresh={setRefresh} singleSelectedUser={singleSelectedUser} setSingleSelectedUser={setSingleSelectedUser} messageInp={messageInp} setMessageInp={setMessageInp} messageType={messageType} setMessageType={setMessageType} messageArray={messageArray} setMessageArray={setMessageArray} singleMessage={singleMessage} setSingleMessage={setSingleMessage} />
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