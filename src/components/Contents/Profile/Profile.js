import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Zoom from '@material-ui/core/Zoom';


class Profile extends Component {
  styles = {
    main: {
      flexGrow: 1,
      maxWidth: '800px',
      padding: '15px',
      justifyContent: 'center',
      height: 'fit-content'
    },
  };

  render() {
    return (
      <Paper style={this.styles.main}>
        <Typography variant="display1" component="h3">
          Your profile
        </Typography>
        {!this.props.profile.username ?
          (<Typography variant="caption" style={{ color: red[900], padding: '15px' }}>
            You are almost ready. Please complete the mandatory (*) fields in your profile.
          </Typography>) : null
        }
        <Grid container spacing={16}>
          <Grid item xs={12} sm={4}>
            {/* profile photo */}
            <div style={{ backgroundColor: 'black', width: '160px', height: '200px' }}></div>
          </Grid>
          <Grid item container xs={12} sm={8}>
            {/* user details  */}
            <TextField
              id="username-input"
              label="Username"
              placeholder="Username"
              helperText="Minimum 4, maximum 24 characters. Only letters, numbers, hyphen and underscore"
              fullWidth
              required
            />
            <TextField
              id="contactemail-input"
              label="Contact email"
              placeholder="Contact email"
              fullWidth
              required
            />
            <TextField
              id="location-input"
              label="Location"
              placeholder="Location"
              helperText="If you provide us your location, your potential customers can find you more easily"
              fullWidth
            />
            <TextField
              id="about-input"
              label="About"
              placeholder="Say something about yourself"
              fullWidth
              multiline
            />
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open
        >
          <SnackbarContent
            message="There are unsaved changes"
            action={[
              <Zoom in timeout={500} key="save-button">
                <Button
                  color="primary"
                  variant="contained"
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
    profile: state.profile,
  };
};

export { Profile as DisconnectedProfile };
export default connect(mapStateToProps)(Profile);