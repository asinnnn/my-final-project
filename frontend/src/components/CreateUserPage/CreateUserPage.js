import { useState } from "react";
import styled from "styled-components";
import Login from "../Login/Login";

export const CreateUserPage = () => {
  const userInitialState = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    icon: "",
    bio: "",
    link: "",
  };
  const [userData, setUserData] = useState(userInitialState);
  const [fileName, setFileName] = useState();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (value, name) => {
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (event) => {
    try {
      setFileName(event.target.value);
      const files = event.target.files;
      const imageFile = files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const iconBase64 = e.target.result.split(",")[1];
        setUserData({ ...userData, icon: iconBase64 });
      };
      reader.readAsDataURL(imageFile);
    } catch (err) {
      console.log("icon upload error:", err);
    }
  };

  // const readFileAsBytes = async (imageFile) => {
  //   return new Promise((resolve, reject) => {
  //     let reader = new FileReader();
  //     reader.onerror = reject;
  //     reader.onload = (e) => resolve(e.target.result);
  //     reader.readAsDataURL(imageFile);
  //   });
  // };

  const closeConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isUrlValid(userData.link)) {
      // don't submit, link error
      console.log("link wrong don't submit");
    } else {
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        };
        const response = await fetch("/user/newuser", requestOptions);
        const data = await response.json();
        console.log(data);
        setShowConfirmation(true);
      } catch (err) {
        console.log("Error");
      }
    }
  };

  const isUrlValid = async (string) => {
    if (string) {
      return true;
    } else {
      try {
        await new URL(string);
        return true;
      } catch (err) {
        return false;
      }
    }
  };

  return (
    <>
      {/* <Login /> */}
      <Window>
        <H1>//CREATE AN ACCOUNT TO JOIN IN!</H1>
      <Form onSubmit={handleSubmit}>
        <div>
          <Card>
            <Label htmlFor="username">username:</Label>
            <Input
              id="username"
              type="text"
              value={userData.username}
              minLength="5"
              maxLength="20"
              onChange={(ev) => handleChange(ev.target.value, "username")}
            />
          </Card>
          <Card>
          <Label htmlFor="password">password:</Label>
          <Input
            id="password"
            type="password"
            value={userData.password}
            minLength="5"
            maxLength="20"
            onChange={(ev) => handleChange(ev.target.value, "password")}
          />
          </Card>
          <Card>
            <Label htmlFor="firstname">first name:</Label>
            <Input
              id="firstName"
              type="text"
              value={userData.firstName}
              onChange={(ev) => handleChange(ev.target.value, "firstName")}
              minLength="2"
              required
            />
          </Card>
          <Card>
            <Label htmlFor="lastname">last name:</Label>
            <Input
              id="lastName"
              type="text"
              value={userData.lastName}
              onChange={(ev) => handleChange(ev.target.value, "lastName")}
              minLength="2"
              required
            />
          </Card>
          <Card>
            <Label htmlFor="email">email:</Label>
            <Input
              id="email"
              type="email"
              value={userData.email}
              onChange={(ev) => handleChange(ev.target.value, "email")}
              required
            />
          </Card>
          <Card>
            <Label htmlFor="icon">icon:</Label>
            <Input
              id="icon"
              type="file"
              value={fileName}
              minLength="5"
              maxLength="20"
              accept="image/*"
              onChange={(ev) => handleFileChange(ev, "icon")}
            />
          </Card>
          <Card>
            <Label htmlFor="bio (optional)">bio (optional):</Label>
            <TextArea
              id="bio"
              type="text"
              value={userData.bio}
              minLength="0"
              maxLength="1000"
              onChange={(ev) => handleChange(ev.target.value, "bio")}
            />
          </Card>
          <Card>
          <Label htmlFor="link">website link (optional):</Label>
          <Input
            id="link"
            type="text"
            value={userData.link}
            minLength="0"
            maxLength="1000"
            onChange={(ev) => handleChange(ev.target.value, "link")}
          />
          </Card>
          <Button type="submit">Submit</Button>
        </div>
      </Form>
      {showConfirmation && (
        <ConfirmationPopUp closeConfirmation={closeConfirmation}>
          <PopUpContent>
            <h2>User Created</h2>
            <p>User has been created successfully.</p>
            <Button onClick={closeConfirmation}>Close</Button>
          </PopUpContent>
        </ConfirmationPopUp>
      )}
      </Window>
      
    </>
  );
};

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
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid red;
  border-radius: 5px;
  width: 30vw;
  background-color: transparent;
  &:focus {
    outline: 2px dotted red;
    outline-offset: 4px;
  }
`;

const Button = styled.button`
  padding: 15px 60px;
  margin: 10px;
  margin-bottom: 55px;
  background-color: red;
  color: rgb(255, 253, 215);
  border: 1px solid red;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: rgb(255, 253, 215);
    color: red;
    border: 1px solid red;
    border-radius: 4px;
    font-size: 16px;
  }
  &:focus {
    outline: 2px dotted red;
    outline-offset: 4px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  margin-top: 20px;
  margin-right: 30px;
  width: 30vw;
`;

const Card = styled.div`
  padding: 10px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid red;
  border-radius: 5px;
  width: 30vw;
  height: 100px;
  background-color: transparent;
  &:focus {
    outline: 2px dotted red;
    outline-offset: 4px;
  }
`;
const Block = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
  padding: 20px;
`;

const H1 = styled.h1`
  z-index: 9992;
  padding: 10px;
`;

const Window = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
  padding: 20px;
`