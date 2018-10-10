/* eslint react/no-did-update-set-state: "off" */
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { red, green } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import * as actions from '../../../redux/actions';
import ProfilePhotoDialog from '../../Dialogs/ProfilePhoto/ProfilePhoto';
import UsernameChangeDialog from '../../Dialogs/UsernameChange/UsernameChange';
import { isValid as inputIsValid } from '../../InputValidator/InputValidator';
import userIcon from './usericon';

class Profile extends Component {
  state = {
    activeHelper: null,
    formValues: null,
    formChanged: false,
    formErrors: {},
    usernameChangeOpen: false,
    profilePhotoOpen: false,
    changeCompleted: false,
  }

  formValidations = {
    about: {
      maxLength: 2048,
    },
    location: {
      maxLength: 256,
    },
  }

  styles = {
    main: {
      flexGrow: 1,
      maxWidth: '800px',
      padding: '15px',
      justifyContent: 'center',
      height: 'fit-content',
    },
  }

  componentWillMount() {
    const {
      profile: {
        profile,
      },
    } = this.props;
    this.setState({ formValues: { ...profile } });
  }

  componentDidUpdate(prevProps) {
    const state = { ...this.state };
    const {
      profile: {
        profile,
        changeCompleted,
      },
    } = this.props;
    const profileHasChanges = Object.keys(profile)
      .map(k => prevProps.profile.profile[k] !== profile[k])
      .reduce((acc, cur) => acc && cur, true);
    if (profileHasChanges) {
      state.formValues = { ...profile };
    }
    let aChangeCompleted = false;
    if (prevProps.profile.changeCompleted === false
    && changeCompleted) {
      aChangeCompleted = true;
      state.formChanged = false;
      state.changeCompleted = true;
    }
    if (profileHasChanges || aChangeCompleted) {
      this.setState({ ...state });
    }
  }

  hiddenHelperText = (name, helperText) => {
    const { activeHelper, formErrors } = { ...this.state };
    return {
      helperText: activeHelper === name || formErrors[name]
        ? helperText : null,
      inputProps: {
        onFocus: () => this.setState({ activeHelper: name }),
        onBlur: () => this.setState({ activeHelper: null }),
      },
    };
  };

  texfieldChangeHandler = (e) => {
    const { formValues, formErrors } = { ...this.state };
    const { name, value } = e.target;
    formValues[name] = value;
    if (typeof this.formValidations[name] === 'object') {
      formErrors[name] = !inputIsValid(value,
        this.formValidations[name]);
    } else {
      formErrors[name] = false;
    }
    this.setState({
      formValues,
      formErrors,
      formChanged: true,
      changeCompleted: false,
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

  profilePhotoKeyboardHandler = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      this.setState({ profilePhotoOpen: true });
    }
  };

  submitHandler = (e) => {
    const { formValues } = this.state;
    const { changeProfile } = this.props;
    this.validateForm(() => {
      if (!this.formHasErrors()) {
        this.setState({ changeCompleted: false });
        const profile = {
          location: '',
          about: '',
          profilePhoto: '',
          ...formValues,
        };
        changeProfile(profile);
      }
    });
    e.preventDefault();
  }

  formHasErrors() {
    const { formErrors } = this.state;
    return Object.keys(formErrors) // check all error fields
      .map(k => formErrors[k]) // map key to value
      .reduce((acc, cur) => acc || cur, false); // reduce values so it's true is any of them true
  }

  validateForm(cb = () => {}) {
    const { formErrors, formValues } = this.state;
    Object.keys(this.formValidations).forEach((field) => {
      formErrors[field] = !inputIsValid(formValues[field],
        this.formValidations[field]);
    });
    this.setState({ formErrors }, cb);
  }

  render() {
    const {
      profile: {
        changeInProgress,
        changeError,
        hasLoaded,
        profile: {
          profilePhoto,
        },
      },
      auth: {
        userMeta,
      },
    } = this.props;
    const username = userMeta ? userMeta.username : '';
    const {
      formValues,
      formErrors,
      formChanged,
      changeCompleted,
      usernameChangeOpen,
      profilePhotoOpen,
    } = this.state;
    let changeFeedback = null;
    if (changeCompleted) {
      changeFeedback = changeError ? (
        <Typography variant="body2" style={{ color: red[900], flexBasis: '100%' }}>
          {`${changeError.error}:`}
          {changeError.message}
        </Typography>
      ) : (
        <Typography variant="body2" style={{ color: green[700], flexBasis: '100%' }}>
          The changes were saved successfully
        </Typography>
      );
    }
    return (
      <Paper style={this.styles.main}>
        <Typography variant="display1" component="h3" style={{ margin: '15px' }}>
          Your profile
        </Typography>
        {hasLoaded ? (
          <Grid
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
                  cursor: 'pointer',
                  backgroundColor: '#ddd',
                  background: formValues.profilePhoto ? 'none' : `url('${userIcon}')`,
                  backgroundSize: '128px 128px',
                  border: '1px ridge #ddd',
                }}
                onClick={() => { this.setState({ profilePhotoOpen: true }); }}
                onKeyPress={this.profilePhotoKeyboardHandler}
                tabIndex="0"
                role="button"
                aria-label="Change profile photo"
              >
                <img
                  src={formValues.profilePhoto}
                  alt="Profile"
                  title="Profile photo"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: formValues.profilePhoto ? 'block' : 'none',
                    zIndex: 2,
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
                    {username}
                  </span>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    color="primary"
                    onClick={() => { this.setState({ usernameChangeOpen: true }); }}
                    aria-label="Change username"
                  >
                    Change username
                  </Button>
                </Grid>
              </Grid>
              <UsernameChangeDialog
                open={usernameChangeOpen}
                username={username}
                onClose={() => { this.setState({ usernameChangeOpen: false }); }}
              />
              <ProfilePhotoDialog
                open={profilePhotoOpen}
                imgSrc={profilePhoto}
                onClose={this.profilePhotoCloseHandler}
              />
              <TextField
                id="location-input"
                name="location"
                label="Location"
                placeholder="Location"
                value={formValues.location || ''}
                onChange={this.texfieldChangeHandler}
                fullWidth
                {...this.hiddenHelperText(
                  'location',
                  'If you provide us your location, your potential customers can find you more easily. Maximum 256 characters',
                )}
                error={formErrors.location || false}
              />
              <TextField
                id="about-input"
                name="about"
                label="About"
                placeholder="About"
                value={formValues.about || ''}
                onChange={this.texfieldChangeHandler}
                fullWidth
                multiline
                {...this.hiddenHelperText(
                  'about',
                  'Must be maximum 2048 characters long',
                )}
                error={formErrors.about}
              />
              {changeFeedback}
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={{ margin: '5px' }}
                disabled={!formChanged || changeInProgress}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        ) : <LinearProgress varian="query" style={{ margin: '15px' }} /> }
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={formChanged}
        >
          <SnackbarContent
            message="There are unsaved changes"
            action={[
              <Zoom in timeout={500} key="save-button">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.submitHandler}
                  disabled={!formChanged || changeInProgress}
                >
                  Save
                </Button>
              </Zoom>,
            ]}
          />
        </Snackbar>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  changeProfile: profile => dispatch(actions.profileChange(profile)),
  setContinueUrl: url => dispatch(actions.setContinueUrl(url)),
});

Profile.propTypes = {
  profile: PropTypes.shape({
    profile: PropTypes.shape({
      profilePhoto: PropTypes.string,
    }),
  }).isRequired,
  auth: PropTypes.shape({
    userMeta: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
};

export { Profile as DisconnectedProfile };
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
