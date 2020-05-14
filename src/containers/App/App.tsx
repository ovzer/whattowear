import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, ThemeProvider, CssBaseline, makeStyles, Box, useMediaQuery } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { Menu } from '../../components/Menu';
import { CenterContent } from '../../containers/CenterContent/CenterContent';
import { theme } from '../../theme';

const useStyles = makeStyles({
  appBar: { boxShadow: 'none' },
  pageBackground: { background: 'radial-gradient(circle at bottom, hsla(206, 54%, 20%, 1) 0%, hsla(206, 34%, 10%, 1) 100%)' },
});

export const App = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const isNarrow = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={classes.pageBackground} minHeight="100vh">
        <AppBar position="static" color="transparent" className={classes.appBar}>
          <Toolbar>
            {!isNarrow && (
              <IconButton edge="start" color="inherit" onClick={() => setMenuOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        <Menu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
        <CenterContent />
      </Box>
    </ThemeProvider>
  );
};
