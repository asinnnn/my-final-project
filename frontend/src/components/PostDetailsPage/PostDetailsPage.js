import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";

export const PostDetailsPage = () => {
const [matchPostData, setMatchPostData] = useState([]);
const [postPic, setPostPic] = useState("");

const { postId } = useParams();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`/posts/${postId}`);
        const data = await response.json();

        if (response.ok) {
            setMatchPostData(data.data[0]);
            const fitPicBase64 = data.data[0].fitPic.toString("base64");
            const fitPicSrc = `data:image/png;base64,${fitPicBase64}`;
            setPostPic(fitPicSrc);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPostDetails();
  }, [postId]);

console.log(matchPostData)
const downloadPDF = (pdf) => {
    const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = "vct_illustration.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  if (!matchPostData) {
    return <div>Loading...</div>;
  }

  return (
    <Window>
      <H1>MAKE IT YOURSELF</H1>
      <Container>
      <Image src={postPic} alt="User Icon" />
      <Text>{matchPostData.garmentType}</Text>
      <p>{matchPostData.title}</p>
      <p>{matchPostData.description}</p>     
      <p><Link href="sourceLink" rel="noopener noreferrer">{matchPostData.sourceLink}</Link></p>
      {matchPostData.processFile ? (
        <Button onClick={() => downloadPDF(matchPostData.processFile)}>
          // PROCESS.DOWNLOAD
        </Button>
      ) : null}
      </Container>
    </Window>
  );
};

const Image = styled.img`
  position: fixed;
  bottom: 0px;
  left: 20px;
  right: 50px;
  z-index: 1;
  width: auto;
  height: 80vh;
`;

const Text = styled.h2`
    text-transform: uppercase;
    letter-spacing: 10px;
`

const Window = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  height: 100vh;
  width: 100vw;
  padding: 20px;
  overflow: auto;
`;

const Container =styled.div`
  background-color: transparent;
  margin-bottom: 0px;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 25px;
  padding: 10px;
`

const H1 =styled.h1`
    z-index: 9999;
`

const Button = styled.button`
  padding: 15px 100px;
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
`

const Link = styled.a`
    color: inherit;
    text-decoration: none;
    &:hover {
        text-decoration: underline dotted 1px;
        text-underline-offset: 5px;
  }
`