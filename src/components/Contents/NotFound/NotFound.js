import React from 'react';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import * as routes from '../../ContentRouter/routes';

const notFound = (props) => {
  const styles = {
    paper: {
      maxWidth: '640px',
      padding: '15px',
      justifyContent: 'center',
      height: 'fit-content'
    },
    textBlock: {
      margin: '15px 0'
    },
  };

  const go = (path) => {
    props.history.push(path);
  };

  return (
    <Paper style={styles.paper}>
      <Typography variant="display1" component="h3">
        Not found
      </Typography>
      <Typography variant="body1" component="p" style={styles.textBlock}>
        The content you are trying to access is not available. This may happen
        when you followed a broken link or trying to access some content which
        is not available to you.<br/>
        Note: some pages are only available for logged in users
      </Typography>
      <Typography variant="body1" component="p" style={styles.textBlock}>
        To browse the latest contents please visit the homepage.
      </Typography>
      <Grid container justify="center">
        <Button variant="contained" color="primary" onClick={() => go(routes.HOME)}>
          Visit the homepage
        </Button>
      </Grid>
    </Paper>
  );
};

export { notFound as DisconnectedNotFound };
export default withRouter(notFound);
