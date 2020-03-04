import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  typography: {
    fontFamily: '\'Montserrat\', sans-serif',
    'fontSize': 14,
    'fontWeightLight': 300,
    'fontWeightRegular': 300,
    'fontWeightMedium': 500,
    'fontWeightBold': 700,
  },
  palette: {
    type: 'dark',
    primary: { main: 'hsl(35, 96%, 50%)' },
    secondary: { main: 'hsl(138, 38%, 50%)' },
    background: {
      default: 'hsl(206, 34%, 14%)',
      paper: 'hsl(207, 35%, 16%)',
    },

  },

});
