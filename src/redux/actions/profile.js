import * as actionTypes from './actionTypes';
import { functions as fbFunctions, db, auth } from '../../firebase';

export const profileUpdated = (profile) => {
  return {
    type: actionTypes.PROFILE_UPDATED,
    profile: profile,
  };
};

export const profileChangeStart = () => {
  return {
    type: actionTypes.PROFILE_CHANGE_START,
  };
};

export const profileChangeSuccess = () => {
  return {
    type: actionTypes.PROFILE_CHANGE_SUCCESS,
  };
};

export const profileChangeError = (error, code, message) => {
  return {
    type: actionTypes.PROFILE_CHANGE_ERROR,
    changeError: { error: error, code: code, message: message },
  };
};

export const profileChange = (profile) => {
  if (!auth.currentUser) {
    return profileChangeError('Profile update failed',
      'unauthenticated', 'You are not logged in to firebase');
  }
  const uid = auth.currentUser.uid;
  return (dispatch) => {
    dispatch(profileChangeStart());
    db.collection('profiles').doc(uid).update({...profile})
    .then(() => {
      dispatch(profileChangeSuccess());
    })
    .catch((err) => {
      console.log(uid, profile, err);
      dispatch(profileChangeError('Failed to change profile', err.code, err.message));
    });
  };
}

export const profileChangeUsername = (username) => {
  return (dispatch) => {
    dispatch(profileChangeStart());
    const changeUsername = fbFunctions.httpsCallable('changeUsername');
    changeUsername({ username: username })
    .then(() => {
      dispatch(profileChangeSuccess());
    })
    .catch((err) => {
      dispatch(profileChangeError('Failed to change username', err.code, err.message));
    });
  };
};
