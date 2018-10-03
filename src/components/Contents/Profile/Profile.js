import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isValid as inputIsValid } from '../../InputValidator/InputValidator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import * as actions from '../../../redux/actions';
import UsernameChangeDialog from '../../Dialogs/UsernameChange/UsernameChange';
import ProfilePhotoDialog from '../../Dialogs/ProfilePhoto/ProfilePhoto';

class Profile extends Component {
  state = {
    activeHelper: null,
    formValues: null,
    formChanged: false,
    formErrors: {},
    outOfSync: false,
    usernameChangeOpen: false,
    profilePhotoOpen: false,
  }

  formValidations = {
    about: {
      maxLength: 2048,
    },
    location: {
      maxLength: 256,
    }
  }

  styles = {
    main: {
      flexGrow: 1,
      maxWidth: '800px',
      padding: '15px',
      justifyContent: 'center',
      height: 'fit-content'
    },
  }

  componentWillMount() {
    this.setState({ formValues: { ...this.props.profile.profile }});
  }

  componentDidUpdate(prevProps) {
    if (!this.state.outOfSync) {
      let profileHasChanges = false;
      for (const k of (Object.keys(this.props.profile.profile))) {
        if (prevProps.profile.profile[k] !== this.props.profile.profile[k]) {
          profileHasChanges = true;
          if (profileHasChanges) break;
        }
      }
      if (profileHasChanges) {
        if (!this.state.formChanged) {
          this.setState({ formValues: { ...this.props.profile.profile }});
        } else {
          this.setState({ outOfSync: true });
        }
      }
    }
  }

  hiddenHelperText = (name, helperText) => {
    return {
      helperText: this.state.activeHelper === name || this.state.formErrors[name]
        ? helperText : null,
      inputProps: {
        onFocus: () => this.setState({ activeHelper: name }),
        onBlur: () => this.setState({ activeHelper: null }),
      }
    }
  }

  texfieldChangeHandler = (e) => {
    const formValues = { ...this.state.formValues };
    const formErrors = { ...this.state.formErrors };
    const name = e.target.name;
    const value = e.target.value;
    formValues[name] = value;
    if (typeof this.formValidations[name] === 'object') {
      formErrors[name] = !inputIsValid(value,
        this.formValidations[name]);
    } else {
      formErrors[name] = false;
    }
    this.setState({
      formValues: formValues,
      formErrors: formErrors,
      formChanged: true,
    });
    e.preventDefault();
  }

  profilePhotoCloseHandler = (updatedImage) => {
    const state = { ...this.state };
    if (updatedImage) {
      state.formValues.profilePhoto = updatedImage.src;
      state.formChanged = true;
    }
    this.setState({ ...state, profilePhotoOpen: false });
  };

  validateForm(cb = () => {}) {
    const formErrors = { ...this.state.formErrors };
    for (const field of Object.keys(this.formValidations)) {
      formErrors[field] = !inputIsValid(this.state.formValues[field],
        this.formValidations[field]);
    }
    this.setState({ formErrors: formErrors }, cb);
  }

  formHasErrors() {
    return Object.keys(this.state.formErrors) // check all error fields
      .map((k) => this.state.formErrors[k]) // map key to value
      .reduce((acc, cur) => acc || cur, false); // reduce values so it's true is any of them true
  }

  submitHandler = (e) => {
    this.validateForm(() => {      
      if (!this.formHasErrors()) {
        this.setState({ formChanged: false });
        const profile = {
          location: '',
          about: '',
          profilePhoto: '',
          ...this.state.formValues
        };
        this.props.changeProfile(profile);
      }
    });
    e.preventDefault();
  }

  render() {
    return (
      <Paper style={this.styles.main}>
        <Typography variant="display1" component="h3" style={{ margin: '15px' }}>
          Your profile
        </Typography>
        <Dialog
          open={this.state.outOfSync}
          onClose={() => { this.setState({ outOfSync: false })}}
          aria-labelledby="oos-dialog-title"
          aria-describedby="oos-dialog-description"
        >
          <DialogTitle id="oos-dialog-title">Outdated content</DialogTitle>
          <DialogContent>
            <DialogContentText id="oos-dialog-description">
              Your profile was updated on the server and you are editing an
              outdated copy. If you save your changes, it will overwrite the
              changes on the server. If you don't mind loosing the changes you
              made here, just reload this page.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => { this.setState({ outOfSync: false })}}
              color="primary"
            >
              Understood
            </Button>
          </DialogActions>
        </Dialog>
        {this.props.profile.hasLoaded ? 
        (<Grid
            container
            spacing={16}
            component="form"
            onSubmit={this.submitHandler}
            noValidate
          >
            <Grid item container xs={12} sm={4} justify="center">
              {/* profile photo */}
              <div
                style={{
                  width: '128px',
                  height: '128px',
                  cursor: "pointer"
                }}
                onClick={() => { this.setState({ profilePhotoOpen: true })}}
                tabIndex="1"
                role="button"
              >
                <img
                  src={this.state.formValues.profilePhoto}
                  alt="Profile"
                  title="Profile photo"
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                />
              </div>
            </Grid>
            <Grid item container xs={12} sm={8} justify="center">
              {/* user details  */}
              <Grid item container xs={12}>
                <Grid item xs={6} style={{ maxWidth: '100%', flexGrow: 1, alignSelf: 'center' }}>
                  You are logged in as:
                  <span style={{ fontWeight: 'bold', margin: '0 10px' }}>
                    {this.props.auth.userMeta.username}
                  </span>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    color="primary"
                    onClick={() => { this.setState({ usernameChangeOpen: true })}}
                    aria-label="Change username"
                  >
                    Change username
                  </Button>
                </Grid>
              </Grid>
              <UsernameChangeDialog
                open={this.state.usernameChangeOpen}
                username={this.props.auth.userMeta.username}
                onClose={() => { this.setState({ usernameChangeOpen: false });}}
              />
              <ProfilePhotoDialog
                open={this.state.profilePhotoOpen}
                onClose={this.profilePhotoCloseHandler}
              />
              <TextField
                id="location-input"
                name="location"
                label="Location"
                placeholder="Location"
                value={this.state.formValues.location || ''}
                onChange={this.texfieldChangeHandler}
                fullWidth
                {...this.hiddenHelperText(
                  'location',
                  'If you provide us your location, your potential customers can find you more easily. Maximum 256 characters'
                )}
                error={this.state.formErrors.location || false}
              />
              <TextField
                id="about-input"
                name="about"
                label="About"
                placeholder="About"
                value={this.state.formValues.about || ''}
                onChange={this.texfieldChangeHandler}
                fullWidth
                multiline
                {...this.hiddenHelperText(
                  'about',
                  'Must be maximum 2048 characters long'
                )}
                error={this.state.formErrors.about}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={{ margin: '5px' }}
                disabled={!this.state.formChanged}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        ) : <LinearProgress varian="query" style={{ margin: '15px' }} /> }
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={this.state.formChanged}
        >
          <SnackbarContent
            message="There are unsaved changes"
            action={[
              <Zoom in timeout={500} key="save-button">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.submitHandler}
                >
                  Save
                </Button>
              </Zoom>
            ]}
          />
        </Snackbar>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    profile: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeProfile: (profile) => dispatch(actions.profileChange(profile)),
    setContinueUrl: (url) => dispatch(actions.setContinueUrl(url)),
  };
};

export { Profile as DisconnectedProfile };
export default connect(mapStateToProps, mapDispatchToProps)(Profile);