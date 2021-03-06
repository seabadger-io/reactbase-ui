import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const splashScreen = ({ title }) => {
  const styles = {
    paper: {
      width: '90%',
      maxWidth: '640px',
      padding: '15px',
      justifyContent: 'center',
      height: 'fit-content',
    },
    textBlock: {
      margin: '15px 0',
    },
  };

  return (
    <Paper style={styles.paper}>
      <Typography variant="display1" component="h3">
        {`Welcome to ${title}`}
      </Typography>
      <Typography variant="body1" component="p" style={styles.textBlock}>
        Just a moment, the application is loading...
      </Typography>
      <LinearProgress />
    </Paper>
  );
};

splashScreen.propTypes = {
  title: PropTypes.string.isRequired,
};

export default splashScreen;
