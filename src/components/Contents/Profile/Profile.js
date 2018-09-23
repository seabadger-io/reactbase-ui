import React, { Component } from 'react'
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';

class Profile extends Component {
  render() {
    return (
      <Paper>

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