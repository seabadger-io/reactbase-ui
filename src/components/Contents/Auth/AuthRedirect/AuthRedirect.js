import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../../redux/actions';

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
    setContinueUrl: (url) => dispatch(actions.setContinueUrl(url))
  };
};

export { authRedirect as DisconnectedAuthRedirect };
export default connect(mapStateToProps, mapDispatchToProps)(authRedirect);