import * as actionTypes from '../actions/actionTypes';

export const initialState = {
  hasLoaded: false,
  username: null,
  contactEmail: null,
  about: null,
  location: null,
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
    hasLoaded: true,
  }
};
