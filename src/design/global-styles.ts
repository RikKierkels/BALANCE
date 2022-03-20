import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: ${({ theme }) => theme.font.md};
    line-height: 1;
    color: ${({ theme }) => theme.colors.text};
  }

  html,
  input,
  textarea,
  button {
    font-family: 'Noto Sans Mono', monospace;
    font-weight: 400;
  }
  
  h2 {
    font-weight: 500;
  }
  
  p {
    line-height: 1.2;
  }

  input,
  button {
    border: 0;
  }

  button {
    cursor: pointer;
  }

  input,
  button,
  h1,
  h2,
  p,
  ul,
  ol,
  li {
    margin: 0;
    padding: 0;
  }

  ul,
  ol,
  li {
    list-style: none;
  }

  body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: ${({ theme }) => theme.colors.background};
  }
  
  #root {
    width: 100%;
    max-width: ${({ theme }) => theme.app.width};
    padding: 0 ${({ theme }) => theme.spacing.lg};
  }
  
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
`;

export default GlobalStyle;