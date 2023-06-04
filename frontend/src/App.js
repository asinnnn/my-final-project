import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import {
  PostUploadPage,
  CreateUserPage,
  UserHandlePage,
  IndexPage,
  PostDetailsPage,
} from "./components/index";
import { GlobalStyles } from "./GlobalStyles";

const App = (props) => {
  return (
    <>
      <GlobalStyles />
      <AppPage>
        <div>
          <NavBar>
            <NavMenu>
            <Logo>
              DEEP//CUT
            </Logo>
              <NavMenuItem>
                <NavLink href="/index">HOME</NavLink>
              </NavMenuItem>
              <NavMenuItem>
                <NavLink href="/post/upload">UPLOAD</NavLink>
              </NavMenuItem>
              <NavMenuItem>
                <NavLink href="/user/newuser">CREATE</NavLink>
              </NavMenuItem>
              <NavMenuItem>
                <NavLink href="/users/bellahadid">USER</NavLink>
              </NavMenuItem>
            </NavMenu>
          </NavBar>
          {/* Rest of your content */}
        </div>
        <Routes>
          {/* <Route path="/" element={<HomeFeed />} /> */}
          <Route path="/index" element={<IndexPage />} />
          <Route path="/post/upload" element={<PostUploadPage />} />
          <Route path="/posts/:postId" element={<PostDetailsPage />} />
          <Route path="/user/newuser" element={<CreateUserPage />} />
          <Route path="/users/:username" element={<UserHandlePage />} />
        </Routes>
      </AppPage>
    </>
  );
  //   }
};

const AppPage = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export default App;

const NavBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 75%;
  background-color: transparent;
  z-index: 999;
  display: flex;
  justify-content: flex-end;
`;

const NavMenu = styled.ul`
  display: flex;
  justify-content: flex-end;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 990;
`;

const NavMenuItem = styled.li`
  margin-right: 20px;
  z-index: 990;
`;

const NavLink = styled.a`
  color: red;
  text-decoration: none;
  z-index: 990;
`;

const Logo = styled.h2`
  font-size: 27px;
  font-family: Anthony;
  margin-top: -5px;
  margin-right: 150px;
`;