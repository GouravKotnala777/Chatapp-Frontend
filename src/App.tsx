import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
//import store from "./redux/store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import { LoginUserReducerTypes, setLoginUser } from "./redux/reducers/loginUserReducer";
import { ReactElement, useEffect } from "react";
import { myProfile } from "./redux/api/api";
import { UserTypes } from "./types/types";

function App() {
  const {user} = useSelector((state:{loginUserReducer:LoginUserReducerTypes}) => state.loginUserReducer);
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchMyProfile = myProfile();

    fetchMyProfile.then((data) => {
        console.log("from Home.tsx ))))))))))");
        dispatch(setLoginUser({isLoading:false, user:data.jsonData as UserTypes, isError:false}))
        console.log("from Home.tsx ))))))))))");
        
    })
    .catch((err) => {
        console.log("from Home.tsx--------------");
        console.log(err);
        console.log("from Home.tsx--------------");
    })
}, []);

  return (
      <Router>
        <Routes>
          {
            user &&
              <Route path="/" element={<Home user={user} />} />
          }
          {
            !user &&
              <Route path="/" element={<Login />} />
          }

          {/*<Route path="/" element={<ProtectedRoute children={<Home user={user} />} userRole={user?._id} />} />*/}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/verifyemail" element={<VerifyEmail />} />
        </Routes>
      </Router>
  )
}

export const ProtectedRoute = ({children, userRole}:{children:ReactElement; userRole:string|undefined;}) => {
  console.log("??????????????");
  console.log(userRole);
  console.log("??????????????");
  if (userRole) {
      return children;
  }
  else{
    return <Navigate to="/login" />;
  }
};

export default App
