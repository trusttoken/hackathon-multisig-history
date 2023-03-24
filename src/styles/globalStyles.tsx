import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

export const GlobalStyles = createGlobalStyle`
*, *:before, *:after {
    font-family: 'Manrope', Helvetica, Arial, sans-serif;
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    height: 100%;
  }

  html {
    font-size: 16px;
    min-height: 100%;
    min-height: fill-available;
    background-color: ${theme.colors.White};
  }

  body {
    font-family: 'Manrope', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: ${theme.colors.HeavyMetal};
    max-width: 100%;
    min-height: 100%;
    min-height: fill-available;
    overflow-x: hidden;
  }

  h1, h2, h3 {
    margin: 0;
    padding: 0;
    font-weight: 800;
    color: ${theme.colors.Text03};
  }

  h1 {
    font-size: 32px;
    line-height: 40px;
  }

  h2 {
    font-size: 24px;
    line-height: 32px;
  }

  h3 {
    font-size: 20px;
    line-height: 24px;
  }

  p {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }

  button, a {
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
  }
`;
