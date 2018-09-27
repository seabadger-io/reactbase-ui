import * as actionTypes from './actionTypes';
import { functions as fbFunctions } from '../../firebase';

export const profileUpdated = (profile) => {
  return {
    type: actionTypes.PROFILE_UPDATED,
    profile: profile,
  };
};

export const profileChangeUsernameStart = () => {
  return {
    type: actionTypes.PROFILE_CHANGE_USERNAME_START,
  };
};

export const profileChangeSuccess = () => {
  return {
    type: actionTypes.PROFILE_CHANGE_SUCCESS,
  };
};

export const profileChangeError = (error) => {
  return {
    type: actionTypes.PROFILE_CHANGE_ERROR,
    changeError: error,
  };
};

export const profileChangeUsername = (username) => {
  return (dispatch) => {
    dispatch(profileChangeUsernameStart());
    const changeUsername = fbFunctions.httpsCallable('changeUsername');
    changeUsername({ username: username })
    .then(() => {
      dispatch(profileChangeSuccess());
    })
    .catch((err) => {
      console.log(err);
      dispatch(profileChangeError('Failed to change username: ' + err));
    });
  };
};
