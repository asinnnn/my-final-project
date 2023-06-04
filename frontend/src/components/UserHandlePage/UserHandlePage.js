import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";

export const UserHandlePage = () => {
  const [matchUserData, setMatchUserData] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [textHovered, setTextHovered] = useState(false);

  const { username } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/users/${username}`);
        const data = await response.json();

        if (response.ok) {
          setMatchUserData(data.data);
          const iconBase64 = data.data.icon.toString("base64");
          const iconSrc = `data:image/png;base64,${iconBase64}`;
          setProfilePic(iconSrc);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchUserData();
  }, [username]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const textMouseEnter = () => {
    setTextHovered(true);
  };

  const textMouseLeave = () => {
    setTextHovered(false);
  };

  if (!matchUserData) {
    return <div>Loading...</div>;
  }

  return (
    <Window>
      <Container
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <Text
        onMouseEnter={textMouseEnter}
        onMouseLeave={textMouseLeave}
        isHovered={textHovered}>
          {matchUserData.username}</Text>
        <p>Email: {matchUserData.email}</p>
        <p>Bio: {matchUserData.bio}</p>
      </Container>

      {isHovered ? (
      <PopUpPic>
        {profilePic ? <Image src={profilePic} alt="User Icon" /> : null}
      </PopUpPic>) : null}
    </Window>
  );
};

const Window = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
  padding: 20px;
`

const Image = styled.img`
  width: auto;
  height: 80vh;
`;

const Container =styled.div`
  background-color: transparent;
`
const PopUpPic =styled.div`
  padding: 30px;
  margin: 20px;
`

const animateLetterSpacing = keyframes`
  from {
    letter-spacing: normal;

  }
  to {
    /* font-family: Helvetica; */
    letter-spacing: 50px;
  }
`;

const Text = styled.h1`
  letter-spacing: normal;
  transition: letter-spacing 0.1 ease;
  &:hover {
    animation: ${animateLetterSpacing} 0.5 forwards;
  }
`;

