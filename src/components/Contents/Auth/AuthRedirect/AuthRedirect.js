import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as authActions from '../../../../redux/actions/auth';

const authRedirect = (props) => {
  const redirectTo = props.continueUrl ? props.continueUrl : '/';
  props.setContinueUrl(null);
  return <Redirect to={redirectTo} />;
};

const mapStateToProps = (state) => {
  return {
    continueUrl: state.auth.continueUrl,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setContinueUrl: (url) => dispatch(authActions.setContinueUrl(url))
  };
};

export { authRedirect as DisconnectedAuthRedirect };
export default connect(mapStateToProps, mapDispatchToProps)(authRedirect);