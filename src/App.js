import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth, db } from './firebase';
import * as actions from './redux/actions';
import * as routes from './components/ContentRouter/routes';

import CssBaseline from '@material-ui/core/CssBaseline';

import ApplicationBar from './components/ApplicationBar/ApplicationBar';
import Footer from './components/Footer/Footer';
import MainContainer from './components/HOC/MainContainer/MainContainer';
import ContentRouter from './components/ContentRouter/ContentRouter';
import ThemeProvider from './components/ThemeProvider/ThemeProvider';

class App extends Component {
  userMetaUnsubscribe = null;

  componentWillMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.authSuccess(user);
        this.userMetaUnsubscribe = db.collection('users').doc(user.uid)
          .onSnapshot((userMeta) => {
            this.props.userMetaUpdated(userMeta.data());
            if (userMeta.data().isSuspended &&
            this.props.location.pathName !== routes.ACCOUNT_SUSPENDED) {
              this.props.history.replace(routes.ACCOUNT_SUSPENDED);
            }
          });
      } else {
        if (typeof this.userMetaUnsubscribe === 'function') {
          this.userMetaUnsubscribe();
        }
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
    authContinueUrl: state.auth.continueUrl,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authSuccess: (user) => dispatch(actions.authSuccess(user)),
    logout: () => dispatch(actions.logout()),
    userMetaUpdated: (userMeta) => dispatch(actions.userMetaUpdated(userMeta)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
