import * as actionTypes from './actionTypes';

export const authLoaded = () => ({
  type: actionTypes.AUTH_LOADED,
});

export const authSuccess = user => ({
  type: actionTypes.AUTH_SUCCESS,
  user,
});

export const authFailed = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const logout = () => ({
  type: actionTypes.AUTH_LOGOUT,
});

export const setContinueUrl = url => ({
  type: actionTypes.AUTH_SET_CONTINUE_URL,
  continueUrl: url,
});

export const userMetaUpdated = userMeta => ({
  type: actionTypes.AUTH_UPD_USERMETA,
  userMeta,
});
