import * as authActions from './auth';
import * as actionTypes from './actionTypes';

describe('auth actions', () => {
  it('should return expected properties on successful login', () => {
    const user = 'user';
    const response = authActions.authSuccess(user);
    expect(response).toHaveProperty('type', actionTypes.AUTH_SUCCESS);
    expect(response).toHaveProperty('user', user);
  });

  it('should return expected properties on failed login', () => {
    const error = 'error';
    const response = authActions.authFailed(error);
    expect(response).toHaveProperty('type', actionTypes.AUTH_FAIL);
    expect(response).toHaveProperty('error', error);
  });

  it('should return expected properties on logout', () => {
    const response = authActions.logout();
    expect(response).toHaveProperty('type', actionTypes.AUTH_LOGOUT);
  });

  it('should return expected properties on setContinueUrl', () => {
    const url = 'url';
    const response = authActions.setContinueUrl(url);
    expect(response).toHaveProperty('type', actionTypes.AUTH_SET_CONTINUE_URL);
    expect(response).toHaveProperty('continueUrl', url);
  });
});
