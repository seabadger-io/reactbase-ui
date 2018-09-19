import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Index from './Index';

configure({ adapter: new Adapter() });

describe('<Index />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Index />);
  });

  it('should render', () => {
    expect(wrapper).toHaveLength(1);
  });
});