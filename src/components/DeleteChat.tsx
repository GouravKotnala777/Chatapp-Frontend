import "../styles/components/delete_chat.scss";
import { useDispatch, useSelector } from "react-redux";
import { MiscReducerTypes, setSelectedNavigation } from "../redux/reducers/navigationReducer";
import photo from "../../public/vite.svg";
import { Heading, Para, TopBackBtn } from "../utils/Utill";
import { GRAY_LIGHTER, PRIMARY_LIGHT } from "../constants/constants";
import { deleteChat, removeFriend } from "../redux/api/api";

const DeleteChat = ({singleSelectedUser}:{singleSelectedUser:string;}) => {
    const {selectedChat, selectedNavigation} = useSelector((state:{miscReducer:MiscReducerTypes}) => state.miscReducer);
    const dispatch = useDispatch();

    const goBackHandler = () => {
        dispatch(setSelectedNavigation("Chats"));
    };

    const deleteChatHandler = async() => {
        
        if (selectedNavigation === "Delete chat") {
            const deleteChatRes = await deleteChat({chatID:selectedChat?._id as string});
            if (deleteChatRes.success === true) {
                console.log("------ deleteChatHandler DeleteChat.tsx");
                console.log(deleteChatRes);
                goBackHandler();
                console.log("------ deleteChatHandler DeleteChat.tsx");
            }
        }
        else if (selectedNavigation === "Delete freind"){
            const removeFriendRes = await removeFriend({friendUserID:singleSelectedUser});
            if (removeFriendRes.success === true) {
                console.log("------ deleteChatHandler DeleteChat.tsx");
                console.log(removeFriendRes);
                goBackHandler();
                console.log("------ deleteChatHandler DeleteChat.tsx");
            }
        }

    }

    return(
        <div className="delete_chat_cont">
            {/*<pre style={{color:"white"}}>{JSON.stringify(selectedChat, null, `\t`)}</pre>
            <pre style={{color:"white"}}>{JSON.stringify(selectedChat, null, `\t`)}</pre>*/}
            <TopBackBtn heading={selectedNavigation === "Delete chat" ? "Delete Chat" : "Remove friend"} />
            <div className="delete_chat">
                <div className="delete_chat_scrollable">
                    <div className="chat_img_cont">
                        <img src={photo} alt={photo} />
                    </div>
                    <div className="warning_cont">
                        <Heading value={`Do you want to ${selectedNavigation === "Delete chat" ? "delete this chat" : "remove this friend"}`} color={GRAY_LIGHTER} />
                        <Para value={selectedChat?.chatName as string} color={PRIMARY_LIGHT} fontSize="0.8rem" margin="0 auto" />
                        <div className="btns_cont">
                            <button className="cancel_btn" onClick={goBackHandler}>No, Don't</button>
                            <button className="delete_btn" onClick={deleteChatHandler}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DeleteChat;