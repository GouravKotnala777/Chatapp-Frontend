import "../styles/components/user_list.scss";
import { useEffect, useState } from "react";
import { PRIMARY_LIGHT } from "../constants/constants";
import { UserTypes } from "../types/types";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MiscReducerTypes, setSelectedNavigation } from "../redux/reducers/navigationReducer";
import { useDispatch, useSelector } from "react-redux";
import UserListItem from "./UserLIstItem";
import { BiRightArrowAlt } from "react-icons/bi";
import { myFriends, updateChat } from "../redux/api/api";


const Contacts = () => {
    //const [selectedUser, setSelectedUser] = useState<Pick<UserTypes, "_id"|"name"|"email">>({_id:"", name:"", email:""});
    const [myAllFriends, setMyAllFriends] = useState<UserTypes[]>([]);
    const [usersToAddInGroup, setUsersToAddInGroup] = useState<string[]>([]);
    const {selectedChat} = useSelector((state:{miscReducer:MiscReducerTypes}) => state.miscReducer);
    const dispatch = useDispatch();

    const goBackHandler = () => {
        dispatch(setSelectedNavigation("Chats"));
    };

    const onSelectUserHandler = (user:Pick<UserTypes, "_id"|"name"|"email">) => {
        //setSelectedUser(user);
        //console.log(selectedUser);


        if (usersToAddInGroup.includes(user._id)) {
            const userFilterResult = usersToAddInGroup.filter((userId) => userId !== user._id);
            setUsersToAddInGroup(userFilterResult);
            console.log("HHHHHHHHHHHHHHHHHH");
            
        }
        else{
            setUsersToAddInGroup([...usersToAddInGroup, user._id]);
            console.log("NNNNNNNNNNNNNNNNNN");
        }
        //console.log(":::::::::::::::::::::::");
        //console.log(usersToAddInGroup);
        //console.log(":::::::::::::::::::::::");
        
    };

    const addRemoveUserHandler = async() => {
        const selectedUserArray = await updateChat({chatID:selectedChat?._id as string, members:usersToAddInGroup});

        if (selectedUserArray.success === true) {
            setSelectedNavigation("Chats");
        }
        else{
            console.log("PPATA NAHI USER ADD KYO NAHI HUA");
        }
    }

    const getMyAllFriendsHandler = async() => {
        const getAllFriends = await myFriends();

        if (getAllFriends.success === true) {
            setMyAllFriends(getAllFriends.message as UserTypes[]);
            console.log("All friends got");
        }
        if (getAllFriends.success === false) {
            console.log("Error aa gaya");
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
            {/*<pre style={{color:"white"}}>{JSON.stringify(usersToAddInGroup, null, `\t`)}</pre>*/}

            <div className="heading">
                <button className="back_icon" onClick={goBackHandler}><FaArrowLeftLong /></button>
                <div className="value">Contacts</div>
            </div>
            <div className="users_list">
                <div className="users_list_scrollable">
                    {
                        myAllFriends.map((user) => (
                            <div key={user._id} className="user_cont"
                                onClick={() => onSelectUserHandler(user)} style={{
                                background:usersToAddInGroup.includes(user._id) ?
                                    PRIMARY_LIGHT
                                    :
                                    "unset"
                            }}>
                                <UserListItem userID={user._id} userName={user.name} date="" lastMessage="" isSelected={usersToAddInGroup.includes(user._id)} />
                            </div>
                        ))
                    }
                </div>
            </div>
            <button className="submit_btn" style={{
                transform:usersToAddInGroup.length !== 0?"scale(1)":"scale(0)"
            }}
                onClick={addRemoveUserHandler}>
                <BiRightArrowAlt className="BiRightArrowAlt" />
            </button>
        </div>
    )
};

export default Contacts;