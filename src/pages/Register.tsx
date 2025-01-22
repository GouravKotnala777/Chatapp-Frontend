import "../styles/pages/login.scss";
import { ChangeEvent, useState } from "react";
import { register } from "../redux/api/api";
//import { useDispatch } from "react-redux";
//import { setLoginUser } from "../redux/reducers/loginUserReducer";
//import { useNavigate } from "react-router-dom";
//import { UserTypes } from "../types/types";
import { TopBackBtn } from "../utils/Utill";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
    const [registerFormData, setRegisterFormData] = useState<{name:string; email:string; password:string; gender:string; mobile:string;}>({name:"", email:"", password:"", gender:"", mobile:""});
    //const dispatch = useDispatch();
    //const navigate = useNavigate();

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setRegisterFormData({...registerFormData, [e.target.name]:e.target.value});
    };

    const onRegisterHandler = async() => {
        try {
            const registerRes = await register(registerFormData);

            if (registerRes.success) {
                toast.success("Register successful", {
                    duration:2000,
                    position:"top-center"
                })
            }
            //if (registerRes.success === true) {
            //    //navigate("/");
            //}
            //if (registerRes.success === false) {
            //    //dispatch(setLoginUser({isLoading:false, user:null, isError:true}));
            //}
            console.log(registerRes);
            
        } catch (error) {
            console.log(error);
        }
    };


    return(
        <div className="login_bg">
            <TopBackBtn />
            <Toaster />
            <input type="text" name="name" placeholder="Name" onChange={(e) => onChangeHandler(e)}/>
            <input type="text" name="email" placeholder="Email" onChange={(e) => onChangeHandler(e)}/>
            <input type="text" name="password" placeholder="Password" onChange={(e) => onChangeHandler(e)}/>
            <input type="text" name="gender" placeholder="Gender" onChange={(e) => onChangeHandler(e)}/>
            <input type="text" name="mobile" placeholder="Mobile" onChange={(e) => onChangeHandler(e)}/>
            <button onClick={onRegisterHandler}>Register</button>
            <span className="or_cont">
                <span className="line"></span>
                <span>or</span>
                <span className="line"></span>
            </span>
            <span className="forget_cont">
                <div className="left_part">
                </div>
                <div className="right_part">
                    <span className="don_have_acc">already have account?</span><a href="/login"> login</a>
                </div>
            </span>
        </div>
    )
};

export default Register;