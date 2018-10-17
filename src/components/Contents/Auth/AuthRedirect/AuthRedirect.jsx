import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as authActions from '../../../../redux/actions/auth';

const authRedirect = ({ continueUrl, setContinueUrl }) => {
  const redirectTo = continueUrl !== null ? continueUrl : '/';
  setContinueUrl(null);
  return <Redirect to={redirectTo} />;
};

const mapStateToProps = state => ({
  continueUrl: state.auth.continueUrl,
});

const mapDispatchToProps = dispatch => ({
  setContinueUrl: url => dispatch(authActions.setContinueUrl(url)),
});

authRedirect.propTypes = {
  continueUrl: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  ]),
  setContinueUrl: PropTypes.func.isRequired,
};

authRedirect.defaultProps = {
  continueUrl: '/',
};

export { authRedirect as DisconnectedAuthRedirect };
export default connect(mapStateToProps, mapDispatchToProps)(authRedirect);
