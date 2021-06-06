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

const fontUrl = `http://${
  IS_PROD ? process.env.PROD_URL : process.env.DEV_URL
}/fonts`;

export const GlobalStyles = createGlobalStyle`

@font-face {
    font-family: 'gotham-book';
    src: url('${fontUrl}/gotham_book-webfont.eot');
    src: url('${fontUrl}/gotham_book-webfont.eot?#iefix') format('embedded-opentype'),
        url('${fontUrl}/gotham_book-webfont.woff2') format('woff2'),
        url('${fontUrl}/gotham_book-webfont.woff') format('woff'),
        url('${fontUrl}/gotham_book-webfont.ttf') format('truetype');
    font-weight: 100;
    font-style: normal;
}

@font-face {
    font-family: 'gotham-medium';
    src: url('${fontUrl}/gotham-medium-webfont.eot');
    src: url('${fontUrl}/gotham-medium-webfont.eot?#iefix') format('embedded-opentype'),
        url('${fontUrl}/gotham-medium-webfont.woff2') format('woff2'),
        url('${fontUrl}/gotham-medium-webfont.woff') format('woff'),
        url('${fontUrl}/gotham-medium-webfont.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
}

@font-face {
    font-family: 'gotham-bold';
    src: url('${fontUrl}/gotham-bold-webfont.eot');
    src: url('${fontUrl}/gotham-bold-webfont.eot?#iefix') format('embedded-opentype'),
        url('${fontUrl}/gotham-bold-webfont.woff2') format('woff2'),
        url('${fontUrl}/gotham-bold-webfont.woff') format('woff'),
        url('${fontUrl}/gotham-bold-webfont.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
}

  :root {
    // Gotham
    --gotham: 'gotham-book', sans-serif;
    --gotham-medium: 'gotham-medium', sans-serif;
    --gotham-bold: 'gotham-bold', sans-serif;
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
    font-family: var(--gotham);
    display: grid;
    grid-template-rows: max-content 1fr max-content;
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
    fontFamily: [`gotham`, `sans-serif`],
  },
});
