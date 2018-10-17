import React from 'react';
import { withTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

import Credits from './Credits/Credits';

const Footer = ({ title, theme }) => {
  const styles = {
    footer: {
      display: 'flex',
      flexFlow: 'row wrap',
      padding: '8px',
      minHeight: '32px',
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
    },
  };

  return (
    <Paper component="footer" style={styles.footer} elevation={1} square>
      <Credits title={title} />
    </Paper>
  );
};

Footer.propTypes = {
  theme: PropTypes.shape({
    palette: PropTypes.shape({
      primary: PropTypes.shape({
        contrastText: PropTypes.string.isRequired,
        main: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
  title: PropTypes.string.isRequired,
};

export default withTheme()(Footer);
