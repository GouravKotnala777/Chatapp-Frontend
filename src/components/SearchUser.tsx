import "../styles/components/search_user.scss";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setSelectedNavigation } from "../redux/reducers/navigationReducer";
import { Input } from "../utils/Utill";
import UserListItem from "./UserLIstItem";
import { ChangeEvent, useEffect, useState } from "react";
import { UserTypes } from "../types/types";
import { PRIMARY_LIGHT } from "../constants/constants";
import { BiRightArrowAlt } from "react-icons/bi";
import { searchUser, sendFriendRequest } from "../redux/api/api";


const SearchUser = () => {
    const [usersToAddInGroup, setUsersToAddInGroup] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchedUserResult, setSearchedUserResult] = useState<UserTypes[]>([]);
    const dispatch = useDispatch();

    const goBackHandler = () => {
        dispatch(setSelectedNavigation("Chats"));
    };
    const addRemoveUserHandler = async() => {
        const selectedUserArray = await sendFriendRequest({searchedUserIDArray:usersToAddInGroup});

        if (selectedUserArray.success === true) {
            setSelectedNavigation("Chats");
        }
        else{
            console.log("PPATA NAHI USER ADD KYO NAHI HUA");
        }
    }
    const onSelectUserHandler = (user:Pick<UserTypes, "_id"|"name"|"email">) => {
        if (usersToAddInGroup.includes(user._id)) {
            const userFilterResult = usersToAddInGroup.filter((userId) => userId !== user._id);
            setUsersToAddInGroup(userFilterResult);
            console.log("HHHHHHHHHHHHHHHHHH");
            console.log(usersToAddInGroup);
            
        }
        else{
            setUsersToAddInGroup([...usersToAddInGroup, user._id]);
            console.log("NNNNNNNNNNNNNNNNNN");
        }
    };
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        const searchUserSetTimeOutResult = setTimeout(() => {
            const searchedUser = searchUser({searchQuery});
    
            searchedUser.then((data) => {
                console.log("------ SearchUser.tsx");
                console.log(data);
                setSearchedUserResult(data.message as UserTypes[]);
                console.log("------ SearchUser.tsx");
            })
            .catch((err) => {
                console.log("------ SearchUser.tsx");
                console.log(err);
                console.log("------ SearchUser.tsx");
            })
        }, 2000);

        return() => {clearTimeout(searchUserSetTimeOutResult)}
    }, [searchQuery]);

    return(
        <div className="search_user_cont">
            <div className="search_user_section_header">
                <button className="back_btn" onClick={goBackHandler}><FaArrowLeftLong className="FaArrowLeftLong" /></button>
                <div className="heading">Search user</div>
            </div>
            <div className="search_user_section">
                <div className="search_inp_outer">
                    <Input onChangeHandler={onChangeHandler} biSearchID="biSearchIDForSearchUser" faArrowLeftLongID="faArrowLeftLongIDForSearchUser" inputID="inputIDForSearchUser" ioMdCloseID="ioMdCloseIDForSearchUser" />
                </div>
                <div className="searched_users_list">
                    <div className="searched_users_list_scrollable">
                        {
                            searchedUserResult.map((user) => (
                                <div key={user._id} className="searched_user_cont"
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

export default SearchUser;