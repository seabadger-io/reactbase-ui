import * as actionTypes from './actionTypes';

export const profileUpdated = (profile) => {
  return {
    type: actionTypes.PROFILE_UPDATED,
    profile: profile,
  };
};
