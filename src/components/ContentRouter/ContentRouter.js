import React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as routes from './routes';
import Index from '../Contents/Index/Index';
import AuthLogin from '../Contents/Auth/Login/Login';
import AuthLogout from '../Contents/Auth/Logout/Logout';
import AuthRedirect from '../Contents/Auth/AuthRedirect/AuthRedirect';
import NotFound from '../Contents/NotFound/NotFound';
import AccountSuspended from '../Contents/AccountSuspended/AccountSuspended';
import Profile from '../Contents/Profile/Profile';

const contentRouter = (props) => {
  const authenticated = props.auth && props.auth.user && props.auth.user.uid;
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

export default contentRouter;
