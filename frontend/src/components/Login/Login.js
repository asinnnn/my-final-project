import React, { useState } from "react";
import styled from "styled-components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <ConfirmationPopUp>
      <PopUpContent>
        <h2>Must log in to contribute</h2>
      </PopUpContent>
    </ConfirmationPopUp>
  );
};

export default Login;

const ConfirmationPopUp = styled.div`
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(255, 253, 215);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopUpContent = styled.div`
  background-color: red;
  color: rgb(255, 253, 215);
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  width: 400px;
`;

const Label = styled.label`
  padding: 20px;
  margin-right: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid red;
  border-radius: 5px;
  background-color: rgb(255, 253, 215);
  &:focus {
    outline: 2px dotted red;
    outline-offset: 4px;
  }
`;

const Button = styled.button`
  margin: 10px;
  margin-bottom: 55px;
  background-color: red;
  color: rgb(255, 253, 215);
  border: 1px solid red;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:focus {
    outline: 2px dotted red;
    outline-offset: 4px;
  }
`;

const Card = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;