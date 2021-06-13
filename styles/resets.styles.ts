import { createMuiTheme } from '@material-ui/core';
import { rem } from 'polished';
import { createGlobalStyle, css } from 'styled-components';
import type {
  CSS,
  FlexAlignment,
  FlexDirection,
  FlexWrap,
} from '../types/style.types';

const IS_PROD = process.env.NODE_ENV === `production`;

const fontUrl = `http://${
  IS_PROD ? process.env.PROD_URL : process.env.DEV_URL
}/fonts`;

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

const gotham = {
  fontFamily: `gotham`,
  fontStyle: `normal`,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
  src: `
    url('${fontUrl}/gotham_book-webfont.eot'),
    url('${fontUrl}/gotham_book-webfont.eot?#iefix') format('embedded-opentype'),
    url('${fontUrl}/gotham_book-webfont.woff2') format('woff2'),
    url('${fontUrl}/gotham_book-webfont.woff') format('woff'),
    url('${fontUrl}/gotham_book-webfont.ttf') format('truetype');
  `,
};

const gothamMedium = {
  fontFamily: `gothamMedium`,
  fontStyle: `normal`,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
  src: `
    url('${fontUrl}/gotham-medium-webfont.eot'),
    url('${fontUrl}/gotham-medium-webfont.eot?#iefix') format('embedded-opentype'),
    url('${fontUrl}/gotham-medium-webfont.woff2') format('woff2'),
    url('${fontUrl}/gotham-medium-webfont.woff') format('woff'),
    url('${fontUrl}/gotham-medium-webfont.ttf') format('truetype');
  `,
};
const gothamBold = {
  fontFamily: `gothamBold`,
  fontStyle: `normal`,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
  src: `
    url('${fontUrl}/gotham-bold-webfont.eot'),
    url('${fontUrl}/gotham-bold-webfont.eot?#iefix') format('embedded-opentype'),
    url('${fontUrl}/gotham-bold-webfont.woff2') format('woff2'),
    url('${fontUrl}/gotham-bold-webfont.woff') format('woff'),
    url('${fontUrl}/gotham-bold-webfont.ttf') format('truetype');
  `,
};

export const materialUiTheme = createMuiTheme({
  typography: {
    fontFamily: [`gotham`, `sans-serif`].join(`,`),
    body1: {
      fontSize: 16,
      lineHeight: 1.25,
    },
    caption: {
      fontFamily: `gothamMedium, sansSerif`,
      fontSize: 14,
      lineHeight: 1.25,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [gotham, gothamMedium, gothamBold],
      },
    },
  },
  spacing: (amount) => `${amount}rem`,
});
