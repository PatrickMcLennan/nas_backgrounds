import {
  AppBar,
  IconButton,
  makeStyles,
  Switch,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  toolbar: {
    padding: theme.spacing(1, 1),
  },
}));

export default function Header({ isDark, changeTheme }): JSX.Element {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title}>Backgrounds</Typography>
        <Switch
          checked={isDark}
          onChange={changeTheme}
          inputProps={{
            'aria-label': `Switch to ${isDark ? 'light' : 'dark'} mode`,
          }}
        />
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon fontSize="small" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
