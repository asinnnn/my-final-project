import { createGlobalStyle } from "styled-components";
import "./fonts.css";



export const GlobalStyles = createGlobalStyle`
  /* Reset some default styles */
  html,
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }

  /* Add your global styles here */
  /* For example: */
  body {
    /* background-color: red; */
    background-color: rgb(255, 253, 215);
    font-family: Arial, Helvetica, Anthony;
    /* color: rgb(255, 253, 215); */
    color: red
  }

  h1 {
    font-size: 75px;
    letter-spacing: 5px;
    font-family: "Anthony";

  }

  p {
    font-family: 'Helvetica';
    font-weight: 500px;
    font-size: 14px;
    letter-spacing: 1px;
  }

  Define any global CSS classes
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

