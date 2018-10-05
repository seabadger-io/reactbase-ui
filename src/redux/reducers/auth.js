import * as actionTypes from '../actions/actionTypes';

export const initialState = {
  user: null,
  error: null,
  continueUrl: null,
  userMeta: null,
};

const authSuccess = (state, action) => ({
  ...state,
  user: action.user,
  error: null,
});

const authFailed = (state, action) => ({
  ...state,
  user: null,
  userMeta: null,
  error: action.error,
});

const logout = state => ({
  ...state,
  user: null,
  userMeta: null,
  error: null,
});

const setContinueUrl = (state, action) => ({
  ...state,
  continueUrl: action.continueUrl,
});

const userMetaUpdated = (state, action) => ({
  ...state,
  userMeta: action.userMeta,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFailed(state, action);
    case actionTypes.AUTH_LOGOUT: return logout(state, action);
    case actionTypes.AUTH_SET_CONTINUE_URL: return setContinueUrl(state, action);
    case actionTypes.AUTH_UPD_USERMETA: return userMetaUpdated(state, action);
    default: return state;
  }
};
