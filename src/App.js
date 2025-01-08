import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/account/login";
import ForgotPassword from "./components/account/forgotpassword";
import SignUp from "./components/account/signup";
import ResetPassword from "./components/account/resetpassword";
import VerifyCode from "./components/account/confirmvcode";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/confirmcode" element={<VerifyCode />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
