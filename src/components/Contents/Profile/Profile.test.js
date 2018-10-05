import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { DisconnectedProfile as Profile } from './Profile';

configure({ adapter: new Adapter() });

jest.mock('../../../firebase', () => ({
  firebase: {},
  auth: {},
}));

describe('<Profile />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Profile
      profile={{}}
      auth={{}}
    />);
  });

  it('should render', () => {
    expect(wrapper).toHaveLength(1);
  });
});
