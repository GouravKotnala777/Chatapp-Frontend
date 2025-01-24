import "../styles/components/contacts.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PRIMARY_LIGHT } from "../constants/constants";
import { UserTypes } from "../types/types";
import { MiscReducerTypes, setIsMessageSelectionActive, setSelectedMessages, setSelectedNavigation } from "../redux/reducers/navigationReducer";
import { useDispatch, useSelector } from "react-redux";
import UserListItem from "./UserLIstItem";
import { BiRightArrowAlt } from "react-icons/bi";
import { forwardMessage, myFriends, updateChat } from "../redux/api/api";
import { TopBackBtn } from "../utils/Utill";


const Contacts = ({singleSelectedUser, setSingleSelectedUser, setIsStartChatClicked}:{
    singleSelectedUser:Pick<UserTypes, "_id"|"name"|"email">;
    setSingleSelectedUser:Dispatch<SetStateAction<Pick<UserTypes, "_id"|"name"|"email">>>;
    setIsStartChatClicked:Dispatch<SetStateAction<boolean>>;
}) => {
    const [myAllFriends, setMyAllFriends] = useState<UserTypes[]>([]);
    const [usersToAddInGroup, setUsersToAddInGroup] = useState<string[]>([]);
    const {selectedChat, selectedNavigation, selectedMessages} = useSelector((state:{miscReducer:MiscReducerTypes}) => state.miscReducer);
    const dispatch = useDispatch();


    const onSelectUserHandler = (user:Pick<UserTypes, "_id"|"name"|"email">) => {
        setSingleSelectedUser(user);
        if (usersToAddInGroup.includes(user._id)) {
            const userFilterResult = usersToAddInGroup.filter((userId) => userId !== user._id);
            setUsersToAddInGroup(userFilterResult);
            console.log("HHHHHHHHHHHHHHHHHH");
        }
        else{
            setUsersToAddInGroup([...usersToAddInGroup, user._id]);
            console.log("NNNNNNNNNNNNNNNNNN");
        }
    };

    const addRemoveUserHandler = async() => {
        const selectedUserArray = await updateChat({chatID:selectedChat?._id as string, members:usersToAddInGroup});

        if (selectedUserArray.success === true) {
            dispatch(setSelectedNavigation("Chats"));
        }
        else{
            console.log("PPATA NAHI USER ADD KYO NAHI HUA");
        }
    }

    const getMyAllFriendsHandler = async() => {
        const getAllFriends = await myFriends();

        if (getAllFriends.success === true) {
            setMyAllFriends(getAllFriends.jsonData as UserTypes[]);
            console.log("All friends got");
        }
        if (getAllFriends.success === false) {
            console.log("Error aa gaya");
        }
    };

    const forwardMessageHandler = async() => {
        try {
            
            const res = await forwardMessage({memberIDs:usersToAddInGroup, contentID:selectedMessages.map((msg) => msg?.content?._id).filter((item) => item !== undefined), attachment:selectedMessages.flatMap((msg) => msg.attachment?.[0]?._id).filter((item) => item !== undefined), messageType:"text", messageStatus:"sent", isForwarded:true});

            if (res.success === true) {
                console.log(res.message);
                dispatch(setIsMessageSelectionActive(false));
                dispatch(setSelectedNavigation("Chats"));
                dispatch(setSelectedMessages(null));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log(":::::::::::::::::::::::");
        console.log(usersToAddInGroup);
        console.log(":::::::::::::::::::::::");
    }, [usersToAddInGroup]);

    useEffect(() => {
        getMyAllFriendsHandler();
    }, []);

    return(
        <div className="user_list_cont">
            {/*<pre style={{color:"white"}}>{JSON.stringify(singleSelectedUser, null, `\t`)}</pre>
            <pre style={{color:"white"}}>{JSON.stringify(selectedChat, null, `\t`)}</pre>*/}
            <TopBackBtn heading="Contancts" />
            <div className="users_list">
                <div className="users_list_scrollable">
                    {
                        myAllFriends.map((user) => (
                            <div key={user._id} className="user_cont"
                                onClick={() => onSelectUserHandler(user)}
                                style={{
                                    background:(selectedNavigation === "Add members" || selectedNavigation === "Forward") ?
                                        usersToAddInGroup.includes(user._id) ?
                                            PRIMARY_LIGHT
                                            :
                                            "unset"
                                        :
                                        singleSelectedUser._id === user._id ?
                                            PRIMARY_LIGHT
                                            :
                                            "unset"
                                }}>
                                <UserListItem optionsArray={["Start chat", "Delete freind"]} selectedNavigation={selectedNavigation} userID={user._id} userName={user.name} date="Online" lastMessage="" isSelected={
                                    selectedNavigation === "Add members" ?
                                        usersToAddInGroup.includes(user._id)
                                        :
                                        singleSelectedUser._id === user._id
                                    }
                                    setIsStartChatClicked={setIsStartChatClicked}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>

            {
                selectedNavigation === "Add members" &&
                    <button className="submit_btn" style={{
                        transform:selectedNavigation === "Add members" && usersToAddInGroup.length !== 0?"scale(1)":"scale(0)"
                    }}
                        onClick={addRemoveUserHandler}>
                        <span className="selection_count">{usersToAddInGroup.length}</span> <BiRightArrowAlt className="BiRightArrowAlt" />
                    </button>
            }
            {
                selectedNavigation === "Forward" &&
                    <button className="submit_btn" style={{
                        transform:selectedNavigation === "Forward" && usersToAddInGroup.length !== 0?"scale(1)":"scale(0)"
                    }}
                        onClick={forwardMessageHandler}>
                        <span className="selection_count">{usersToAddInGroup.length}</span> <BiRightArrowAlt className="BiRightArrowAlt" />
                    </button>
            }
        </div>
    )
};

export default Contacts;