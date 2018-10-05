import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';

const themeProvider = (props) => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        light: lightBlue['600'],
        main: lightBlue['800'],
        dark: lightBlue['900'],
        contrastText: '#fff',
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      {props.children}
    </MuiThemeProvider>
  );
};

export default themeProvider;
