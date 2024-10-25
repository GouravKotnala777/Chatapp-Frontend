import "../styles/components/profile.scss";
import { BiDotsVertical } from "react-icons/bi";
import { LuMessageSquarePlus } from "react-icons/lu";
import dp from "../../public/user_placeholder.png";
import { Heading, Para } from "../utils/Utill";
import { GRAY_LIGHTER, PRIMARY } from "../constants/constants";
import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { LoginUserReducerTypes } from "../redux/reducers/loginUserReducer";


const Profile = () => {
    const {user} = useSelector((state:{loginUserReducer:LoginUserReducerTypes}) => state.loginUserReducer);

    return(
        <div className="profile_cont">
            <div className="profile_section_header">
                <div className="heading">Profile</div>
                <div className="icons">
                    <button className="icon"><LuMessageSquarePlus /></button>
                    <button className="icon"><BiDotsVertical /></button>
                </div>
            </div>
            <div className="search_section">
                <div className="my_dp_cont">
                    <img src={dp} alt={dp} />
                </div>
            </div>
            <div className="profile_section">
                <div className="profile_section_scrollable">
                    <Para value="Your name" color={PRIMARY} padding="10px 0" />
                    <div className="profile_info">
                        <div className="profile_name_value">
                            <Heading value={user?.name as string} color={GRAY_LIGHTER} padding="0" margin="0" textAlign="left" />
                        </div>
                        <div className="profile_edit_icon">
                            <MdEdit className="MdEdit" />
                        </div>
                    </div>
                    <Para value="This is not your username or PIN. This name will be visible to your WhatsApp contancts." color={GRAY_LIGHTER} padding="10px 0" />
                    <Para value="About" color={PRIMARY} padding="10px 0" />
                    <div className="profile_info">
                        <div className="profile_name_value">
                            <Heading value="Urgent calls only" color={GRAY_LIGHTER} padding="0" margin="0" textAlign="left" />
                        </div>
                        <div className="profile_edit_icon">
                            <MdEdit className="MdEdit" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;