import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Typography from '@material-ui/core/Typography';

import ApplicationBar from './ApplicationBar';
import UserMenu from './UserMenu/UserMenu';

configure({ adapter: new Adapter() });

describe('<ApplicationBar />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ApplicationBar title="Test Title" />);
  });

  it('should render render a title', () => {
    expect(wrapper.find(Typography).filter({ variant: 'title' }).length).toBe(1);
  });

  it('should render the title as set in prop', () => {
    const testTitle = 'testtitle';
    wrapper.setProps({ title: testTitle });
    expect(wrapper.find(Typography).filter({ variant: 'title' }).render().text())
      .toEqual(testTitle);
  });

  it('should contain a user menu', () => {
    expect(wrapper.contains(<UserMenu />)).toBe(true);
  });
});
