import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Button from '@material-ui/core/Button';

import { DisconnectedNotFound as NotFound } from './NotFound';
import * as routes from '../../ContentRouter/routes';

configure({ adapter: new Adapter() });

describe('<NotFound />', () => {
  let wrapper;

  const mockHistory = {
    push: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<NotFound history={mockHistory} />);
  });

  it('should contain a "Visit the homepage" button', () => {
    expect(wrapper.find(Button).first().render().text()).toEqual('Visit the homepage');
  });

  it('should redirect to HOME when "Visit the homepage" clicked', () => {
    expect(mockHistory.push).not.toHaveBeenCalled();
    wrapper.find(Button).first().simulate('click');
    expect(mockHistory.push).toHaveBeenCalledWith(routes.HOME);
  });
});
