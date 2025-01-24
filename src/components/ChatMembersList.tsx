import "../styles/components/contacts.scss";
import { useEffect, useState } from "react";
import { PRIMARY_LIGHT } from "../constants/constants";
import { ChatTypesPopulated, UserTypes } from "../types/types";
import { MiscReducerTypes, setSelectedNavigation } from "../redux/reducers/navigationReducer";
import { useDispatch, useSelector } from "react-redux";
import UserListItem from "./UserLIstItem";
import { BiRightArrowAlt } from "react-icons/bi";
import { removeMembersFromChat } from "../redux/api/api";
import { TopBackBtn } from "../utils/Utill";
import toast from "react-hot-toast";


const ChatMembersList = () => {
    const [usersToAddInGroup, setUsersToAddInGroup] = useState<string[]>([]);
    const {selectedChat, selectedNavigation} = useSelector((state:{miscReducer:MiscReducerTypes}) => state.miscReducer);
    const dispatch = useDispatch();

    const onSelectUserHandler = (user:Pick<UserTypes, "_id"|"name"|"email">) => {
        if (usersToAddInGroup.includes(user._id)) {
            const userFilterResult = usersToAddInGroup.filter((userId) => userId !== user._id);
            setUsersToAddInGroup(userFilterResult);            
        }
        else{
            setUsersToAddInGroup([...usersToAddInGroup, user._id]);
        }
        
    };

    const removeMembersHandler = async() => {
        const selectedUserArray = await removeMembersFromChat({chatID:selectedChat?._id as string, members:usersToAddInGroup});

        if (selectedUserArray.success === true) {
            dispatch(setSelectedNavigation("Chats"));
            toast.success("Group members updated", {
                duration:2000,
                position:"top-center"
            });
        }
        else{
            toast.error(selectedUserArray.message.toString(), {
                duration:2000,
                position:"top-center"
            });
            console.log("PPATA NAHI USER ADD KYO NAHI HUA");
        }
    }

    useEffect(() => {
        console.log(":::::::::::::::::::::::");
        console.log(usersToAddInGroup);
        console.log(":::::::::::::::::::::::");
    }, [usersToAddInGroup]);

    return(
        <div className="user_list_cont">
            {/*<pre style={{color:"white"}}>{JSON.stringify((selectedChat as ChatTypesPopulated)?.members, null, `\t`)}</pre>*/}

            <TopBackBtn heading="Chat members"/>
            <div className="users_list">
                <div className="users_list_scrollable">
                    {
                        (selectedChat as ChatTypesPopulated)?.members.map((user) => (
                            <div key={user._id} className="user_cont"
                                onClick={() => onSelectUserHandler(user)} style={{
                                background:usersToAddInGroup.includes(user._id) ?
                                    PRIMARY_LIGHT
                                    :
                                    "unset"
                            }}>
                                <UserListItem selectedNavigation={selectedNavigation} userID={user._id} userName={user.name} date="" lastMessage="" isSelected={usersToAddInGroup.includes(user._id)} />
                            </div>
                        ))
                    }
                </div>
            </div>
            <button className="submit_btn" style={{
                transform:usersToAddInGroup.length !== 0?"scale(1)":"scale(0)"
            }}
                onClick={removeMembersHandler}>
                <BiRightArrowAlt className="BiRightArrowAlt" />
            </button>
        </div>
    )
};

export default ChatMembersList;