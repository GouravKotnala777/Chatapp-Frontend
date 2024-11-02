import { useSelector } from "react-redux";
import "../styles/components/messages.scss";
import { MessageTypesPopulated } from "../types/types";
import { LoginUserReducerTypes } from "../redux/reducers/loginUserReducer";
import { useEffect, useRef } from "react";
//import { Dispatch, SetStateAction } from "react";

const Messages = ({messageArray}:{messageArray:MessageTypesPopulated[]|[];}) => {
    const {user} = useSelector((state:{loginUserReducer:LoginUserReducerTypes}) => state.loginUserReducer);
    const messageEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottomHandler = () => {
        messageEndRef.current?.scrollIntoView({behavior:"smooth"});
    };

    useEffect(() => {
        scrollToBottomHandler();
    }, [messageArray]);

    return(
        <div className="messages_cont">
            {/*<pre style={{color:"white"}}>{JSON.stringify(user?.name, null, `\t`)}</pre>*/}
            {
                messageArray&&typeof messageArray === "object"&&messageArray.length!==0&&messageArray.map((msg) => {
                    if (msg.sender === user?._id) {
                        return(
                            <div className="outgoing_message_cont">
                                <div className="content">{msg.content.contentMessage}</div>
                                <div className="date">{msg.createdAt.toString().split("T")[0]}</div>
                            </div>
                        )
                    }
                    else if(msg.sender === "default"){
                        return(
                            <div className="default_message_cont">
                                <div className="content">{msg.content.contentMessage}</div>
                                <div className="date">{msg.createdAt.toString().split("T")[0]}</div>
                            </div>
                        )
                    }
                    else{
                        return(
                            <div className="incomming_message_cont">
                                <div className="content">{msg.content.contentMessage}</div>
                                <div className="date">{msg.createdAt.toString().split("T")[0]}</div>
                            </div>
                        )
                    }
                })
            }

            <div className="message_end_anchor" ref={messageEndRef}></div>
        </div>
    )
};

export default Messages;