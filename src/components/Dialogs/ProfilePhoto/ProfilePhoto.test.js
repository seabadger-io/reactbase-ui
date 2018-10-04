import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Dialog, DialogActions, Button } from '@material-ui/core';

import ProfilePhoto from './ProfilePhoto';

configure({ adapter: new Adapter() });

describe('<ProfilePhoto /> Dialog', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ProfilePhoto open={true} imgSrc="" />);
  });

  it('should render', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render a Dialog with correct open state', () => {
    expect(wrapper.find(Dialog).prop('open')).toBe(true);
    wrapper.setProps({ open: false });
    expect(wrapper.find(Dialog).prop('open')).toBe(false);
  });

  it('should render 3 action buttons', () => {
    expect(wrapper.find(DialogActions).find(Button)).toHaveLength(3);
  });

  it('should call onClose callback with image data on close', () => {
    const cb = jest.fn();
    const imgData = 'abc';
    wrapper.setState({ updatedImage: imgData });
    wrapper.setProps({ onClose: cb });
    const closeBtn = wrapper.find(DialogActions).find(Button).at(2);
    closeBtn.simulate('click');
    expect(cb).toHaveBeenCalledWith(imgData);
  });
});
