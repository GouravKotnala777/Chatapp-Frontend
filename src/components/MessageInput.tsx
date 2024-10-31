import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import "../styles/components/message_input.scss";
import { createMessage } from "../redux/api/api";
import { ContentMessageType, MessageTypes, MessageTypesPopulated, UserTypes } from "../types/types";
import { useSelector } from "react-redux";
import { LoginUserReducerTypes } from "../redux/reducers/loginUserReducer";
import { MiscReducerTypes } from "../redux/reducers/navigationReducer";
import { BiSend } from "react-icons/bi";

const MessageInput = ({messageInp, setMessageInp, messageType, setMessageArray,
    // singleSelectedUser, setSingleSelectedUser, setMessageType, messageArray, singleMessage, setSingleMessage,
    refresh, setRefresh}:{
    singleSelectedUser:Pick<UserTypes, "_id"|"name"|"email">;
    setSingleSelectedUser:Dispatch<SetStateAction<Pick<UserTypes, "_id"|"name"|"email">>>;
    messageType:ContentMessageType;
    setMessageType:Dispatch<SetStateAction<ContentMessageType>>;
    messageInp:string;
    setMessageInp:Dispatch<SetStateAction<string>>;
    messageArray:MessageTypesPopulated[];
    setMessageArray:Dispatch<SetStateAction<MessageTypesPopulated[]>>;
    singleMessage:MessageTypes;
    setSingleMessage:Dispatch<SetStateAction<MessageTypes>>;
    refresh:boolean; setRefresh:Dispatch<SetStateAction<boolean>>;
}) => {
    const {user} = useSelector((state:{loginUserReducer:LoginUserReducerTypes}) => state.loginUserReducer);
    const {selectedChat} = useSelector((state:{miscReducer:MiscReducerTypes}) => state.miscReducer);
    const [isMessageInputAction, setIsMessageInputActive] = useState<boolean>(false);
    //const [attachment, setAttachment] = useState<string[]>([]);


    const messageInpChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setMessageInp(e.target.value)
    };

    const sendMessageHandler = async() => {
        const createdMessage = await createMessage({chatID:selectedChat?._id as string, sender:user?._id as string, messageType, messageStatus:"sent", content:messageInp, attachment:[]});

        if (createdMessage.success === true) {
            console.log("----- sendMessageHandler MessageInput.tsx");
            console.log(createdMessage.message);
            setMessageInp("");
            setMessageArray((prev) => [...prev, (createdMessage.message as MessageTypesPopulated)]);
            setRefresh(!refresh);
            console.log("----- sendMessageHandler MessageInput.tsx");
        }
    };

    useEffect(() => {
        if (messageInp?.trim() === "") {
            setIsMessageInputActive(false);            
        }
        else{
            setIsMessageInputActive(true);
        }
    }, [messageInp]);

    return(
        <div className="message_inp_cont">
            <input className="message_inp" type="text" name="message" placeholder="Message..." value={messageInp} onChange={(e) => messageInpChangeHandler(e)} />
            <button className="send_message_btn" style={{display:isMessageInputAction?"inline-block":"none"}} onClick={sendMessageHandler}><BiSend /></button>
        </div>
    )
};

export default MessageInput;