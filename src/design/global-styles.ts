import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@400;500&display=swap');
  
  html {
    box-sizing: border-box;
    font-size: ${({ theme }) => theme.font.md};
    line-height: 1;
  }

  html,
  input,
  textarea,
  button {
    font-family: 'Noto Sans Mono', monospace;
    font-weight: 400;
  }

  input,
  button {
    margin: 0;
    padding: 0;
    border: 0;
  }

  button {
    cursor: pointer;
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
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
  
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  h1,
  h2,
  p {
    margin: 0;
    padding: 0;
  }

  ul,
  ol,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;

export default GlobalStyle;