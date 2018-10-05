import * as actionTypes from '../actions/actionTypes';

export const initialState = {
  hasLoaded: false,
  changeInProgress: false,
  changeError: null,
  changeCompleted: false,
  profile: {
    about: null,
    location: null,
    profilePhoto: null,
  },
};

const profileUpdated = (state, action) => ({
  ...state,
  profile: { ...action.profile },
  hasLoaded: true,
});

const profileChangeStart = state => ({
  ...state,
  changeInProgress: true,
  changeError: null,
  changeCompleted: false,
});

const profileChangeSuccess = state => ({
  ...state,
  changeInProgress: false,
  changeError: null,
  changeCompleted: true,
});

const profileChangeError = (state, action) => ({
  ...state,
  changeInProgress: false,
  changeError: action.changeError,
  changeCompleted: true,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_UPDATED: return profileUpdated(state, action);
    case actionTypes.PROFILE_CHANGE_START: return profileChangeStart(state);
    case actionTypes.PROFILE_CHANGE_SUCCESS: return profileChangeSuccess(state);
    case actionTypes.PROFILE_CHANGE_ERROR: return profileChangeError(state, action);
    default: return state;
  }
};
