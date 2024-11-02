import "../styles/components/profile.scss";
import dp from "../../public/user_placeholder.png";
import { Para, TopBackBtn } from "../utils/Utill";
import { PRIMARY_LIGHT } from "../constants/constants";
import { useSelector } from "react-redux";
import { LoginUserReducerTypes } from "../redux/reducers/loginUserReducer";
import { useNavigate } from "react-router-dom";


const Profile = () => {
    const {user} = useSelector((state:{loginUserReducer:LoginUserReducerTypes}) => state.loginUserReducer);
    const navigate = useNavigate();

    return(
        <div className="profile_cont">
            <TopBackBtn heading="Profile" />
            <div className="dp_cont">
                <img src={dp} alt={dp} />
            </div>
            <div className="user_name_cont">
                <div className="heading">User Name</div>
                {user?.name}
            </div>
            <Para value="This is not your username or PIN. This name will be visible to your WhatsApp contancts." color={PRIMARY_LIGHT} padding="10px 5px" />
            <div className="user_email_cont">
                <div className="heading">Email</div>
                {user?.email}
            </div>
            <div className="user_about_cont">
                <div className="heading">About</div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur perferendis quidem cupiditate voluptatem debitis iste neque reiciendis, necessitatibus et aut hic veritatis, molestiae, tempore laboriosam. Eveniet ipsum placeat unde provident!
            </div>
            <div className="action_with_user_cont">
                <div className="heading">Logout</div>
                <button onClick={() => navigate("/logout")}>Logout</button>
            </div>
        </div>
    )
}

export default Profile;