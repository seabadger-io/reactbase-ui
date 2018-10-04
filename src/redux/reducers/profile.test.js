import profileReducer, { initialState } from './profile';
import * as actionTypes from '../actions/actionTypes';

describe('profile reducer', () => {

  it('should not change the state on unknown action', () => {
    expect(profileReducer(undefined, {})).toEqual(initialState);
  });

  it('should store profile and set hasLoaded on profile load', () => {
    const payload = {
      profile: { field: 'newprofile' }
    };
    const state = profileReducer(undefined, {
      type: actionTypes.PROFILE_UPDATED,
      ...payload
    });
    expect(state.profile).toEqual(payload.profile);
    expect(state.hasLoaded).toBe(true);
  });

  it('should reset progress when change starts', () => {
    const prevState = {
      ...initialState,
      changeInProgress: null,
      changeError: 'olderror',
      changeCompleted: null,
    };
    const expected = {
      ...initialState,
      changeInProgress: true,
      changeError: null,
      changeCompleted: false,
    };
    const state = profileReducer(prevState, {
      type: actionTypes.PROFILE_CHANGE_START
    });
    expect(state).toEqual(expected);
  });

  it('should set progress when change is successful', () => {
    const prevState = {
      ...initialState,
      changeInProgress: true,
      changeError: 'error',
      changeCompleted: false,
    };
    const expected = {
      ...initialState,
      changeInProgress: false,
      changeError: null,
      changeCompleted: true,
    };
    const state = profileReducer(prevState, {
      type: actionTypes.PROFILE_CHANGE_SUCCESS
    });
    expect(state).toEqual(expected);
  });

  it('should set error and update progress when change fails', () => {
    const prevState = {
      ...initialState,
      changeInProgress: true,
      changeError: null,
      changeCompleted: false,
    };
    const payload = {
      changeError: 'newerror'
    }
    const expected = {
      ...initialState,
      changeInProgress: false,
      changeCompleted: true,
      ...payload,
    };
    const state = profileReducer(prevState, {
      type: actionTypes.PROFILE_CHANGE_ERROR,
      ...payload,
    });
    expect(state).toEqual(expected);
  });

});