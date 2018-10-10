import React from 'react';

import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import Aux from '../../../HOC/Aux';
import { auth, providers } from '../../../../firebase';
import * as routes from '../../../ContentRouter/routes';

class Login extends React.Component {
  state = {
    error: null,
  }

  componentDidMount() {
    this.startLogin();
  }

  startLogin = () => {
    this.setState({ error: null });
    auth.signInWithPopup(providers.google)
      .then(() => {
        this.loginWasSuccessful();
      })
      .catch((err) => {
        this.loginFailed(err);
      });
  }

  loginWasSuccessful = () => {
    this.setState({ error: null });
    const {
      history: {
        push,
      },
    } = this.props;
    push(routes.AUTH_REDIRECT);
  }

  loginFailed = (error) => {
    // TODO: handle auth/account-exists-with-different-credential
    //  error code if multiple providers are implemented
    let errorMsg;
    switch (error.code) {
      case 'auth/cancelled-popup-request':
      case 'auth/popup-closed-by-user':
        errorMsg = 'The login process was interrupted';
        break;
      case 'auth/popup-blocked':
        errorMsg = 'The login popup window was blocked';
        break;
      default:
        errorMsg = 'There was an error while trying to login';
    }
    this.setState({ error: errorMsg });
  }

  render() {
    const { error } = this.state;
    return (
      <Paper style={{ width: '100%', maxWidth: '560px', textAlign: 'center' }}>
        {
          !error ? (
            <Aux>
              <Typography variant="body1" align="center">
                Login in progress...
              </Typography>
              <Typography variant="caption" align="center">
                Please make sure your browser doesn&apos;t block pop-ups
              </Typography>
              <LinearProgress variant="query" style={{ margin: '15px' }} />
            </Aux>
          ) : (
            <Aux>
              <Typography variant="body1" align="center">
                {error}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={this.startLogin}
                style={{ margin: '15px' }}
              >
                Retry login
              </Button>
            </Aux>
          )
        }
      </Paper>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
