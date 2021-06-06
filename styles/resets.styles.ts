import { createMuiTheme } from '@material-ui/core';
import { rem } from 'polished';
import { createGlobalStyle, css } from 'styled-components';
import type {
  CSS,
  FlexAlignment,
  FlexDirection,
  FlexWrap,
} from '../types/style.types';
import { activeStates } from './helper.styles';

const IS_PROD = process.env.NODE_ENV === `production`;

const fontUrls = ['Regular', 'Medium', 'SemiBold', `Bold`].reduce(
  (all, current) => ({
    ...all,
    [current]: `http://${
      IS_PROD ? process.env.PROD_URL : process.env.DEV_URL
    }/fonts/DancingScript-${current}.ttf`,
  }),
  { Regular: ``, Medium: ``, SemiBold: ``, Bold: `` }
);

export const GlobalStyles = createGlobalStyle`

  @font-face {
    font-family: 'dancing-regular';
    src: url('${fontUrls.Regular}') format('truetype');
    font-weight: 100;
    font-style: normal;
  };

  @font-face {
    font-family: 'dancing-medium';
    src: url('${fontUrls.Medium}') format('truetype');
    font-weight: bold;
    font-style: normal;
  };

  @font-face {
    font-family: 'dancing-semibold';
    src: url('${fontUrls.SemiBold}') format('truetype');
    font-weight: bold;
    font-style: normal;
  };

  @font-face {
    font-family: 'dancing-bold';
    src: url('${fontUrls.Bold}') format('truetype');
    font-weight: bold;
    font-style: normal;
  };

  :root {
    --font-regular: 'dancing-regular', Helvetica, sans-serif;
    --font-medium: 'dancing-medium', Helvetica, sans-serif;
    --font-bold: 'dancing-bold', Helvetica, sans-serif;
    --font-semibold: 'dancing-semibold', Helvetica, sans-serif;
    --red: #E50914;
    --red-hover: #7F0000;
    --gray: #757575;
    --transition-fast: .175s ease-in-out;
    --square: 5px;
  }


  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--font-regular);
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
    color: black;
    font-family: var(----font)
  }

`;

export const styledComponentsTheme = {
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

export const materialUiTheme = createMuiTheme({
  typography: {
    h1: {
      fontFamily: `dancing-bold, Helvetica, sans-serif`,
      fontSize: `70px`,
    },
    fontFamily: `dancing-regular, Helvetica, sans-serif`,
  },
});
