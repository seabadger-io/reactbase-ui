import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StaticRouter, Route } from 'react-router-dom';

import Index from '../Contents/Index/Index';
import AuthLogin from '../Contents/Auth/Login/Login';
import AuthLogout from '../Contents/Auth/Logout/Logout';
import AuthRedirect from '../Contents/Auth/AuthRedirect/AuthRedirect';
import NotFound from '../Contents/NotFound/NotFound';

import ContentRouter from './ContentRouter';
import * as routes from './routes';

configure({ adapter: new Adapter() });

jest.mock('../../firebase', () => ({}));

jest.mock('../Contents/Auth/AuthRedirect/AuthRedirect', () => () => <div />);

AuthLogin.prototype.componentDidMount = jest.fn();
AuthLogout.prototype.componentDidMount = jest.fn();

const getWrapper = url => mount(
  <StaticRouter context={{}} location={url}>
    <ContentRouter />
  </StaticRouter>,
);


describe('<ContentRouter />', () => {
  let wrapper;

  const testRouteWithComponent = (route, component) => {
    wrapper = getWrapper(route);
    return expect(
      wrapper.find(Route)
        .filterWhere(n => typeof n.prop('component') !== 'undefined')
        .prop('component'),
    ).toEqual(component);
  };

  afterEach(() => {
    wrapper.unmount();
  });

  it('should route HOME to Index', () => {
    testRouteWithComponent(routes.HOME, Index);
  });

  it('should route AUTH_LOGIN to AuthLogin', () => {
    testRouteWithComponent(routes.AUTH_LOGIN, AuthLogin);
  });

  it('should route AUTH_LOGOUT to AuthLogout', () => {
    testRouteWithComponent(routes.AUTH_LOGOUT, AuthLogout);
  });

  it('should route AUTH_REDIRECT to AuthRedirect', () => {
    testRouteWithComponent(routes.AUTH_REDIRECT, AuthRedirect);
  });

  it('should route unknown route to NotFound', () => {
    testRouteWithComponent('/NonExistentRoute42', NotFound);
  });
});
