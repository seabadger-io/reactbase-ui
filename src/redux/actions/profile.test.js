import { assert } from '@firebase/util';
import * as actionTypes from './actionTypes';
import * as profileActions from './profile';
import firebase from '../../firebase';

jest.mock('../../firebase', () => ({
  firebase: {},
  auth: {},
}));

const mockDb = (shouldResolve = true) => ({
  collection: () => ({
    doc: () => ({
      update: () => new Promise((resolve, reject) => {
        if (shouldResolve) {
          resolve();
        } else {
          reject({ code: 'code', message: 'message' });
        }
      }),
    }),
  }),
});

describe('profile actions', () => {
  it('should return expected action on profile updated', () => {
    const payload = {
      profile: { test: 'ok' },
    };
    const expected = {
      type: actionTypes.PROFILE_UPDATED,
      ...payload,
    };
    expect(profileActions.profileUpdated(payload.profile)).toEqual(expected);
  });

  it('should return expected action on change start', () => {
    const expected = {
      type: actionTypes.PROFILE_CHANGE_START,
    };
    expect(profileActions.profileChangeStart()).toEqual(expected);
  });

  it('should return expected action on change success', () => {
    const expected = {
      type: actionTypes.PROFILE_CHANGE_SUCCESS,
    };
    expect(profileActions.profileChangeSuccess()).toEqual(expected);
  });

  it('should return expected action on change fail', () => {
    const error = { error: 'err', code: 'c', message: 'm' };
    const expected = {
      type: actionTypes.PROFILE_CHANGE_ERROR,
      changeError: error,
    };
    expect(profileActions.profileChangeError(error.error, error.code, error.message))
      .toEqual(expected);
  });

  describe('profile change', () => {
    const profile = {
      about: 'test',
    };

    beforeEach(() => {
      firebase.auth = {
        currentUser: {
          uid: 'UID',
        },
      };
    });

    it('should return error if not authenticated', () => {
      firebase.auth = {
        currentUser: null,
      };
      expect(profileActions.profileChange(profile))
        .toHaveProperty('type', actionTypes.PROFILE_CHANGE_ERROR);
    });

    it('should dispatch profileChangeSuccess on success', () => {
      firebase.db = mockDb(true);
      const dispatch = jest.fn();
      const thunkFunc = profileActions.profileChange(profile);
      thunkFunc(dispatch);
      expect(dispatch).toHaveBeenCalledWith(profileActions.profileChangeStart());
      firebase.db.collection().doc().update().then(() => {
        expect(dispatch).toHaveBeenCalledWith(profileActions.profileChangeSuccess());
      });
    });

    it('should dispatch profileChangeError on error', () => {
      firebase.db = mockDb(false);
      const dispatch = jest.fn();
      const thunkFunc = profileActions.profileChange(profile);
      thunkFunc(dispatch);
      expect(dispatch).toHaveBeenCalledWith(profileActions.profileChangeStart());
      firebase.db.collection().doc().update().then(() => {
        assert(false, 'should not call this on error');
      })
        .catch(() => {
          expect(dispatch).toHaveBeenCalledWith(profileActions.profileChangeError(
            'Failed to change profile', 'code', 'message',
          ));
        });
    });
  });
});
