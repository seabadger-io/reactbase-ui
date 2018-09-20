import React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as routes from './routes';
import Index from '../Contents/Index/Index';
import AuthLogin from '../Contents/Auth/Login/Login';
import AuthLogout from '../Contents/Auth/Logout/Logout';
import AuthRedirect from '../Contents/Auth/AuthRedirect/AuthRedirect';
import NotFound from '../Contents/NotFound/NotFound';
import AccountSuspended from '../Contents/AccountSuspended/AccountSuspended';

const contentRouter = () => {
  return (
    <Switch>
      <Route path={routes.HOME} exact component={Index} />
      <Route path={routes.AUTH_LOGIN} exact component={AuthLogin} />
      <Route path={routes.AUTH_LOGOUT} exact component={AuthLogout} />
      <Route path={routes.AUTH_REDIRECT} exact component={AuthRedirect} />
      <Route path={routes.ACCOUNT_SUSPENDED} exact component={AccountSuspended} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default contentRouter;
