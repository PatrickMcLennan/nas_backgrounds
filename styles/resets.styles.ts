import { rem } from 'polished';
import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';
import type {
  CSS,
  FlexAlignment,
  FlexDirection,
  FlexWrap,
} from '../types/style.types';
import { activeStates, mobile, tablet } from './helper.styles';

export const GlobalStyles = createGlobalStyle`

  :root {
    --font: Helvetica, sans-serif;
    --red: #E50914;
    --red-hover: #7F0000;
    --gray: #757575;
    --transition-fast: .175s ease-in-out;
    --square: 5px;
  }
  ${reset};
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  button,
  a,
  input[type="submit"] {
    border: none;
    cursor: pointer;
  }
  button,
  a {
    color: inherit;
    text-decoration: none;
    ${activeStates(css`
      color: inherit;
    `)}
  }
  input[type="text"], 
  input[type="email"], 
  input[type="password"] {
    border: ${rem(`1px`)} solid black;
    transition: border var(--transition-fast);
    ${activeStates(css`
      border: ${rem(`1px`)} solid var(--red);
    `)}
  }
  #__next {
    min-height: 100vh;
    width: 100vw;
    position: relative;
    overflow-x: hidden;
    display: grid;  
    grid-template-areas:
      "header"
      "main"
      "footer";
    grid-template-rows: max-content 1fr max-content;
    color: black;
    font-family: var(----font)
  }
  
  ${[`header`, `main`, `footer`].map(
    (region) => css`
      .${region} {
        grid-area: ${region};
        padding: 0 7.5%;
        ${tablet(css`
          padding: 0 3%;
        `)}
        ${mobile(css`
          padding: 0 3%;
        `)}
      }
    `
  )}
`;

export const theme = {
  flex: (
    jc: FlexAlignment = `center`,
    ai: FlexAlignment = `center`,
    fd: FlexDirection = `row`,
    fw: FlexWrap = `nowrap`
  ): CSS => css`
    display: flex;
    justify-content: ${jc};
    align-items: ${ai};
    flex-direction: ${fd};
    flex-wrap: ${fw};
  `,
  posCenter: css`
    display: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};
