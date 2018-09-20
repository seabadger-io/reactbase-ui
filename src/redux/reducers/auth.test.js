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
      error: 'notnull'
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

  it('should reset user to null on failed login', () => {
    const startState = {
      ...initialState,
      user: 'notnull'
    };
    const payload = { error: {} };
    const state = authReducer(startState, {
      type: actionTypes.AUTH_FAIL,
      ...payload,
    });
    expect(state.user).toEqual(null);
  });

  it('should set user and error to null on logout', () => {
    const startState = {
      ...initialState,
      user: 'notnull',
      error: 'notnull',
    };
    const state = authReducer(startState, {
      type: actionTypes.AUTH_LOGOUT
    });
    expect(state).toEqual({
      ...initialState,
      user: null,
      error: null,
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
});
