import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown, faPlus } from "@fortawesome/free-solid-svg-icons";

export const IndexPage = () => {
  const [hoveredPostId, setHoveredPostId] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [textHovered, setTextHovered] = useState(false);
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/index");
        const data = await response.json();
        if (response.ok) {
          const updatedPosts = data.data.map((post) => {
            const fitPicBase64 = post.fitPic.toString("base64");
            const fitPicSrc = `data:image/png;base64,${fitPicBase64}`;
            return { ...post, fitPic: fitPicSrc };
          });
          setPosts(updatedPosts);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleMouseEnter = (_id) => {
    setHoveredPostId(_id);
  };

  const handleMouseLeave = () => {
    setHoveredPostId(null);
  };

  const textMouseEnter = () => {
    setTextHovered(true);
  };

  const textMouseLeave = () => {
    setTextHovered(false);
  };

  const downloadPDF = (pdf) => {
    const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = "vct_illustration.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

const handleClick = (postId) => {
  navigate(`/posts/${postId}`);
};

  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <Window>
      <Container>
        <h1>CUT Index</h1>
        <IndexStrip>
          {posts.map((post, index) => (
            <React.Fragment key={post._id}>
              <Card
                onMouseEnter={() => handleMouseEnter(post._id)}
                onMouseLeave={handleMouseLeave}
              >
                <Text
                  onMouseEnter={textMouseEnter}
                  onMouseLeave={textMouseLeave}
                  isHovered={textHovered}
                >
                  {post.title}
                </Text>
                <p>"{post.description}"</p>
                <p>{post.username}</p>
                <p>{post.garmentType}</p>
                {post.sourceLink ? (
                  <p>
                    <Link href={post.sourceLink}>Source</Link>
                  </p>
                ) : null}

                <p>
                  <FontAwesomeIcon
                    icon={faPlus} 
                    onClick={() => handleClick(post._id)}
                    onMouseEnter={() => handleMouseEnter(post._id)}
                    onMouseLeave={handleMouseLeave}
                    style={{ cursor: "pointer" }}
                  />
                </p>
              </Card>
              {index !== posts.length - 1 && <Line />}
            </React.Fragment>
          ))}
        </IndexStrip>
        {posts.map((post) => (
          <Pic key={post._id}>
            {hoveredPostId === post._id && (
              <Image src={post.fitPic} alt="Fit Post" />
            )}
          </Pic>
        ))}
      </Container>
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
`;

const Image = styled.img`
  height: auto;
  width: 20vw;
`;

const Container = styled.div`
  background-color: transparent;
`;

const animateLetterSpacing = keyframes`
  from {
    letter-spacing: normal;
  }
  to {
    font-size: 30px;
    letter-spacing: 20px;
  }
`;

const Text = styled.h1`
  letter-spacing: normal;
  font-size: 30px;
  transition: letter-spacing 0.1s ease;
  &:hover {
    animation: ${animateLetterSpacing} 0.5s forwards;
  }
`;

const Card = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 70vw;
`;

const Pic = styled.div`
  position: fixed;
  top: 0px;
  right: 50px;
  z-index: 9900;
`;
const IndexStrip = styled.div`
  position: fixed;
  margin: 3px;
  margin-bottom: -10px;
`;

const Line = styled.hr`
  border: none;
  height: 1px;
  background-color: red;
  height: 2px;
  margin: 10px 0;
`;

const Link = styled.a`
    color: inherit;
    text-decoration: none;
    &:hover {
        text-decoration: underline dotted 1px;
        text-underline-offset: 5px;
  }
`