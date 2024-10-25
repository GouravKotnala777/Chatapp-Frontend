import { ChangeEvent, useState } from "react";
import { register } from "../redux/api/api";
import { useDispatch } from "react-redux";
import { setLoginUser } from "../redux/reducers/loginUserReducer";
import { useNavigate } from "react-router-dom";
import { UserTypes } from "../types/types";

const Register = () => {
    const [registerFormData, setRegisterFormData] = useState<{name:string; email:string; password:string; gender:string; mobile:string;}>({name:"", email:"", password:"", gender:"", mobile:""});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setRegisterFormData({...registerFormData, [e.target.name]:e.target.value});
    };

    const onRegisterHandler = async() => {
        try {
            const registerRes = await register(registerFormData);

            if (registerRes.success === true) {
                dispatch(setLoginUser({isLoading:false, user:registerRes.message as UserTypes, isError:false}));
                navigate("/");
            }
            if (registerRes.success === false) {
                dispatch(setLoginUser({isLoading:false, user:null, isError:true}));
            }
        } catch (error) {
            console.log(error);
        }
    };


    return(
        <div className="register_bg">
            <input type="text" name="name" placeholder="Name" onChange={(e) => onChangeHandler(e)}/>
            <input type="text" name="email" placeholder="Email" onChange={(e) => onChangeHandler(e)}/>
            <input type="text" name="password" placeholder="Password" onChange={(e) => onChangeHandler(e)}/>
            <input type="text" name="gender" placeholder="Gender" onChange={(e) => onChangeHandler(e)}/>
            <input type="text" name="mobile" placeholder="Mobile" onChange={(e) => onChangeHandler(e)}/>
            <button onClick={onRegisterHandler}>Register</button>
        </div>
    )
};

export default Register;