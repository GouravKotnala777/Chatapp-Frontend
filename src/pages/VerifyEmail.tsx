import { useEffect, useState } from "react";
import { verify } from "../redux/api/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoginUser } from "../redux/reducers/loginUserReducer";
import { UserTypes } from "../types/types";


const VerifyEmail = () => {
    //const [token, setToken] = useState<string>("");
    const [verifyRes, setVerifyRes] = useState<UserTypes|null>(null);
    const [verifyError, setVerifyError] = useState<string>("");
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const token = searchParams.get("token");
    const emailType = searchParams.get("emailType");


    const verifyHandler = async() => {
        try {
            const res = await verify({token:token as string, emailType:emailType as "VERIFY_EMAIL"|"RESET_PASSWORD"});

            console.log(res);

            if (res.success === true) {
                setVerifyRes(res.message as UserTypes);
                dispatch(setLoginUser({isLoading:false, user:res.message as UserTypes, isError:false}));
                navigate("/");
            }
            else if (res.success === false) {
                dispatch(setLoginUser({isLoading:false, user:null, isError:true}));
                setVerifyError(res.message as string);
            }
            
        } catch (error) {
            console.log(error);
            setVerifyError(error as string)
        }
    };

    useEffect(() => {
        if (token && emailType) {
            verifyHandler();
        }
    }, [])

    return(
        <div className="verify_email_bg">
            <h1 style={{color:"white"}}>Veryfy Page</h1>
            <h1 style={{color:"white"}}>Token : {token}</h1>
            <h1 style={{color:"white"}}>Email Type : {emailType}</h1>
            {
                verifyRes &&
                    <pre style={{color:"white"}}>Response : {JSON.stringify(verifyRes, null, `\t`)}</pre>
            }
            {
                verifyError &&
                    <h1 style={{color:"white"}}>Error : {verifyError}</h1>
            }
        </div>
    )
};

export default VerifyEmail;