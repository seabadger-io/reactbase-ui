import * as actionTypes from './actionTypes';

export const authSuccess = (user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user: user,
  }
}

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  }
}

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const setContinueUrl = (url) => {
  return {
    type: actionTypes.AUTH_SET_CONTINUE_URL,
    continueUrl: url,
  }
}
