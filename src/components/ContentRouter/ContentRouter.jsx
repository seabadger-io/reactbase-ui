import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AccountSuspended from '../Contents/AccountSuspended/AccountSuspended';
import AuthRedirect from '../Contents/Auth/AuthRedirect/AuthRedirect';
import AuthLogin from '../Contents/Auth/Login/Login';
import AuthLogout from '../Contents/Auth/Logout/Logout';
import Index from '../Contents/Index/Index';
import NotFound from '../Contents/NotFound/NotFound';
import Profile from '../Contents/Profile/Profile';
import * as routes from './routes';

const contentRouter = ({ auth }) => {
  const authenticated = auth && auth.user && auth.user.uid;
  const protectedRoutes = [
    <Route key={routes.MYPROFILE} path={routes.MYPROFILE} exact component={Profile} />,
  ];
  return (
    <Switch>
      <Route path={routes.HOME} exact component={Index} />
      <Route path={routes.AUTH_LOGIN} exact component={AuthLogin} />
      <Route path={routes.AUTH_LOGOUT} exact component={AuthLogout} />
      <Route path={routes.AUTH_REDIRECT} exact component={AuthRedirect} />
      { authenticated ? protectedRoutes : null }
      <Route path={routes.ACCOUNT_SUSPENDED} exact component={AccountSuspended} />
      <Route component={NotFound} />
    </Switch>
  );
};

contentRouter.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.shape({
      uid: PropTypes.string,
    }),
  }),
};

contentRouter.defaultProps = {
  auth: null,
};

export default contentRouter;
