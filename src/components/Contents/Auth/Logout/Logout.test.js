import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Typography from '@material-ui/core/Typography';
import LinerProgress from '@material-ui/core/LinearProgress';

import Logout from './Logout';
import firebase from '../../../../firebase';
import * as routes from '../../../ContentRouter/routes';

configure({ adapter: new Adapter() });

jest.mock('../../../../firebase', () => {
  return {
    auth: {
      signOut: jest.fn(() => {
        return new Promise(resolve => resolve({}));
      }),
    }
  };
});

describe('<Logout />', () => {
  let wrapper;

  const mockHistory = {
    push: jest.fn()
  }

  beforeEach(() => {
    wrapper = shallow(<Logout history={mockHistory} />);
  });

  it('should call firebase signOut', () => {
    expect(firebase.auth.signOut).toHaveBeenCalled();
  });

  it('should render Logout in progress message with progress bar', () => {
    expect(wrapper.find(Typography).first().render().text()).toEqual('Logging out...');
    expect(wrapper.find(LinerProgress).length).toBe(1);
  });

  it('should redirect home after logout', () => {
    expect(mockHistory.push).toHaveBeenCalledWith(routes.HOME);
  });

});