import { useState } from "react";
import styled from "styled-components";
// import Login from "../Login/Login";

export const PostUploadPage = () => {
  const postInitialData = {
    username: "",
    title: "",
    processFile: "",
    sourceLink: "",
    fitPic: "",
    garmentType: "",
    description: "",
  };
  const [postData, setPostData] = useState(postInitialData);
  const [pdfFileName, setPdfFileName] = useState();
  const [fitFileName, setFitFileName] = useState();
  const [showPostConfirmation, setShowPostConfirmation] = useState(false);

  const handleChange = (value, name) => {
    setPostData({ ...postData, [name]: value });
  };

  const handleFitFileChange = (event) => {
    try {
      setFitFileName(event.target.value);
      const files = event.target.files;
      const imageFile = files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const fitBase64 = e.target.result.split(",")[1];
        setPostData({ ...postData, fitPic: fitBase64 });
      };
      reader.readAsDataURL(imageFile);
    } catch (err) {
      console.log("icon upload error:", err);
    }
  };

  const handlePdfFileChange = (event) => {
    try {
      setPdfFileName(event.target.value);
      const files = event.target.files;
      const pdfFile = files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const processBase64 = e.target.result.split(",")[1];
        setPostData({ ...postData, processFile: processBase64 });
      };
      reader.readAsDataURL(pdfFile);
    } catch (err) {
      console.log("icon upload error:", err);
    }
  };

  const closeConfirmation = () => {
    setShowPostConfirmation(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isUrlValid(postData.sourceLink)) {
      console.log("link wrong don't submit");
    } else {
      try {
        console.log(postData);
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        };
        const response = await fetch("/post/upload", requestOptions);
        const data = await response.json();
        console.log(data);
        setShowPostConfirmation(true);
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
    <Window>
      <H1>SHARE YOUR PROCESS//PATTERN//WORK</H1>
      <Form onSubmit={handleSubmit}>
        <div>
          <Card>
            <Label htmlFor="title">title:</Label>
            <Input
              id="title"
              type="text"
              value={postData.title}
              minLength="5"
              maxLength="20"
              onChange={(ev) => handleChange(ev.target.value, "title")}
              required
            />
          </Card>
          <Card>
            <Label htmlFor="fitPic">Upload Pic:</Label>
            <Input
              id="fitPic"
              type="file"
              value={fitFileName}
              minLength="5"
              maxLength="20"
              accept="image/*"
              onChange={(ev) => handleFitFileChange(ev, "fitPic")}
              required
            />
          </Card>
          <Card>
            <Label htmlFor="description">description:</Label>
            <TextArea
              id="description"
              type="description"
              value={postData.description}
              minLength="5"
              maxLength="1000"
              onChange={(ev) => handleChange(ev.target.value, "description")}
            />
          </Card>
          <Card>
            <Label htmlFor="processFile">upload process:</Label>
            <Input
              id="processFile"
              type="file"
              value={pdfFileName}
              minLength="5"
              maxLength="20"
              accept=".pdf"
              onChange={(ev) => handlePdfFileChange(ev, "processFile")}
            />
          </Card>
          <Card>
            <Label htmlFor="sourceLink">source link:</Label>
            <TextArea
              id="sourceLink"
              type="text"
              value={postData.sourceLink}
              minLength="0"
              maxLength="1000"
              onChange={(ev) => handleChange(ev.target.value, "sourceLink")}
            />
          </Card>
          <Card>
            <Label htmlFor="garmentType">Garment Type:</Label>
            <Select
              id="garmentType"
              value={postData.garmentType}
              onChange={(ev) => handleChange(ev.target.value, "garmentType")}
              required
            >
              <option value="">Select an option</option>
              <option value="Top">Top</option>
              <option value="Bottom">Bottom</option>
              <option value="Full">Full</option>
              <option value="Accessories">Accessories</option>
              <option value="Other">Other</option>
            </Select>
          </Card>
          <Card>
            <Button type="submit">Submit</Button>
          </Card>
        </div>
      </Form>
      {showPostConfirmation && (
        <ConfirmationPopUp closeConfirmation={closeConfirmation}>
          <PopUpContent>
            <h2>Post Created</h2>
            <p>Post has been created successfully.</p>
            <Button onClick={closeConfirmation}>Close</Button>
          </PopUpContent>
        </ConfirmationPopUp>
      )}
    </Window>
  );
};

const ConfirmationPopUp = ({ closeConfirmation }) => {
  return (
    <div>
      {/* Confirmation popup content */}
    </div>
  );
};

// const ConfirmationPopUp = styled.div`
//   z-index: 9999;
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgb(255, 253, 215);
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

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
  background-color: transparent;
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

const Select = styled.select`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid red;
  border-radius: 5px;
  width: 200px;
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
const Window = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
  padding: 20px;
`

const H1 =styled.h1`
    z-index: 9999;
    padding: 10px;
`