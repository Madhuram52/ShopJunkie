import React from "react";
// import Input from "./input";

const Form = ({ onSubmit, children }) => {
  return <form onSubmit={onSubmit} className="input-container">{children}</form>;
};

export default Form;
