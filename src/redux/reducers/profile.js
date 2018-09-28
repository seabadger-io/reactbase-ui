import * as actionTypes from '../actions/actionTypes';

export const initialState = {
  hasLoaded: false,
  changeInProgress: false,
  changeError: null,
  profile: {
    username: null,
    contactEmail: null,
    about: null,
    location: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_UPDATED: return profileUpdated(state, action);
    case actionTypes.PROFILE_CHANGE_START: return profileChangeStart(state);
    case actionTypes.PROFILE_CHANGE_SUCCESS: return profileChangeSuccess(state);
    case actionTypes.PROFILE_CHANGE_ERROR: return profileChangeError(state, action);
    default: return state;
  }
};

const profileUpdated = (state, action) => {
  return {
    ...state,
    profile: { ...action.profile },
    hasLoaded: true,
  }
};

const profileChangeStart = (state) => {
  return {
    ...state,
    changeInProgress: true,
    changeError: null,
  };
};

const profileChangeSuccess = (state) => {
  return {
    ...state,
    changeInProgress: false,
    changeError: null,
  };
};

const profileChangeError = (state, action) => {
  return {
    ...state,
    changeInProgress: false,
    changeError: action.changeError,
  };
};
