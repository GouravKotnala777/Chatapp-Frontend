import "../styles/components/notifications.scss";
import photo from "../../public/vite.svg";
import { Dispatch, SetStateAction, useEffect } from "react";
import { NaviagationTypes, NotificationTypes } from "../types/types";
import { TopBackBtn } from "../utils/Utill";
import { removeNotification, watchNotification } from "../redux/api/api";

interface NotificationsPropTypes{
    notifications:NotificationTypes[];
    setNotifications:Dispatch<SetStateAction<NotificationTypes[]>>;
    newNotifications:NotificationTypes[];
    setNewNotifications:Dispatch<SetStateAction<NotificationTypes[]>>;
    selectedNavigation:NaviagationTypes;
}

const Notifications = ({notifications, setNotifications, newNotifications, setNewNotifications, selectedNavigation}:NotificationsPropTypes) => {

    const removeNotificationHandler = async(notificationID:string) => {
        const removeNotificationRes = await removeNotification({
            notificationID
        });

        if (removeNotificationRes.success) {
            setNotifications((prev) => prev.filter((noti) => noti._id !== removeNotificationRes.jsonData));
        }
    };

    useEffect(() => {
        if(selectedNavigation === "Notifications"){
            watchNotification()
            .then((data) => {
                if (data.success) {
                    console.log(data);
                    setNotifications((prev) => [...newNotifications, ...prev]);
                    setNewNotifications([]);
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }, [selectedNavigation]);

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