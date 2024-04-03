import React, { useState, useContext } from "react";
import { AuthContext } from "../../Contexts/auth-context";
import axios from 'axios';
import Form from "./Form";
import Input from "./Input";
import usericon from "../../Assets/Img/usercon.png";
import keyicon from "../../Assets/Img/keyIcon.png";

const Signup = ({ toggleForm }) => {
  const auth = useContext(AuthContext);

  const initialFormData = {
    shopname: "",
    shoplocation: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setErrors({ ...errors, [id]: "" });
    setFormData({ ...formData, [id]: value });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const formInputs = ["shopname", "shoplocation", "email", "password", "confirmPassword"];
      const currentIndex = formInputs.indexOf(e.target.id);
      if (currentIndex < formInputs.length - 1) {
        document.getElementById(formInputs[currentIndex + 1]).focus();
      } else {
        handleSubmit(e);
      }
    }
  };

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 5;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, confirmPassword } = formData;
    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);

    if (!emailValid) {
      setErrors({ ...errors, email: "Invalid email address" });
      return;
    }

    if (!passwordValid) {
      setErrors({
        ...errors,
        password: "Password must be at least 5 characters long",
      });
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Passwords do not match" });
      return;
    }

    axios.post('http://localhost:5000/api/auth/signup', { formData })
    .then(res => {
        console.log(res.data.message);
    })
    .catch(err => console.log(err));

    // Perform signup action here
    auth.login();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          id="shopname"
          placeholder="Shop Name"
          value={formData.shopname}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          icon={usericon}
        />
        <Input
          type="text"
          id="shoplocation"
          placeholder="Shop Location"
          value={formData.shoplocation}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          icon={usericon}
        />
        <Input
          type="email"
          id="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          errorMessage={errors.email}
          icon={usericon}
        />
        <Input
          type="password"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          errorMessage={errors.password}
          icon={keyicon}
        />
        <Input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          errorMessage={errors.confirmPassword}
          icon={keyicon}
        />
        <button className="login-button" type="submit">
          Signup
        </button>
      </Form>
      <p>
        Already have an account?{" "}
        <a href="#!" onClick={toggleForm}>
          Log In here
        </a>
      </p>
    </>
  );
};

export default Signup;
