import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  typography: {
    fontFamily: 'system,-apple-system,".SFNSText-Regular","San Francisco",Roboto,"Segoe UI","Helvetica Neue","Lucida Grande",sans-serif',
    fontSize: 16,
    fontWeightBold: 900,
    fontWeightMedium: 700,
    fontWeightRegular: 600,
    fontWeightLight: 400,
    body1: {
      letterSpacing: 2,
      fontStyle: 'italic',
      fontVariant:'small-caps',
    },
  },
  palette: {
    type: 'dark',
    primary: { main: 'hsl(35, 96%, 50%)' },
    secondary: { main: 'hsl(138, 38%, 50%)' },
    background: { default: 'hsl(206, 34%, 14%)', paper: 'hsl(206, 34%, 14%)' },
  },
});
