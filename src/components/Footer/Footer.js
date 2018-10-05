import React from 'react';
import { withTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Credits from './Credits/Credits';

const Footer = (props) => {
  const { theme } = props;

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
      <Credits />
    </Paper>
  );
};

export default withTheme()(Footer);
