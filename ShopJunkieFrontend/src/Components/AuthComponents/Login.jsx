// login.js

import React, { useState, useContext } from "react";
import { AuthContext } from "../../Contexts/auth-context";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import usericon from "../../Assets/Img/usercon.png";
import keyicon from "../../Assets/Img/keyIcon.png";
import Form from "./Form";
import Input from "./Input";

const Login = ({ toggleForm }) => {
  const auth = useContext(AuthContext); // Accessing AuthContext

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/auth/login', {formData})
      .then(res => {
        console.log(res.data.message); // Logging the message from the response
      })
      .catch(err => console.log(err));

    auth.login();
  };

  return (
    <>
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
        <button className="login-button" type="submit">
          Log In
        </button>
      </Form>
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
