import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { auth } from '../../../../firebase';
import * as routes from '../../../ContentRouter/routes';

class Logout extends React.Component {
  componentDidMount() {
    auth.signOut()
      .then(() => {
        const { history } = this.props;
        history.push(routes.HOME);
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

Logout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Logout;
