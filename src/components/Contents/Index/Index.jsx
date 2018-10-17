import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const style = {
  root: {
    width: '80%',
    maxWidth: '640px',
    padding: '16px',
  },
};

const index = () => (
  <Paper style={style.root}>
    <Typography variant="display3">
      Welcome
    </Typography>
    A React application frame with Firebase backend
  </Paper>
);

export default index;
