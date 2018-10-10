import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinerProgress from '@material-ui/core/LinearProgress';

import Login from './Login';
import firebase from '../../../../firebase';

configure({ adapter: new Adapter() });

jest.mock('../../../../firebase', () => ({
  auth: {
    signInWithPopup: jest.fn(() => new Promise(resolve => resolve({}))),
  },
  providers: {
    google: 'google',
  },
}));

const mockHistory = {
  history: {
    push: jest.fn(),
  },
};

describe('<Login />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Login {...mockHistory} />);
  });

  it('should call firebase signInWithPopup', () => {
    expect(firebase.auth.signInWithPopup).toHaveBeenCalled();
  });

  it('should render login in progress message with progress bar', () => {
    wrapper.setState({ error: null });
    expect(wrapper.find(Typography).first().render().text()).toEqual('Login in progress...');
    expect(wrapper.find(LinerProgress).length).toBe(1);
  });

  it('should display an error message on error', () => {
    wrapper.setState({ error: 'Error Message' });
    expect(wrapper.find(Typography).first().render().text()).toEqual('Error Message');
  });

  it('should render a "Retry login" button on error', () => {
    wrapper.setState({ error: 'unknownerror' });
    expect(wrapper.find(Button).first().render().text()).toEqual('Retry login');
  });
});
