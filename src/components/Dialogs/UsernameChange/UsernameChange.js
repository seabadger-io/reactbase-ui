import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import { functions as fbFunctions } from '../../../firebase';
import LinearProgress from '@material-ui/core/LinearProgress';
import { isValid as inputIsValid } from '../../InputValidator/InputValidator';

class UsernameChange extends Component {
  state = {
    open: false,
    inProgress: false,
    error: null,
    changed: false,
    newUsername: '',
    locallyChanged: false,
    isValid: true,
  };

  componentWillMount() {
    this.setState({ newUsername: this.props.username, open: this.props.open });
  }

  componentDidUpdate(prevProps) {
    if (this.props.username !== prevProps.username ||
    this.props.open !== prevProps.open) {
      this.setState({ newUsername: this.props.username, open: this.props.open });
    }
  }

  changeUsername = () => {
    this.setState({ inProgress: true, error: null, changed: false });
    const change = fbFunctions.httpsCallable('changeUsername');
    change({ username: this.state.newUsername })
    .then(() => {
      this.setState({
        inProgress: false,
        error: null,
        changed: true,
        locallyChanged: false,
      });
    })
    .catch((err) => {
      this.setState({ inProgress: false, error: err });
    });
  };

  usernameChangeHandler = (event) => {
    this.setState({
      newUsername: event.currentTarget.value,
      locallyChanged: true,
      isValid: inputIsValid(event.currentTarget.value, {
        matches: /^[a-zA-Z0-9_-]{4,24}$/,
      })
    });
  };

  closeHandler = () => {
    if (typeof this.props.onClose === 'function') {
      this.props.onClose();
    }
    this.setState({
      open: false,
      error: null,
      locallyChanged: false,
      changed: false,
    });
  };

  render() {
    return (
      <Dialog
        open={this.state.open}
        onClose={this.closeHandler}
        aria-labelledby="unc-dialog-title"
        aria-describedby="unc-dialog-description"
      >
        <DialogTitle id="unc-dialog-title">Username change</DialogTitle>
        <DialogContent>
          <DialogContentText id="unc-dialog-description">
            Your username is your unique identifier across this application.
            You can change it here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            placeholder="Username"
            onChange={this.usernameChangeHandler}
            value={this.state.newUsername}
            fullWidth
            required
            error={!this.state.isValid}
            aria-describedby="unc-input-feedback"
          />
          <DialogContentText id="unc-input-feedback" aria-live="assertive">
            {
              !this.state.isValid ? (
                <Typography variant="body1" style={{ color: red[900] }}>
                  The username must be minimum 4, maximum 24 characters, containing
                  only letters, numbers, underscore or dash.
                </Typography>
              ) : null
            }
            {
              this.state.error ? (
                <Typography variant="body2" style={{ color: red[900] }}>
                  There was an error: [{this.state.error.code}] {this.state.error.message}
                </Typography>
              ) : null
            }
            {
              this.state.changed ? (
                <Typography variant="body2"style={{ color: green[700] }}>
                  Your username was changed successfully
                </Typography>
              ) : null
            }
            {
              this.state.inProgress ? (
                <LinearProgress />
              ) : null
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.changeUsername}
            color="primary"
            disabled={!this.state.locallyChanged || this.state.inProgress}
          >
            Change username
          </Button>
          <Button
            onClick={this.closeHandler}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
};

export default UsernameChange;
