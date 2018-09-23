import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as userinfoMonitor from './firebase/userinfoMonitor';
import * as routes from './components/ContentRouter/routes';

import CssBaseline from '@material-ui/core/CssBaseline';

import ApplicationBar from './components/ApplicationBar/ApplicationBar';
import Footer from './components/Footer/Footer';
import MainContainer from './components/HOC/MainContainer/MainContainer';
import ContentRouter from './components/ContentRouter/ContentRouter';
import ThemeProvider from './components/ThemeProvider/ThemeProvider';

class App extends Component {
  userMetaUnsubscribe = null;
  profileUnsubscribe = null;

  componentWillMount() {
    this.props.startUserinfoMonitor();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userMeta &&
    nextProps.userMeta.isSuspended &&
    this.props.location.pathname !== routes.ACCOUNT_SUSPENDED) {
      this.props.history.replace(routes.ACCOUNT_SUSPENDED);
    }
    if (nextProps.profile &&
    !nextProps.profile.username &&
    this.props.location.pathname !== routes.MYPROFILE) {
      this.props.history.replace(routes.MYPROFILE);
    }
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
    userMeta: state.auth.userMeta,
    profile: state.profile,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startUserinfoMonitor: () => userinfoMonitor.start(dispatch),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
