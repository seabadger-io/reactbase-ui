import * as actionTypes from '../actions/actionTypes';

export const initialState = {
  username: null,
  about: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_UPDATED: return profileUpdated(state, action);
    default: return state;
  }
};

const profileUpdated = (state, action) => {
  return {
    ...state,
    ...action.profile,
  }
};
