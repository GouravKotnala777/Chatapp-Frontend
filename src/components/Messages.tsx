import { useDispatch, useSelector } from "react-redux";
import "../styles/components/messages.scss";
import { ChatTypes, ChatTypesPopulated, DialogParentTypes, MessageTypesPopulated, NaviagationTypes, UserTypes } from "../types/types";
import { LoginUserReducerTypes } from "../redux/reducers/loginUserReducer";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { BiDownArrow, BiDownload } from "react-icons/bi";
import { ImageWithFallback, SpreadOptions } from "../utils/Utill";
import { FcCancel } from "react-icons/fc";
import { CgRemove } from "react-icons/cg";
import { setIsMessageSelectionActive, setSelectedMessages } from "../redux/reducers/navigationReducer";
import { deleteMessagesForAll, deleteMessagesForMe } from "../redux/api/api";
import { BsForward } from "react-icons/bs";
import { FiFile } from "react-icons/fi";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket } from "socket.io-client";
//import { Dispatch, SetStateAction } from "react";

const Messages = ({messageArray, setMessageArray, isMessageSelectionActive, selectedMessages, setIsDialogOpen,
    isDeleteForMeClicked, isDeleteForAllClicked, setIsDeleteForMeClicked, setIsDeleteForAllClicked, setDialogParent,
    selectedNavigation, socket
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
    socket:Socket<DefaultEventsMap, DefaultEventsMap>;
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
    useEffect(() => {
        socket.on("messageReceived", ({message, receivers}:{message:MessageTypesPopulated; receivers:UserTypes[];}) => {
            console.log("sender => "+ message.sender);
            console.log("receivers => "+ receivers);
            console.log("message => "+message.content?.contentMessage);
            setMessageArray((prev) => [...prev, message]);
        });
    }, []);

    return(
        <div className="messages_cont">
            {/*<pre style={{color:"white"}}>{JSON.stringify(selectedMessages, null, `\t`)}</pre>
            <pre style={{color:"white"}}>{JSON.stringify(messageArray?.map(e => ({_id:e._id, contentID:e.content?._id, contentMessage:e.content?.contentMessage})), null, `\t`)}</pre>*/}
            {
                messageArray&&typeof messageArray === "object"&&messageArray.length!==0&&messageArray.map((msg) => {
                    if (msg.sender === user?._id) {
                        if (msg.content) {
                            return(
                                <div className="outgoing_message_cont_outer" key={msg._id}>
                                    <input type="checkbox" className="include_message_checkbox" name={`includeMessage-${msg._id}`} style={{transform:isMessageSelectionActive?"scale(1, 1)":"scale(0, 1)"}} onChange={() => dispatch(setSelectedMessages(msg))} />
                                    <div className="outgoing_message_cont" onMouseEnter={() => onMouseEnterHandler(msg._id)}>
                                        <div className="content">{msg?.content?.contentMessage}</div>
                                        {/*<div className="content">{JSON.stringify(msg, null, `\t`)}</div>*/}
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
                        else{
                            return(
                                <div className="outgoing_attachment_cont_outer" key={msg._id}>
                                    <input type="checkbox" className="include_message_checkbox" name={`includeImageMessage-${msg._id}`} style={{transform:isMessageSelectionActive?"scale(1, 1)":"scale(0, 1)"}} onChange={() => dispatch(setSelectedMessages(msg))} />
                                    <div className="outgoing_attachment_cont" onMouseEnter={() => onMouseEnterHandler(msg._id)}>
                                        <div className="content">
                                            {
                                                msg.attachment?.[0].contentType === "image" &&
                                                    <ImageWithFallback
                                                        src={`${msg?.attachment?.[0].contentMessage.split("/upload")[0]}/upload/w_200,h_200${msg?.attachment?.[0].contentMessage.split("/upload")[1]}`}
                                                        alt={msg?.attachment?.[0].contentMessage}
                                                        width={170}
                                                        height={170}
                                                     />
                                            }
                                            {
                                                msg.attachment?.[0].contentType === "audio" &&
                                                    <audio controls >
                                                        <source src={`http://localhost:8000/${msg.attachment[0].contentMessage}`} type="audio/mpeg" />
                                                        Your browser does not support the audio element.
                                                    </audio>
                                            }
                                            {
                                                msg.attachment?.[0].contentType === "video" &&
                                                    <video width={170} height={170} controls >
                                                        <source src={`http://localhost:8000/${msg.attachment[0].contentMessage}`} type="video/mp4" />
                                                        <source src={`http://localhost:8000/${msg.attachment[0].contentMessage}`} type="video/ogg" />
                                                        Your browser does not support the video element.
                                                    </video>
                                            }
                                            {
                                                msg.attachment?.[0].contentType === "file" &&
                                                    (msg.attachment?.[0].contentMessage.split(".")[msg.attachment?.[0].contentMessage.split(".").length-1] === "pdf" ||
                                                    msg.attachment?.[0].contentMessage.split(".")[msg.attachment?.[0].contentMessage.split(".").length-1] === "doc" ||
                                                    msg.attachment?.[0].contentMessage.split(".")[msg.attachment?.[0].contentMessage.split(".").length-1] === "docx" ||
                                                    msg.attachment?.[0].contentMessage.split(".")[msg.attachment?.[0].contentMessage.split(".").length-1] === "xls" ||
                                                    msg.attachment?.[0].contentMessage.split(".")[msg.attachment?.[0].contentMessage.split(".").length-1] === "xlsx")  &&
                                                    <div className="file_cont">
                                                        <div className="file_icon"><FiFile /></div>
                                                        <div className="file_name">
                                                            <div className="name">
                                                                {msg.attachment?.[0].contentMessage.split("\\")[1]}
                                                            </div>
                                                            <div className="ext">
                                                                {msg.attachment?.[0].contentMessage.split(".")[msg.attachment?.[0].contentMessage.split(".").length-1]} file
                                                            </div>
                                                        </div>
                                                            <a className="download_link" href={`http://localhost:8000/${msg.attachment[0].contentMessage}`}><BiDownload className="download_icon" /></a>
                                                    </div>
                                            }
                                        </div>
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
                        if (msg.content) {
                            return(
                                <div className="incomming_message_cont_outer" key={msg._id}>
                                    <input type="checkbox" className="include_message_checkbox" name={`includeMessage-${msg._id}`} style={{transform:isMessageSelectionActive?"scale(1, 1)":"scale(0, 1)"}} onChange={() => dispatch(setSelectedMessages(msg))} />
                                    <div className="incomming_message_cont" onMouseEnter={() => onMouseEnterHandler(msg._id)}>
                                        <div className="content">{msg?.content?.contentMessage}</div>
                                        <div className="date"
                                        style={{display:selectedMessage === msg._id ? "none" : "block"}}
                                        >{msg.createdAt?.toString().split("T")[0]}</div>
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
                        else{
                            return(
                                <div className="incomming_attachment_cont_outer" key={msg._id}>
                                    <input type="checkbox" className="include_message_checkbox" name={`includeMessage-${msg._id}`} style={{transform:isMessageSelectionActive?"scale(1, 1)":"scale(0, 1)"}} onChange={() => dispatch(setSelectedMessages(msg))} />
                                    <div className="incomming_attachment_cont" onMouseEnter={() => onMouseEnterHandler(msg._id)}>
                                        <div className="content">
                                            {
                                                msg.attachment?.[0].contentType === "image" &&
                                                    <ImageWithFallback
                                                        src={`${msg?.attachment?.[0].contentMessage.split("/upload")[0]}/upload/w_200,h_200${msg?.attachment?.[0].contentMessage.split("/upload")[1]}`}
                                                        alt={msg?.attachment?.[0].contentMessage}
                                                        width={170}
                                                        height={170}
                                                     />
                                            }
                                            {
                                                msg.attachment?.[0].contentType === "audio" &&
                                                    <audio controls >
                                                        <source src={`http://localhost:8000/${msg.attachment[0].contentMessage}`} type="audio/mpeg" />
                                                        Your browser does not support the audio element.
                                                    </audio>
                                            }
                                            {
                                                msg.attachment?.[0].contentType === "video" &&
                                                    <video width={170} height={170} controls >
                                                        <source src={`http://localhost:8000/${msg.attachment[0].contentMessage}`} type="video/mp4" />
                                                        <source src={`http://localhost:8000/${msg.attachment[0].contentMessage}`} type="video/ogg" />
                                                        Your browser does not support the video element.
                                                    </video>
                                            }
                                            {
                                                msg.attachment?.[0].contentType === "file" &&
                                                    (msg.attachment?.[0].contentMessage.split(".")[msg.attachment?.[0].contentMessage.split(".").length-1] === "pdf" ||
                                                    msg.attachment?.[0].contentMessage.split(".")[msg.attachment?.[0].contentMessage.split(".").length-1] === "doc" ||
                                                    msg.attachment?.[0].contentMessage.split(".")[msg.attachment?.[0].contentMessage.split(".").length-1] === "docx" ||
                                                    msg.attachment?.[0].contentMessage.split(".")[msg.attachment?.[0].contentMessage.split(".").length-1] === "xls" ||
                                                    msg.attachment?.[0].contentMessage.split(".")[msg.attachment?.[0].contentMessage.split(".").length-1] === "xlsx")  &&
                                                    <div className="file_cont">
                                                        <div className="file_icon"><FiFile /></div>
                                                        <div className="file_name">
                                                            <div className="name">
                                                                {msg.attachment?.[0].contentMessage.split("\\")[1]}
                                                            </div>
                                                            <div className="ext">
                                                                {msg.attachment?.[0].contentMessage.split(".")[msg.attachment?.[0].contentMessage.split(".").length-1]} file
                                                            </div>
                                                        </div>
                                                        {/*<div className="download_icon">*/}
                                                            <a className="download_link" href={`http://localhost:8000/${msg.attachment[0].contentMessage}`}><BiDownload className="download_icon" /></a>
                                                        {/*</div>*/}
                                                    </div>
                                            }
                                        </div>
                                        <div className="date"
                                        style={{display:selectedMessage === msg._id ? "none" : "block"}}
                                        >{msg.createdAt?.toString().split("T")[0]}</div>
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