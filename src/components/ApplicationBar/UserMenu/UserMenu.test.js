import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';

import { DisconnectedUserMenu as UserMenu } from './UserMenu';

configure({ adapter: new Adapter() });

describe('<UserMenu />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<UserMenu />);
  });

  it('should have a menu icon with AccountCircleIcon', () => {
    expect(wrapper.find(IconButton).length).toBe(1);
    expect(wrapper.find(AccountCircleIcon).length).toBe(1);
  });

  it('should display SettingsIcon if authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(SettingsIcon).length).toBe(1);
  });

  it('should render an Avatar if photo is available', () => {
    wrapper.setProps({ isAuthenticated: true, photoURL: 'something.jpg' });
    expect(wrapper.find(Avatar).length).toBe(1);
  });

  it('should contain a Menu', () => {
    expect(wrapper.find(Menu).length).toBe(1);
  });

  it('should open the menu on click', () => {
    expect(wrapper.find(Menu).filter({ open: false }).length).toBe(1);
    wrapper.find(IconButton).simulate('click', { currentTarget: <div></div> });
    expect(wrapper.find(Menu).filter({ open: true }).length).toBe(1);
  });

  it('should render correct menu items', () => {
    expect(wrapper.find(MenuItem).length).toBe(1);
    wrapper.find(MenuItem).forEach((node) => {
      expect(node.render().text()).toMatch(/(Login)/);
    });
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(MenuItem).length).toBe(2);
    wrapper.find(MenuItem).forEach((node) => {
      expect(node.render().text()).toMatch(/(Profile|Logout)/);
    });
  });

});
