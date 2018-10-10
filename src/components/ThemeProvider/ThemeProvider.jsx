import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import PropTypes from 'prop-types';

const themeProvider = ({ children }) => {
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
      {children}
    </MuiThemeProvider>
  );
};

themeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

themeProvider.defaultProps = {
  children: null,
};

export default themeProvider;
