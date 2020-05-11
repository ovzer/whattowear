import React from 'react';
import { Paper, PaperProps, makeStyles, fade, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    backgroundColor: fade(theme.palette.common.white, 0.03),
  },
}));

export const CustomPaper: React.FC<PaperProps> = (props) => {
  const classes = useStyles();
  return (
    <Paper square variant="outlined" className={classes.paper} {...props}>{props.children}</Paper>
  );
};
