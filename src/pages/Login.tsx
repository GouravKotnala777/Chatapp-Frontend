import { ChangeEvent, useState } from "react";
import { BiHome } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/api/api";
import { setLoginUser } from "../redux/reducers/loginUserReducer";
import { useDispatch } from "react-redux";
import { UserTypes } from "../types/types";


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
            //console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");
            dispatch(setLoginUser({isLoading:false, user:loginData.message as UserTypes, isError:false}));
            navigate("/");
        }
        if (loginData.success === false) {
            //console.log("NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN");
            dispatch(setLoginUser({isLoading:false, user:null, isError:true}));
        }
    }

    return(
        <div className="login_bg">
            <button onClick={() => navigate("/")} ><BiHome /></button>
            <input type="text" className="email" name="email" placeholder="Email" onChange={(e) => onChangeHandler(e)}/>
            <input type="text" className="password" name="password" placeholder="Password" onChange={(e) => onChangeHandler(e)}/>
            <button onClick={loginHandler}>Login</button>
        </div>
    )
};

export default Login;