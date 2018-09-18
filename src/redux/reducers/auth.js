import * as actionTypes from '../actions/actionTypes';

export const initialState = {
  user: null,
  error: null,
  continueUrl: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFailed(state, action);
    case actionTypes.AUTH_LOGOUT: return logout(state, action);
    case actionTypes.AUTH_SET_CONTINUE_URL: return setContinueUrl(state, action);
    default: return state;
  }
};

const authSuccess = (state, action) => {
  return {
    ...state,
    user: action.user,
    error: null,
  }
};

const authFailed = (state, action) => {
  return {
    ...state,
    user: null,
    error: action.error,
  }
};

const logout = (state) => {
  return {
    ...state,
    user: null,
    error: null,
  }
};

const setContinueUrl = (state, action) => {
  return {
    ...state,
    continueUrl: action.continueUrl,
  }
}
