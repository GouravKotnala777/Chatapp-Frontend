import "../styles/pages/login.scss";
import { ChangeEvent, useState } from "react";
import { register } from "../redux/api/api";
import { TopBackBtn } from "../utils/Utill";
import { Toaster } from "react-hot-toast";
import Spinner from "../components/Spinner";

const Register = () => {
    const [registerFormData, setRegisterFormData] = useState<{name:string; email:string; password:string; gender:string; mobile:string;}>({name:"", email:"", password:"", gender:"", mobile:""});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setRegisterFormData({...registerFormData, [e.target.name]:e.target.value});
    };

    const onRegisterHandler = async() => {
        setIsLoading(true);
        const res = await register(registerFormData);
        
        if (res.success) {
            setIsLoading(false);
        }
        else{
            setIsLoading(false);
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
            <button onClick={onRegisterHandler}>{isLoading?<Spinner width="15.5px" />:"Register"}</button>
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