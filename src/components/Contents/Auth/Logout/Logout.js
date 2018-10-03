import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { auth } from '../../../../firebase';
import * as routes from '../../../ContentRouter/routes';

class Logout extends React.Component {
  componentDidMount() {
    auth.signOut()
    .then(() => {
      this.props.history.push(routes.HOME);
    });
  }

  render() {
    return (
      <Paper style={{ width: '100%', maxWidth: '560px' }}>
        <Typography variant="body1" align="center">
          Logging out...
        </Typography>
        <LinearProgress variant="query" style={{ margin: '15px' }} />
      </Paper>
    );
  }
}

export default Logout;
