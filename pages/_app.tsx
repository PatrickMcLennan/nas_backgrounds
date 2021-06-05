import { ThemeProvider as StyledComponentsTheme } from 'styled-components';
import { ThemeProvider as MaterialUiTheme } from '@material-ui/core/styles';
import { createMuiTheme, PaletteType } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from '../components/Footer';
import Header from '../components/Header';
import {
  GlobalStyles,
  materialUiTheme,
  styledComponentsTheme,
} from '../styles/resets.styles';
import { useState } from 'react';
import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange,
} from '@material-ui/core/colors';

export default function App({ Component, pageProps }): JSX.Element {
  const [colorMode, setColorMode] = useState(`dark`);
  const isDark = colorMode === `dark`;
  const mainPrimaryColor = isDark ? orange[500] : lightBlue[500];
  const mainSecondaryColor = isDark ? deepOrange[900] : deepPurple[500];

  const changeTheme = () =>
    setColorMode((prevMode) => (prevMode === `light` ? `dark` : `light`));

  return (
    <>
      <GlobalStyles />
      <StyledComponentsTheme theme={styledComponentsTheme}>
        <CssBaseline />
        <MaterialUiTheme
          theme={{
            ...createMuiTheme({
              ...materialUiTheme,
              palette: {
                type: (colorMode as PaletteType),
                primary: {
                  main: mainPrimaryColor,
                },
                secondary: {
                  main: mainSecondaryColor,
                },
              },
            }),
          }}
        >
          <Header isDark={isDark} changeTheme={changeTheme} />
          <main className="main">
            <Component {...pageProps} />
          </main>
          <Footer />
        </MaterialUiTheme>
      </StyledComponentsTheme>
    </>
  );
}
