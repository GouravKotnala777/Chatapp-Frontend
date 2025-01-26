import "../styles/components/received_friend_requests.scss";
import { FriendRequestStatusType, NotificationStatusTypes, NotificationTypeTypes, UserTypes } from "../types/types";
import { Dispatch, SetStateAction, useState } from "react";
import { PRIMARY_LIGHT } from "../constants/constants";
import UserListItem from "./UserLIstItem";
import { CgAdd, CgRemove } from "react-icons/cg";
import { createNotification, replyFriendRequest } from "../redux/api/api";
import { TopBackBtn } from "../utils/Utill";
//import { setSelectedNavigation } from "../redux/reducers/navigationReducer";
//import { useDispatch } from "react-redux";
import { RiMailSendLine } from "react-icons/ri";


interface ReceivedFriendRequestsPropTypes {
    friendRequests:{_id:string; from:{_id:string; name:string; email:string;}; to:{_id:string; name:string; email:string;}; date:Date;}[];
    setFriendRequests:Dispatch<SetStateAction<{_id:string; from:{_id:string; name:string; email:string;}; to:{_id:string; name:string; email:string;}; date:Date;}[]>>;
    notifications:{
        _id:string;
        receiverID:string;
        notificationType:NotificationTypeTypes;
        status:NotificationStatusTypes;
        content:string;
        redirectedURL?:string;
        newFor:string[];
        visibleFor:string[];
        createdAt:Date;
    }[];
    setNotifications:Dispatch<SetStateAction<{
        _id:string;
        receiverID:string;
        notificationType:NotificationTypeTypes;
        status:NotificationStatusTypes;
        content:string;
        redirectedURL?:string;
        newFor:string[];
        visibleFor:string[];
        createdAt:Date;
    }[]>>;
    user:UserTypes|null;
};

const ReceivedFriendRequests = ({friendRequests, setFriendRequests, notifications, setNotifications, user}:ReceivedFriendRequestsPropTypes) => {
    const [singleSelectedUser, setSingleSelectedUser] = useState<Pick<UserTypes, "_id"|"name"|"email">>({_id:"", name:"", email:""});
    
    //const dispatch = useDispatch();

    const replyFriendRequestHandler = async({friendRequestID, status}:{friendRequestID:string; status:FriendRequestStatusType;}) => {
        //if (isIncoming === true) {
            const reply = await replyFriendRequest({friendRequestID, status});
            if (reply.success === true) {
                console.log("----- replyFriendRequestHandler RequestFriendRequest.tsx");
                console.log(reply);
                console.log("----- replyFriendRequestHandler RequestFriendRequest.tsx");
                //dispatch(setSelectedNavigation("Chats"));
                setFriendRequests((prev) => prev.filter((item) => item._id !== friendRequestID));


                const createNotificationRes = await createNotification({
                    toUserIDs:[singleSelectedUser._id],
                    notificationType:"info",
                    status:"received",
                    content:"accepted friend request of"
                });
                setSingleSelectedUser({_id:"", name:"", email:""});
    
                if (createNotificationRes.success) {
                    setNotifications((prev) => [...prev, ...(createNotificationRes.jsonData) as []])
                }
                    
            }
        //}

    };
    const onSelectUserHandler = (user:Pick<UserTypes, "_id"|"name"|"email">) => {
        setSingleSelectedUser(user);
    };

    //useEffect(() => {
    //    const getAllReceivedFriendRequests = allReceivedFriendRequests();

    //    getAllReceivedFriendRequests.then((data) => {
    //        console.log("----- allReceivedFriendRequests");
    //        console.log(data);
    //        if (data.success === true) {
    //            setFriendRequests(data.message as {_id:string; from:{_id:string; name:string; email:string;}; to:{_id:string; name:string; email:string;}; date:Date;}[]);
    //        }
    //        console.log("----- allReceivedFriendRequests");
    //    }).catch((err) => {
    //        console.log("----- allReceivedFriendRequests");
    //        console.log(err);
    //        console.log("----- allReceivedFriendRequests");
    //    });
    //}, []);

    return(
        <div className="received_friend_requests_cont">
            <TopBackBtn heading="Received friend requests" />
            <div className="received_friend_requests">
                <div className="received_friend_requests_scrollable">
                    {
                        friendRequests.map((rqst) => {
                            const usr = rqst.from._id === user?._id ?  // other user not me (it can be sender or receiver)
                                        {
                                            _id:rqst.to._id,
                                            name:rqst.to.name,
                                            email:rqst.to.email
                                        }
                                        :
                                        {
                                            _id:rqst.from._id,
                                            name:rqst.from.name,
                                            email:rqst.from.email
                                        }

                            return(
                                <div key={rqst._id} className="user_cont"
                                    onClick={() => onSelectUserHandler(usr)}
                                    style={{
                                        background:singleSelectedUser._id === usr._id ?
                                                PRIMARY_LIGHT
                                                :
                                                "unset"
                                    }}>
                                        {/*<h4 style={{color:"white"}}><span>{rqst.from._id}</span>------<span>{user?._id}</span></h4>*/}
                                    <UserListItem userID={rqst._id} userName={usr.name} date={rqst.from._id === usr._id ? [CgRemove, CgAdd]:[RiMailSendLine]} replyFriendRequestHandler={rqst.from._id === usr._id?replyFriendRequestHandler:undefined} lastMessage={rqst.date.toString().split("T")[0]} isSelected={singleSelectedUser._id === usr._id} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
};

export default ReceivedFriendRequests;