import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth, db } from './firebase';
import * as actions from './redux/actions';

import CssBaseline from '@material-ui/core/CssBaseline';

import ApplicationBar from './components/ApplicationBar/ApplicationBar';
import Footer from './components/Footer/Footer';
import MainContainer from './components/HOC/MainContainer/MainContainer';
import ContentRouter from './components/ContentRouter/ContentRouter';
import ThemeProvider from './components/ThemeProvider/ThemeProvider';

class App extends Component {
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.authSuccess(user);
        db.collection('users').doc(user.uid)
          .onSnapshot((userMeta) => {
            this.props.userMetaUpdated(userMeta.data());
          });
      } else {
        this.props.logout();
      }
    });
  }

  render() {
    return (
      <ThemeProvider>
        <CssBaseline />
        <ApplicationBar title="React Photo" />
        <MainContainer>
          <ContentRouter
            location={this.props.location}
            history={this.props.history}
            match={this.props.match}
          />
        </MainContainer>
        <Footer />
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authContinueUrl: state.auth.continueUrl
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authSuccess: (user) => dispatch(actions.authSuccess(user)),
    userMetaUpdated: (userMeta) => dispatch(actions.userMetaUpdated(userMeta)),
    logout: () => dispatch(actions.logout()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
