import React, { useState ,useContext } from "react";
import Login from "../Components/AuthComponents/Login";
import Signup from "../Components/AuthComponents/Signup";
import "./Auth.css";
// import { AuthContext } from "../Context/auth-context";

const Auth = () => {
  
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="auth-container">
      <div className="form-container">
        <h1 className="form-title">{isLogin ? "Welcome Back!" : "New Here?"}</h1>
        <h2 className="form-title">{isLogin ? "Log in to your account" : "Sign up with us!"}</h2>
        {isLogin ? <Login toggleForm={toggleForm} /> : <Signup toggleForm={toggleForm} />}
      </div>
    </div>
  );
};

export default Auth;
