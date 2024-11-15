import { useDispatch, useSelector } from "react-redux";
import "../styles/components/messages.scss";
import { ChatTypes, ChatTypesPopulated, DialogParentTypes, MessageTypesPopulated, NaviagationTypes } from "../types/types";
import { LoginUserReducerTypes } from "../redux/reducers/loginUserReducer";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { BiDownArrow } from "react-icons/bi";
import { SpreadOptions } from "../utils/Utill";
import { FcCancel } from "react-icons/fc";
import { CgRemove } from "react-icons/cg";
import { setIsMessageSelectionActive, setSelectedMessages } from "../redux/reducers/navigationReducer";
import { deleteMessagesForAll, deleteMessagesForMe } from "../redux/api/api";
import { BsForward } from "react-icons/bs";
//import { Dispatch, SetStateAction } from "react";

const Messages = ({messageArray, setMessageArray, isMessageSelectionActive, selectedMessages, setIsDialogOpen,
    isDeleteForMeClicked, isDeleteForAllClicked, setIsDeleteForMeClicked, setIsDeleteForAllClicked, setDialogParent,
    selectedNavigation
}:{messageArray:MessageTypesPopulated[]|[];
    setMessageArray:Dispatch<SetStateAction<MessageTypesPopulated[]>>;
    isMessageSelectionActive:boolean;
    selectedMessages:MessageTypesPopulated[];
    setIsDialogOpen:Dispatch<SetStateAction<boolean>>;
    isDeleteForMeClicked:boolean;
    setIsDeleteForMeClicked:Dispatch<SetStateAction<boolean>>;
    isDeleteForAllClicked:boolean;
    setIsDeleteForAllClicked:Dispatch<SetStateAction<boolean>>;
    setDialogParent:Dispatch<SetStateAction<DialogParentTypes>>;
    selectedNavigation:NaviagationTypes;
    selectedChat:ChatTypes|ChatTypesPopulated|null;
}) => {
    const {user} = useSelector((state:{loginUserReducer:LoginUserReducerTypes}) => state.loginUserReducer);
    const [selectedMessage, setSelectedMessage] = useState<string>("");
    const messageEndRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dispatch = useDispatch();

    const scrollToBottomHandler = () => {
        messageEndRef.current?.scrollIntoView({behavior:"smooth"});
    };

    const onMouseEnterHandler = (msgID:string) => {
        setSelectedMessage(msgID);
    }
    const cancelMessageSelectionHandler = () => {
        dispatch(setIsMessageSelectionActive(false));
        dispatch(setSelectedMessages(null));
    };
    const deleteMessagesForMeHandler = async() => {
        try {
            const res = await deleteMessagesForMe({messageID:selectedMessages.map((msg) => msg._id)});

            if (res.success) {
                //setDeletedMsgsForMe(res.message as string[]);
                dispatch(setIsMessageSelectionActive(false));
                dispatch(setSelectedMessages(null));
                setMessageArray(messageArray.filter((array1Item) => !(
                    res.message as string[]).some((array2Item) => 
                        array2Item === array1Item._id
                    )
                ))
            }
            console.log("======== deleteForMe chala hai");
            console.log(res);
            console.log("======== deleteForMe chala hai");
            
        } catch (error) {
            console.log("======== deleteForMe chala hai");
            console.log(error);
            console.log("======== deleteForMe chala hai");
        }
    };
    const deleteMessagesForAllHandler = async() => {
        try {
            const res = await deleteMessagesForAll({messageID:selectedMessages.map((msg) => msg._id), chatID:selectedMessages[0].chatID});

            if (res.success) {
                //setDeletedMsgsForAll(res.message as string[]);
                dispatch(setIsMessageSelectionActive(false));
                dispatch(setSelectedMessages(null));
                setMessageArray(messageArray.filter((array1Item) => !(
                    res.message as string[]).some((array2Item) => 
                        array2Item === array1Item._id
                    )
                ))
            }
            console.log("======== deleteForAll chala hai");
            console.log(res);
            console.log("======== deleteForAll chala hai");
            
        } catch (error) {
            console.log("======== deleteForAll chala hai");
            console.log(error);
            console.log("======== deleteForAll chala hai");
        }
    };
    const deleteMessagesHandler = () => {
        if (user?._id) {
            if (selectedMessages.find(msg => msg.sender !== (user._id))) {
                setDialogParent("Delete for me");
            }
            else{
                setDialogParent("Delete for all");
            }
            setIsDialogOpen(true);
        }
        else{
            console.log("----------USERID NAHI HAI---------");
        }
    };
    const forwardMessageHandler = async() => {
        try {
            console.log("forwarding....");
            //const res = await forwardMessage({chatID:selectedChat?._id as string, sender:user?._id as string, contentID:selectedMessages.map((msg) => msg.content._id), attachment:selectedMessages.flatMap((msg) => msg.attachment), messageType:"file", messageStatus:"sent", isForwarded:true});

            //if (res.success === true) {
            //    console.log(res.message);
            //}
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isDeleteForMeClicked) {
            deleteMessagesForMeHandler();
            setIsDeleteForMeClicked(false);
            setSelectedMessage("");
        }
    }, [isDeleteForMeClicked]);
    useEffect(() => {
        if (isDeleteForAllClicked) {
            deleteMessagesForAllHandler();
            setIsDeleteForAllClicked(false);
            setSelectedMessage("");
        }
    }, [isDeleteForAllClicked]);

    useEffect(() => {
        scrollToBottomHandler();
    }, [messageArray]);

    return(
        <div className="messages_cont">
            {/*<pre style={{color:"white"}}>{JSON.stringify(selectedNavigation, null, `\t`)}</pre>*/}
            {
                messageArray&&typeof messageArray === "object"&&messageArray.length!==0&&messageArray.map((msg) => {
                    if (msg.sender === user?._id) {
                        return(
                            <div className="outgoing_message_cont_outer" key={msg._id}>
                                <input type="checkbox" className="include_message_checkbox" name={`includeMessage-${msg._id}`} style={{transform:isMessageSelectionActive?"scale(1, 1)":"scale(0, 1)"}} onChange={() => dispatch(setSelectedMessages(msg))} />
                                <div className="outgoing_message_cont" onMouseEnter={() => onMouseEnterHandler(msg._id)}>
                                    <div className="content">{msg.content.contentMessage}</div>
                                    <div className="date"
                                    style={{display:selectedMessage === msg._id ? "none" : "block"}}
                                    >{msg.createdAt.toString().split("T")[0]}</div>
                                    <div className="message_options_cont" 
                                    style={{display:selectedMessage === msg._id ? "block" : "none"}}
                                    >
                                        <BiDownArrow className="BiDownArrow" onClick={() => setIsOpen(!isOpen)} />
                                        <SpreadOptions contentArray={["Add members", "Forward", "Archive chat", "Delete message"]} isOpen={isOpen} setIsOpen={setIsOpen} />
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    else if(msg.sender === "default"){
                        return(
                            <div className="default_message_cont" key={msg._id}>
                                <div className="date"
                                style={{display:selectedMessage === msg._id ? "none" : "block"}}                                
                                >{msg.createdAt.toString().split("T")[0]}</div>
                                <div className="message_options_cont" 
                                    style={{display:selectedMessage === msg._id ? "block" : "none"}}
                                    >
                                    <BiDownArrow className="BiDownArrow" />
                                    <SpreadOptions contentArray={["Add members", "Block", "Archive chat"]} isOpen={isOpen} setIsOpen={setIsOpen} />
                                </div>
                            </div>
                        )
                    }
                    else{
                        return(
                            <div className="incomming_message_cont_outer" key={msg._id}>
                                <input type="checkbox" className="include_message_checkbox" name={`includeMessage-${msg._id}`} style={{transform:isMessageSelectionActive?"scale(1, 1)":"scale(0, 1)"}} onChange={() => dispatch(setSelectedMessages(msg))} />
                                <div className="incomming_message_cont" onMouseEnter={() => onMouseEnterHandler(msg._id)}>
                                    <div className="content">{msg.content.contentMessage}</div>
                                    <div className="date"
                                    style={{display:selectedMessage === msg._id ? "none" : "block"}}
                                    >{msg.createdAt.toString().split("T")[0]}</div>
                                    <div className="message_options_cont" 
                                        style={{display:selectedMessage === msg._id ? "block" : "none"}}
                                        >
                                        <BiDownArrow className="BiDownArrow" onClick={() => setIsOpen(!isOpen)} />
                                        <SpreadOptions contentArray={["Add members", "Block", "Archive chat", "Delete message"]} isOpen={isOpen} setIsOpen={setIsOpen} />
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })
            }

            {
                selectedNavigation === "Delete message" &&
                    <div className="cancel_message_selection_cont" style={{display:isMessageSelectionActive?"flex":"none"}}>
                        <div className="icon" onClick={cancelMessageSelectionHandler}><FcCancel className="FcCancel" /></div>
                        <div className="selected_messages_count">{selectedMessages.length} selected messages</div>
                        <div className="icon"><CgRemove className="CgRemove" onClick={() => deleteMessagesHandler()} /></div>
                    </div>
            }
            {
                selectedNavigation === "Forward" &&
                    <div className="cancel_message_selection_cont" style={{display:isMessageSelectionActive?"flex":"none"}}>
                        <div className="icon" onClick={cancelMessageSelectionHandler}><FcCancel className="FcCancel" /></div>
                        <div className="selected_messages_count">{selectedMessages.length} selected messages</div>
                        <div className="icon"><BsForward className="CgRemove" onClick={() => forwardMessageHandler()} /></div>
                        {/*<div className="icon"><BsForward className="CgRemove" /></div>*/}
                    </div>
            }


            <div className="message_end_anchor" ref={messageEndRef}></div>
        </div>
    )
};

export default Messages;