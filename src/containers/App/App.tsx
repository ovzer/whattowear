import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, ThemeProvider, CssBaseline, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { Menu } from '../../components/Menu';
import { CenterContent } from '../../containers/CenterContent/CenterContent';
import { theme } from '../../theme';

const useStyles = makeStyles({
  appBar: {
    boxShadow: 'none'
  }
})

export const App = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="transparent" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setMenuOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
      <CenterContent />
    </ThemeProvider>
  );
};
