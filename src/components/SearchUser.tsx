import "../styles/components/search_user.scss";
import { setSelectedNavigation } from "../redux/reducers/navigationReducer";
import { Input, TopBackBtn } from "../utils/Utill";
import UserListItem from "./UserLIstItem";
import { ChangeEvent, useEffect, useState } from "react";
import { UserTypes } from "../types/types";
import { PRIMARY_LIGHT } from "../constants/constants";
import { BiRightArrowAlt } from "react-icons/bi";
import { searchUser, sendFriendRequest } from "../redux/api/api";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";


const SearchUser = ({friendRequests, user}:{friendRequests:{_id:string; from:{_id:string; name:string; email:string;}; to:{_id:string; name:string; email:string;}; date:Date;}[]; user:UserTypes|null;}) => {
    const [usersToAddInGroup, setUsersToAddInGroup] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchedUserResult, setSearchedUserResult] = useState<UserTypes[]>([]);
    const dispatch = useDispatch();

    const addRemoveUserHandler = async() => {
        const selectedUserArray = await sendFriendRequest({searchedUserIDArray:usersToAddInGroup});

        if (selectedUserArray.success === true) {
            dispatch(setSelectedNavigation("Chats"));
            setUsersToAddInGroup([]);
            toast.success("Request has been sended", {
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
    const onSelectUserHandler = (usr:Pick<UserTypes, "_id"|"name"|"email">) => {
        
        if (customCheck(usr) === undefined) {
            //console.log(`${item.to._id} === ${usr._id}`);
            if (usersToAddInGroup.includes(usr._id)) {
                const userFilterResult = usersToAddInGroup.filter((userId) => userId !== usr._id);
                setUsersToAddInGroup(userFilterResult);
                console.log(usersToAddInGroup);
                
            }
            else{
                setUsersToAddInGroup([...usersToAddInGroup, usr._id]);
            }
        }
        else{
            console.log("Ye nahi ho sakta");
        }
    };
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const customCheck = (usr:UserTypes|Pick<UserTypes, "_id"|"name"|"email">) => {
        for (const item of friendRequests) {
            if (item.from._id === user?._id) {
                if (item.to._id === usr._id) {
                    return false;
                }
            }
            else if (item.to._id === user?._id) {
                if (item.from._id === usr._id) {
                    return true;
                }
            }
            else{
                return undefined;
            }                                  
        }
    };

    useEffect(() => {
        const searchUserSetTimeOutResult = setTimeout(() => {
            if (searchQuery) {
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
            }
        }, 2000);

        return() => {clearTimeout(searchUserSetTimeOutResult)}
    }, [searchQuery]);

    return(
        <div className="search_user_cont">
            <TopBackBtn heading="Search user" />
            <div className="search_user_section">
            {/*<pre style={{color:"white"}}>{JSON.stringify(friendRequests, null, `\t`)}</pre>*/}
                <div className="search_inp_outer">
                    <Input onChangeHandler={onChangeHandler} biSearchID="biSearchIDForSearchUser" faArrowLeftLongID="faArrowLeftLongIDForSearchUser" inputID="inputIDForSearchUser" ioMdCloseID="ioMdCloseIDForSearchUser" />
                </div>
                <div className="searched_users_list">
                    <div className="searched_users_list_scrollable">
                        {
                            searchedUserResult.map((usr) => (
                                <div key={usr._id} className="searched_user_cont"
                                    onClick={() => onSelectUserHandler(usr)} style={{
                                    background:usersToAddInGroup.includes(usr._id) ?
                                        PRIMARY_LIGHT
                                        :
                                        "unset"
                                }}>
                                    <UserListItem userID={usr._id} userName={usr.name} date={[]} lastMessage="" isSelected={usersToAddInGroup.includes(usr._id)}
                                        isFRAlreadySent={customCheck(usr)}
                                    />
                                </div>
                            ))
                        }
                        {/*<pre style={{color:"white"}}>{JSON.stringify(friendRequests, null, `\t`)}</pre>*/}
                        {
                            //friendRequests.map((item) => (
                            //    <p style={{color:"white"}}>{item.from._id}--{user?._id}</p>
                            //))
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