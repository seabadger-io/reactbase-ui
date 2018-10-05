import * as actionTypes from './actionTypes';
import { db, auth } from '../../firebase';

export const profileUpdated = profile => ({
  type: actionTypes.PROFILE_UPDATED,
  profile,
});

export const profileChangeStart = () => ({
  type: actionTypes.PROFILE_CHANGE_START,
});

export const profileChangeSuccess = () => ({
  type: actionTypes.PROFILE_CHANGE_SUCCESS,
});

export const profileChangeError = (error, code, message) => ({
  type: actionTypes.PROFILE_CHANGE_ERROR,
  changeError: { error, code, message },
});

export const profileChange = (profile) => {
  if (!auth.currentUser) {
    return profileChangeError('Profile update failed',
      'unauthenticated', 'You are not logged in to firebase');
  }
  const uid = auth.currentUser.uid;
  return (dispatch) => {
    dispatch(profileChangeStart());
    db.collection('profiles').doc(uid).update({ ...profile })
      .then(() => {
        dispatch(profileChangeSuccess());
      })
      .catch((err) => {
        dispatch(profileChangeError('Failed to change profile', err.code, err.message));
      });
  };
};
