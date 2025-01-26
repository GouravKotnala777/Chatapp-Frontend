import "../styles/components/notifications.scss";
import photo from "../../public/vite.svg";
import { Dispatch, SetStateAction } from "react";
import { NotificationStatusTypes, NotificationTypeTypes } from "../types/types";
import { TopBackBtn } from "../utils/Utill";
import { removeNotification } from "../redux/api/api";

interface NotificationsPropTypes{
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
}

const Notifications = ({notifications, setNotifications}:NotificationsPropTypes) => {

    const removeNotificationHandler = async(notificationID:string) => {
        const removeNotificationRes = await removeNotification({
            notificationID
        });

        if (removeNotificationRes.success) {
            setNotifications((prev) => prev.filter((noti) => noti._id !== removeNotificationRes.jsonData));
        }
    };

    return(
        <div className="notifications_cont">
            <TopBackBtn heading="Notifications" />
            <div className="notifications">
                <div className="scrollable_cont">
                    {
                        notifications.map((notification) => (
                            <div className="notification">
                                <div className="info_cont">
                                    <div className="image_cont">
                                        <img src={photo} alt={photo} />
                                    </div>
                                    <div className="content">
                                        {notification.content}
                                    </div>
                                    <div className="date">{new Date(notification.createdAt.toString().split("T")[0] as string).toLocaleString(undefined, {day:"2-digit", month:"short"})}</div>
                                </div>
                                <div className="button_cont">
                                    <button onClick={() => removeNotificationHandler(notification._id)}>Remove</button>
                                    <button>POST</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Notifications;