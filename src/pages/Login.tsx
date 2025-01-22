import "../styles/pages/login.scss";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/api/api";
import { setLoginUser } from "../redux/reducers/loginUserReducer";
import { useDispatch } from "react-redux";
import { UserTypes } from "../types/types";
import { TopBackBtn } from "../utils/Utill";
import toast, { Toaster } from "react-hot-toast";


const Login = () => {
    const [loginFormData, setLoginFormData] = useState<{email:string; password:string;}>({email:"", password:""});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setLoginFormData({...loginFormData, [e.target.name]:e.target.value});
    };

    const loginHandler = async() => {
        const loginData = await login(loginFormData);
        console.log({loginData});

        if (loginData.success === true) {
            if (typeof loginData.message === "string") {
                toast.success(loginData.message, {
                    duration:2000,
                    position:"top-center"
                });
                console.log("Check email for verification link");
            }
            else {
                toast.success(loginData.message, {
                    duration:2000,
                    position:"top-center"
                });
                dispatch(setLoginUser({isLoading:false, user:loginData.message as UserTypes, isError:false}));
                navigate("/");
            }
        }
        if (loginData.success === false) {
            toast.error(loginData.message, {
                duration:2000,
                position:"top-center"
            });
            dispatch(setLoginUser({isLoading:false, user:null, isError:true}));
        }
    }

    return(
        <div className="login_bg">
            <TopBackBtn />
            <Toaster />
            <input type="text" className="email" name="email" placeholder="Email" onChange={(e) => onChangeHandler(e)}/>
            <input type="text" className="password" name="password" placeholder="Password" onChange={(e) => onChangeHandler(e)}/>
            <button onClick={loginHandler}>Login</button>
            <span className="or_cont">
                <span className="line"></span>
                <span>or</span>
                <span className="line"></span>
            </span>
            <span className="forget_cont">
                <div className="left_part">
                    <a href="">forget password</a>
                </div>
                <div className="right_part">
                    <span className="don_have_acc">don't have account?</span><a href="/register"> register</a>
                </div>
            </span>
        </div>
    )
};

export default Login;