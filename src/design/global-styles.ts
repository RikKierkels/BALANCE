import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@400;500&display=swap');
  
  html {
    box-sizing: border-box;
    font-size: ${({ theme }) => theme.font.sizes.md};
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
  textarea,
  button {
    margin: 0;
    padding: 0;
    border: 1px solid transparent;
  }

  button {
    cursor: pointer;
  }

  body {
    margin: 0;
    background-color: ${({ theme }) => theme.colors.background};
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