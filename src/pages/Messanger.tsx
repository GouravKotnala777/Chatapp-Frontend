import "../styles/pages/messanger.scss";
import { FaRegLaughBeam } from "react-icons/fa";
import ChatListItem from "../components/chatListItem";
import Messages from "../components/Messages";
import { FaCamera, FaPlus } from "react-icons/fa6";
import { MdKeyboardVoice } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { BiDotsVertical, BiLeftArrow } from "react-icons/bi";
import { ChatTypes, ContentMessageType, DialogParentTypes, MessageTypes, MessageTypesPopulated, NaviagationTypes, UserTypes } from "../types/types";
import { Dispatch, SetStateAction, useState } from "react";
import MessageInput from "../components/MessageInput";
import { useDispatch } from "react-redux";
import { setSelectedNavigation } from "../redux/reducers/navigationReducer";
import { sendAttachment } from "../redux/api/api";


const Messanger = ({selectedChat, setIsMessangerForMobileActive,
    refresh, setRefresh, messageInp, setMessageInp, messageType, setMessageType, messageArray, setMessageArray, singleMessage, setSingleMessage, singleSelectedUser, setSingleSelectedUser,
    isDeleteForMeClicked, isDeleteForAllClicked, setIsDeleteForMeClicked, setIsDeleteForAllClicked, isMessageSelectionActive,
    selectedMessages, setIsDialogOpen, setDialogParent, selectedNavigation
}:{selectedChat:ChatTypes; setIsMessangerForMobileActive:Dispatch<SetStateAction<boolean>>;
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

    isDeleteForMeClicked:boolean;
    setIsDeleteForMeClicked:Dispatch<SetStateAction<boolean>>;
    isDeleteForAllClicked:boolean;
    setIsDeleteForAllClicked:Dispatch<SetStateAction<boolean>>;
    isMessageSelectionActive:boolean;
    selectedMessages:MessageTypesPopulated[];
    setIsDialogOpen:Dispatch<SetStateAction<boolean>>;
    setDialogParent:Dispatch<SetStateAction<DialogParentTypes>>;
    selectedNavigation:NaviagationTypes;
}) => {
    const dispatch = useDispatch();
    const [isAttachmentOpen, setIsAttachmentOpen] = useState<boolean>(false);



    return(
        <div className="messagenger_mobile">
            <div className="upper_part">
                <BiLeftArrow className="BiLeftArrow" onClick={() => setIsMessangerForMobileActive(false)} />



                <div className="single_chat_outer" onClick={() => dispatch(setSelectedNavigation("Chat info"))}>
                    <ChatListItem chatName={selectedChat?.chatName as string} lastMessage={`last seen today at ${selectedChat?.createdAt.toString().split("T")[1].split(".")[0]} am`} iconsArray={[FaCamera, IoVideocam , BiDotsVertical]} />
                </div>
            </div>
            <div className="middle_part">
                <Messages messageArray={messageArray} 
                    isMessageSelectionActive={isMessageSelectionActive}
                    selectedMessages={selectedMessages}
                    setIsDialogOpen={setIsDialogOpen}
                    isDeleteForMeClicked={isDeleteForMeClicked}
                    setIsDeleteForMeClicked={setIsDeleteForMeClicked}
                    isDeleteForAllClicked={isDeleteForAllClicked}
                    setIsDeleteForAllClicked={setIsDeleteForAllClicked}
                    

                    setMessageArray={setMessageArray}
                    setDialogParent={setDialogParent}
                    selectedNavigation={selectedNavigation}
                    selectedChat={selectedChat}
                />
            </div>
            <div className="lower_part">
                <div className="icon"><FaRegLaughBeam /></div>
                <div className="icon" onClick={() => setIsAttachmentOpen(!isAttachmentOpen)}>
                    <FaPlus />
                    <div className="attachment_dialog_menu" style={{zIndex:isAttachmentOpen?"22":"-1"}}>
                        <div className="attachment_menu_cont" style={{transform:isAttachmentOpen?`scale(1,1)`:`scale(1,0)`}}>
                            {
                                [{heading:"Image", ext:".jpg, .jpeg, .png"}, {heading:"Video", ext:"video/*"}, {heading:"Audio", ext:"audio/*"}, {heading:"File", ext:".pdf, .doc, .docx, .xls, .xlsx, .txt"}, {heading:"Archives", ext:".zip, .rar, .7z"}].map(item => (
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
                                                        setMessageArray((prev) => [...prev, (resolve.message as MessageTypesPopulated)]);
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
                    <MessageInput 
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
                    />
                </div>
                <div className="icon"><MdKeyboardVoice /></div>
            </div>
        </div>
    )
};

export default Messanger;