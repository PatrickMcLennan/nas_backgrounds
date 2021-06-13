import { ThemeProvider as StyledComponentsTheme } from 'styled-components';
import {
  makeStyles,
  Theme,
  ThemeProvider as MaterialUiTheme,
} from '@material-ui/core/styles';
import { Box, createMuiTheme } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from '../components/Footer';
import Header from '../components/Header';
import {
  materialUiTheme,
  styledComponentsTheme,
} from '../styles/resets.styles';
import { useEffect, useState } from 'react';
import BreadCrumbs from '../components/BreadCrumbs';
import { IS_CLIENT } from '../constants';

const useStyles = makeStyles((theme: Theme) => ({
  layout: {
    padding: theme.spacing(0, 1),
    [theme.breakpoints.up(`md`)]: {
      padding: theme.spacing(0, 2.5),
    },
    [theme.breakpoints.up(`lg`)]: {
      padding: `0 5%`,
    },
  },
}));

export default function App({ Component, pageProps }): JSX.Element {
  const [colorMode, setColorMode] = useState(`dark`);
  const isDark = colorMode === `dark`;
  const classes = useStyles();

  const changeTheme = () => {
    const newMode = isDark ? `light` : `dark`;
    setColorMode(newMode);
    if (IS_CLIENT)
      return window.localStorage.setItem(`backgroundsColor`, newMode);
    else return;
  };

  useEffect(() => {
    if (IS_CLIENT) {
      const savedColorPreference =
        window.localStorage.getItem(`backgroundsColor`);
      if (savedColorPreference) return setColorMode(savedColorPreference);
      else return;
    }
  }, []);

  return (
    <StyledComponentsTheme theme={styledComponentsTheme}>
      <MaterialUiTheme
        theme={{
          ...createMuiTheme({
            ...materialUiTheme,
            palette: {
              type: isDark ? `dark` : `light`,
            },
          }),
        }}
      >
        <CssBaseline />
        <Header isDark={isDark} changeTheme={changeTheme} />
        <Box component="main" className="main">
          <BreadCrumbs />
          <Box className={classes.layout}>
            <Component {...pageProps} />
          </Box>
        </Box>
        <Footer />
      </MaterialUiTheme>
    </StyledComponentsTheme>
  );
}
