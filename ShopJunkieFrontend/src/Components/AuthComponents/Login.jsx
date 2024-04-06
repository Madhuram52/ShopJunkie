import React, { useState, useContext } from "react";
import { AuthContext } from "../../Contexts/auth-context";
import usericon from "../../Assets/Img/usercon.png";
import keyicon from "../../Assets/Img/keyIcon.png";
import Form from "./Form";
import Input from "./Input";
import LoadingSpinner from "../UI Elements/LoadingSpinner";
import useHttpClient from "../../hooks/http-hook";

const Login = ({ toggleForm }) => {
  const auth = useContext(AuthContext);
  const {isLoading, error , sendRequest,clearError } = useHttpClient();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'email') {
      // If email is changed, reset password to an empty string
      setFormData({ email: value, password: "" });
    } else {
      setFormData({ ...formData, [id]: value });
    }
    clearError();
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendRequest('http://localhost:5000/api/auth/login', 'POST', formData);
      console.log(response.message);
      // console.log(response.shop._id);
      auth.login(response.shop._id);
    } catch (err) {
    }
  };


  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          id="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleInputChange}
          icon={usericon}
        />
        <Input
          type="password"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          icon={keyicon}
        />
        <button className="login-button" type="submit" disabled={isLoading}>
          {isLoading ? "Logging In..." : "Log In"}
        </button>
      </Form>
      {error && <p style={{ color: 'red' }} >{error}</p>} {/* Display error message if error state is not empty */}
      <p className="SwitchSL">
        Don't have an account?{" "}
        <a href="#!" onClick={toggleForm}>
          Sign up here
        </a>
      </p>
    </>
  );
};

export default Login;
