import React from 'react';
import { Drawer, Box, SwipeableDrawer } from '@material-ui/core';

const drawerWidth = 300;

export interface IMenuProps {
  isMenuOpen: boolean;
  setMenuOpen: Function;
}

export const Menu: React.FC<IMenuProps> = (props) => {
  const { isMenuOpen, setMenuOpen } = props;

  return (
    <SwipeableDrawer
      open={isMenuOpen}
      onOpen={() => setMenuOpen(true)}
      onClose={() => setMenuOpen(false)}
    >
      <Box width={drawerWidth} p={2}>
        Hei
      </Box>
    </SwipeableDrawer>
  );
};
