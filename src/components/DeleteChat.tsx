import { FaArrowLeftLong } from "react-icons/fa6";
import "../styles/components/delete_chat.scss";
import { useDispatch, useSelector } from "react-redux";
import { MiscReducerTypes, setSelectedNavigation } from "../redux/reducers/navigationReducer";
import photo from "../../public/vite.svg";
import { Heading, Para } from "../utils/Utill";
import { GRAY_LIGHTER, PRIMARY_LIGHT } from "../constants/constants";
import { deleteChat } from "../redux/api/api";

const DeleteChat = () => {
    const {selectedChat} = useSelector((state:{miscReducer:MiscReducerTypes}) => state.miscReducer);
    const dispatch = useDispatch();

    const goBackHandler = () => {
        dispatch(setSelectedNavigation("Chats"));
    };

    const deleteChatHandler = async() => {
        const deleteChatRes = await deleteChat({chatID:selectedChat?._id as string});

        if (deleteChatRes.success === true) {
            console.log("------ deleteChatHandler DeleteChat.tsx");
            console.log(deleteChatRes);
            goBackHandler();
            console.log("------ deleteChatHandler DeleteChat.tsx");
        }
    }

    return(
        <div className="delete_chat_cont">
            {/*<pre>{JSON.stringify(selectedChat, null, `\t`)}</pre>*/}
            <div className="heading">
                <button className="back_icon" onClick={goBackHandler}><FaArrowLeftLong /></button>
                <div className="value">Contacts</div>
            </div>
            <div className="delete_chat">
                <div className="delete_chat_scrollable">
                    <div className="chat_img_cont">
                        <img src={photo} alt={photo} />
                    </div>
                    <div className="warning_cont">
                        <Heading value="Do you want to delete this chat" color={GRAY_LIGHTER} />
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