import styled from 'styled-components';
import Link from 'next/link';
import { AppBar, Switch, Toolbar, Typography } from '@material-ui/core';
import { flexin } from '../styles/helper.styles';

const HeaderStyles = styled(AppBar)``;

export default function Header({ isDark, changeTheme }): JSX.Element {
  return (
    <HeaderStyles className="header" position="static">
      <Typography variant="h1">Backgrounds</Typography>
      <Switch checked={isDark} onChange={changeTheme} />
    </HeaderStyles>
  );
}
