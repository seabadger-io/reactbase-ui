import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Redirect } from 'react-router-dom';

import { DisconnectedAuthRedirect as AuthRedirect } from './AuthRedirect';

configure({ adapter: new Adapter() });

describe('<AuthRedirect />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AuthRedirect setContinueUrl={() => {}} />);
  });

  it('should redirect to continueUrl', () => {
    const testUrl = '/testurl';
    wrapper.setProps({ continueUrl: testUrl });
    expect(wrapper.contains(<Redirect to={testUrl} />)).toBe(true);
  });

  it('should redirect to / if no continueUrl set', () => {
    expect(wrapper.find(Redirect).prop('to')).toBe('/');
  });

  it('should reset the continueUrl to null', () => {
    const mockFn = jest.fn();
    wrapper.setProps({ setContinueUrl: mockFn });
    expect(mockFn).toHaveBeenCalledWith(null);
  });
});
