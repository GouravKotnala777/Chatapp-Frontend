import "../styles/pages/chat_info.scss";
import photo from "../../public/vite.svg";
import UserListItem from "../components/UserLIstItem";
import { ChatTypesPopulated, NaviagationTypes, UserTypes } from "../types/types";
import { Dispatch, SetStateAction } from "react";
import { PRIMARY_LIGHT } from "../constants/constants";
import { TopBackBtn } from "../utils/Utill";

const ChatInfo = ({selectedChat, singleSelectedUser, setSingleSelectedUser, selectedNavigation}:{selectedChat:ChatTypesPopulated; singleSelectedUser:Pick<UserTypes, "_id" | "name" | "email">; setSingleSelectedUser:Dispatch<SetStateAction<Pick<UserTypes, "_id" | "name" | "email">>>; selectedNavigation:NaviagationTypes;}) => {


    return(
        <div className="chat_info_bg">
            <TopBackBtn heading="Chat info" />
            <div className="dp_cont">
                <img src={photo} alt={photo} />
            </div>
            <div className="chat_name_cont">
            <div className="heading">Chat Name</div>
                sdasdasdasdsa
            </div>
            <div className="chat_description_cont">
                <div className="heading">Description</div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur perferendis quidem cupiditate voluptatem debitis iste neque reiciendis, necessitatibus et aut hic veritatis, molestiae, tempore laboriosam. Eveniet ipsum placeat unde provident!
            </div>
            <div className="members_list_cont">
                <div className="heading">Members</div>
                {/*<pre>{JSON.stringify(singleSelectedUser, null, `\t`)}</pre>*/}
                {
                    selectedChat.members.map((member) => (
                        <div className="single_member_outer" style={{
                            background:singleSelectedUser._id === member._id ?
                                            PRIMARY_LIGHT
                                            :
                                            "unset"
                        }} onClick={() => setSingleSelectedUser(member)}>
                            <UserListItem optionsArray={["Start chat", "User info", "Remove members"]} selectedNavigation={selectedNavigation} isSelected={member._id === singleSelectedUser._id} userID={member._id} userName={member.name} date={"online"} lastMessage="asdasda" />
                        </div>
                    ))
                }
            </div>
            <div className="leave_chat">
                leave from this chat!
            </div>
        </div>
    )
};

export default ChatInfo;