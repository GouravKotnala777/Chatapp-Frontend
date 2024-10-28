import { FaArrowLeftLong } from "react-icons/fa6";
import "../styles/components/received_friend_requests.scss";
import { setSelectedNavigation } from "../redux/reducers/navigationReducer";
import { useDispatch } from "react-redux";
import { FriendRequestStatusType, UserTypes } from "../types/types";
import { useEffect, useState } from "react";
import { PRIMARY_LIGHT } from "../constants/constants";
import UserListItem from "./UserLIstItem";
import { CgAdd, CgRemove } from "react-icons/cg";
import { allReceivedFriendRequests, replyFriendRequest } from "../redux/api/api";



const ReceivedFriendRequests = () => {
    const [singleSelectedUser, setSingleSelectedUser] = useState<Pick<UserTypes, "_id"|"name"|"email">>({_id:"", name:"", email:""});
    const [friendRequests, setFriendRequests] = useState<{_id:string; name:string; email:string; date:Date;}[]>([]);
    const dispatch = useDispatch();



    const goBackHandler = () => {
        dispatch(setSelectedNavigation("Chats"));
    };
    const replyFriendRequestHandler = async({friendRequestID, status}:{friendRequestID:string; status:FriendRequestStatusType;}) => {
        const reply = await replyFriendRequest({friendRequestID, status});

        if (reply.success === true) {
            console.log("----- replyFriendRequestHandler RequestFriendRequest.tsx");
            console.log(reply);
            console.log("----- replyFriendRequestHandler RequestFriendRequest.tsx");
        }
    };
    const onSelectUserHandler = (user:Pick<UserTypes, "_id"|"name"|"email">) => {
        setSingleSelectedUser(user);
    };

    useEffect(() => {
        const getAllReceivedFriendRequests = allReceivedFriendRequests();

        getAllReceivedFriendRequests.then((data) => {
            console.log("----- allReceivedFriendRequests");
            console.log(data);
            if (data.success === true) {
                setFriendRequests(data.message as {_id:string; name:string; email:string; date:Date;}[]);
            }
            console.log("----- allReceivedFriendRequests");
        }).catch((err) => {
            console.log("----- allReceivedFriendRequests");
            console.log(err);
            console.log("----- allReceivedFriendRequests");
        });
    }, []);

    return(
        <div className="reveived_friend_requests_cont">
            <div className="heading">
                <button className="back_icon" onClick={goBackHandler}><FaArrowLeftLong /></button>
                <div className="value">All friend requests</div>
            </div>
            <div className="reveived_friend_requests">
                <div className="reveived_friend_requests_scrollable">
                    {
                        friendRequests.map((user) => (
                            <div key={user._id} className="user_cont"
                                onClick={() => onSelectUserHandler(user)}
                                style={{
                                    background:singleSelectedUser._id === user._id ?
                                            PRIMARY_LIGHT
                                            :
                                            "unset"
                                }}>
                                <UserListItem userID={user._id} userName={user.name} date={[CgRemove, CgAdd]} replyFriendRequestHandler={replyFriendRequestHandler} lastMessage={user.date.toString().split("T")[0]} isSelected={singleSelectedUser._id === user._id} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
};

export default ReceivedFriendRequests;