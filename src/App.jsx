import CssBaseline from '@material-ui/core/CssBaseline';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ApplicationBar from './components/UI/ApplicationBar/ApplicationBar';
import ContentRouter from './components/ContentRouter/ContentRouter';
import * as routes from './components/ContentRouter/routes';
import Footer from './components/UI/Footer/Footer';
import MainContainer from './components/HOC/MainContainer/MainContainer';
import SplashScreen from './components/UI/SplashScreen/SplashScreen';
import ThemeProvider from './components/ThemeProvider/ThemeProvider';
import userinfoMonitor from './firebase/userinfoMonitor';

class App extends Component {
  componentWillMount() {
    const { startUserinfoMonitor } = this.props;
    startUserinfoMonitor();
  }

  componentDidUpdate() {
    const { userMeta, location, history } = this.props;
    if (userMeta
    && userMeta.isSuspended
    && location.pathname !== routes.ACCOUNT_SUSPENDED) {
      history.push(routes.ACCOUNT_SUSPENDED);
    }
  }

  render() {
    const {
      title,
      location,
      history,
      match,
      auth,
    } = this.props;
    return (
      <ThemeProvider>
        <CssBaseline />
        <ApplicationBar title={title} />
        <MainContainer>
          {
            auth.hasLoaded
              ? (
                <ContentRouter
                  location={location}
                  history={history}
                  match={match}
                  auth={auth}
                />
              ) : <SplashScreen title={title} />
          }
        </MainContainer>
        <Footer title={title} />
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  userMeta: state.auth.userMeta,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  startUserinfoMonitor: () => userinfoMonitor.start(dispatch),
});

App.propTypes = {
  title: PropTypes.string.isRequired,
  startUserinfoMonitor: PropTypes.func.isRequired,
  userMeta: PropTypes.shape({
    isSuspended: PropTypes.bool,
  }),
  auth: PropTypes.shape({
    user: PropTypes.shape({
      uid: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({}).isRequired,
};

App.defaultProps = {
  userMeta: null,
  auth: null,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
