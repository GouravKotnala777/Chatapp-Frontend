import { useDispatch, useSelector } from "react-redux";
import "../styles/components/messages.scss";
import { MessageTypesPopulated } from "../types/types";
import { LoginUserReducerTypes } from "../redux/reducers/loginUserReducer";
import { useEffect, useRef, useState } from "react";
import { BiDownArrow } from "react-icons/bi";
import { SpreadOptions } from "../utils/Utill";
import { FcCancel } from "react-icons/fc";
import { CgRemove } from "react-icons/cg";
import { setIsMessageSelectionActive, setSelectedMessages } from "../redux/reducers/navigationReducer";
//import { Dispatch, SetStateAction } from "react";

const Messages = ({messageArray, isMessageSelectionActive, selectedMessages}:{messageArray:MessageTypesPopulated[]|[]; isMessageSelectionActive:boolean; selectedMessages:MessageTypesPopulated[];}) => {
    const {user} = useSelector((state:{loginUserReducer:LoginUserReducerTypes}) => state.loginUserReducer);
    const [selectedMessage, setSelectedMessage] = useState<string>("");
    const messageEndRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    //const [] = useDeleteMessage // isse banana hai!
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
    //const deleteMessagesHandler = () => {
    //    try {
            
    //    } catch (error) {
    //        console.log(error);
    //    }
    //};

    useEffect(() => {
        scrollToBottomHandler();
    }, [messageArray]);

    return(
        <div className="messages_cont">
            <pre style={{color:"white"}}>{JSON.stringify(selectedMessages, null, `\t`)}</pre>
            {
                messageArray&&typeof messageArray === "object"&&messageArray.length!==0&&messageArray.map((msg) => {
                    if (msg.sender === user?._id) {
                        return(
                            <div className="outgoing_message_cont_outer">
                                <input type="checkbox" className="include_message_checkbox" name="includeMessage" style={{transform:isMessageSelectionActive?"scale(1, 1)":"scale(0, 1)"}} onChange={() => dispatch(setSelectedMessages(msg))} />
                                <div className="outgoing_message_cont" onMouseEnter={() => onMouseEnterHandler(msg._id)}>
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
                    else if(msg.sender === "default"){
                        return(
                            <div className="default_message_cont" onMouseEnter={() => onMouseEnterHandler(msg._id)}>
                                {/*<div className="content">{msg.content.conteLonMouseLeaventMessage}</div>*/}
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
                            <div className="incomming_message_cont_outer">
                                <input type="checkbox" className="include_message_checkbox" name="includeMessage" style={{transform:isMessageSelectionActive?"scale(1, 1)":"scale(0, 1)"}} onChange={() => dispatch(setSelectedMessages(msg))} />
                                <div className="incomming_message_cont" onMouseEnter={() => onMouseEnterHandler(msg._id)}>
                                    <div className="content">{msg.content.contentMessage}</div>
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
                            </div>
                        )
                    }
                })
            }

            <div className="cancel_message_selection_cont" style={{display:isMessageSelectionActive?"flex":"none"}}>
                <div className="icon" onClick={cancelMessageSelectionHandler}><FcCancel className="FcCancel" /></div>
                <div className="icon"><CgRemove className="CgRemove" /></div>
            </div>

            <div className="message_end_anchor" ref={messageEndRef}></div>
        </div>
    )
};

export default Messages;