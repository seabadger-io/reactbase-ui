import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { DisconnectedAccountSuspended as  AccountSuspended } from './AccountSuspended';
import * as routes from '../../ContentRouter/routes';

configure({ adapter: new Adapter() });

describe('<AccountSuspended />', () => {
  let wrapper;

  const mockHistory = {
    replace: jest.fn()
  }

  beforeEach(() => {
    wrapper = shallow(<AccountSuspended history={mockHistory} isSuspended={true} />);
  });

  it('should render without error', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should redirect to home if not suspended', () => {
    expect(mockHistory.replace).not.toHaveBeenCalled();
    wrapper.setProps({ isSuspended: false });
    expect(mockHistory.replace).toHaveBeenCalledWith(routes.HOME);
  });

});