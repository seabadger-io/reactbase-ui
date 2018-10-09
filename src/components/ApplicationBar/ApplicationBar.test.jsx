import Typography from '@material-ui/core/Typography';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import React from 'react';
import { DisconnectedApplicationBar as ApplicationBar } from './ApplicationBar';
import UserMenu from './UserMenu/UserMenu';

jest.mock('./UserMenu/UserMenu', () => (() => (<div />)));

configure({ adapter: new Adapter() });

const options = {
  childContextTypes: {
    router: PropTypes.shape({
      route: PropTypes.shape({
        location: PropTypes.shape(),
        match: PropTypes.shape(),
      }),
      history: PropTypes.shape({}),
    }),
  },
  context: {
    router: {
      history: {
        push: jest.fn(),
        replace: jest.fn(),
        createHref: jest.fn(),
      },
      route: {
        location: {
          hash: '',
          pathname: '',
          search: '',
          state: '',
        },
        match: {
          params: {},
          isExact: false,
          path: '',
          url: '',
        },
      },
    },
  },
};

describe('<ApplicationBar />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<ApplicationBar title="Test Title" />, options);
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
