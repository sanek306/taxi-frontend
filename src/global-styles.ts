import reset from "styled-reset";
import {createGlobalStyle} from "./styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Maven+Pro');
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
      font-family: 'Maven Pro',sans-serif;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input, button {
    &:focus,
    &:active {
      outline: none;
    }
  }
`;

export default GlobalStyle;