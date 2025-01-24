import "../styles/pages/login.scss";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/api/api";
import { setLoginUser } from "../redux/reducers/loginUserReducer";
import { useDispatch } from "react-redux";
import { UserTypes } from "../types/types";
import { TopBackBtn } from "../utils/Utill";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../components/Spinner";


const Login = () => {
    const [loginFormData, setLoginFormData] = useState<{email:string; password:string;}>({email:"", password:""});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setLoginFormData({...loginFormData, [e.target.name]:e.target.value});
    };

    const loginHandler = async() => {
        setIsLoading(true);
        const loginData = await login(loginFormData);

        if (loginData.success === true) {
            if (loginData.message === "Login successful") {
                setTimeout(() => {
                    dispatch(setLoginUser({isLoading:false, user:loginData.jsonData as UserTypes, isError:false}));
                    setIsLoading(false);
                    navigate("/");
                }, 2100);
            }
            else {
                setIsLoading(false);
            }
        }
        else {
            toast.error(loginData.message, {
                duration:2000,
                position:"top-center"
            });
            setIsLoading(false);
            dispatch(setLoginUser({isLoading:false, user:null, isError:true}));
        }
        //console.log(loginData.message);
    };

    return(
        <div className="login_bg">
            <TopBackBtn />
            <Toaster />
            {/*<button onClick={() => setIsLoading(!isLoading)}>aaaa</button>*/}
            <input type="text" className="email" name="email" placeholder="Email" onChange={(e) => onChangeHandler(e)}/>
            <input type="text" className="password" name="password" placeholder="Password" onChange={(e) => onChangeHandler(e)}/>
            <button onClick={loginHandler}>{isLoading?<Spinner width="15.5px" />:"Login"}</button>
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