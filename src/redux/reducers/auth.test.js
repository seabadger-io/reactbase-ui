import authReducer, { initialState } from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should not change the state on unknown action', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should store user on successful login', () => {
    const payload = { user: {} };
    const state = authReducer(undefined, {
      type: actionTypes.AUTH_SUCCESS,
      ...payload,
    });
    expect(state).toEqual({
      ...initialState,
      ...payload,
    });
  });

  it('should reset error to null on successful login', () => {
    const startState = {
      ...initialState,
      error: 'notnull',
    };
    const payload = { user: {} };
    const state = authReducer(startState, {
      type: actionTypes.AUTH_SUCCESS,
      ...payload,
    });
    expect(state.error).toEqual(null);
  });

  it('should store error on failed login', () => {
    const payload = { error: 'notnull' };
    const state = authReducer(undefined, {
      type: actionTypes.AUTH_FAIL,
      ...payload,
    });
    expect(state).toEqual({
      ...initialState,
      ...payload,
    });
  });

  it('should reset user and userMeta to null on failed login', () => {
    const startState = {
      ...initialState,
      user: 'notnull',
      userMeta: 'notnull',
    };
    const payload = { error: {} };
    const state = authReducer(startState, {
      type: actionTypes.AUTH_FAIL,
      ...payload,
    });
    expect(state.user).toEqual(null);
    expect(state.userMeta).toEqual(null);
  });

  it('should set user, userMeta and error to null on logout', () => {
    const startState = {
      ...initialState,
      user: 'notnull',
      error: 'notnull',
      userMeta: 'notnull',
    };
    const state = authReducer(startState, {
      type: actionTypes.AUTH_LOGOUT,
    });
    expect(state).toEqual({
      ...initialState,
      user: null,
      error: null,
      userMeta: null,
    });
  });

  it('should set continue URL on setContinueUrl', () => {
    const payload = { continueUrl: 'url' };
    expect(authReducer(undefined, {
      type: actionTypes.AUTH_SET_CONTINUE_URL,
      ...payload,
    })).toEqual({
      ...initialState,
      ...payload,
    });
  });

  it('should set user meta on userMetaUpdated', () => {
    const payload = { userMeta: 'usermeta' };
    expect(authReducer(undefined, {
      type: actionTypes.AUTH_UPD_USERMETA,
      ...payload,
    })).toEqual({
      ...initialState,
      ...payload,
    });
  });
});
