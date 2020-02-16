import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, ThemeProvider, CssBaseline } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { Menu } from '../../components/Menu';
import { CenterContent } from '../../containers/CenterContent/CenterContent';
import { theme } from '../../theme';

export const App = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
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
