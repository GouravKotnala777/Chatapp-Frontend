import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/*<Home />*/}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
