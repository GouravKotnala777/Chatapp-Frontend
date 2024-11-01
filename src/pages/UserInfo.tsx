import "../styles/pages/user_info.scss";
import { Dispatch, SetStateAction } from "react";
import { UserTypes } from "../types/types";
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { setSelectedNavigation } from "../redux/reducers/navigationReducer";
import photo from "../../public/vite.svg";


const UserInfo = ({singleSelectedUser}:{singleSelectedUser:Pick<UserTypes, "_id"|"name"|"email">; setSingleSelectedUser:Dispatch<SetStateAction<Pick<UserTypes, "_id"|"name"|"email">>>;}) => {
    const dispatch = useDispatch();

    return(
        <div className="user_info_bg">
            <div className="back_btn">
                <HiMiniArrowLongLeft className="HiMiniArrowLongLeft" onClick={() => dispatch(setSelectedNavigation("Chats"))} />
            </div>
            <div className="dp_cont">
                <img src={photo} alt={photo} />
            </div>
            <div className="user_name_cont">
                <div className="heading">User Name</div>
                {singleSelectedUser.name}
            </div>
            <div className="user_email_cont">
                <div className="heading">Email</div>
                {singleSelectedUser.email}
            </div>
            <div className="user_about_cont">
                <div className="heading">About</div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur perferendis quidem cupiditate voluptatem debitis iste neque reiciendis, necessitatibus et aut hic veritatis, molestiae, tempore laboriosam. Eveniet ipsum placeat unde provident!
            </div>
            <div className="action_with_user_cont">
                <div className="heading">Send request</div>
                <button onClick={() => dispatch(setSelectedNavigation("Search user"))}>Send request</button>
            </div>
            <div className="action_with_user_cont">
                <div className="heading">Remove from friends list</div>
                <button onClick={() => dispatch(setSelectedNavigation("Delete freind"))}>Remove friend</button>
            </div>
        </div>
    )
};

export default UserInfo;