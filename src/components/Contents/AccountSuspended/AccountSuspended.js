import React from 'react';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import * as routes from '../../ContentRouter/routes';

class AccountSuspended extends React.Component {
  styles = {
    paper: {
      maxWidth: '640px',
      padding: '15px',
      justifyContent: 'center',
      height: 'fit-content'
    },
    textBlock: {
      margin: '15px 0'
    },
  }

  componentWillMount() {
    if (!this.props.isSuspended) {
      this.props.history.replace(routes.HOME);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isSuspended) {
      this.props.history.replace(routes.HOME);
    }
  }

  render() {
    return (
      <Paper style={this.styles.paper}>
        <Typography variant="title" component="h3">
          Account suspended
        </Typography>
        <Typography variant="body1" component="p" style={this.styles.textBlock}>
          This account has been suspended. This typically happens when we identify
          a serious violation against our Terms of service. You will not be able
          to access our services and we block access to all contents that
          were uploaded using this account.
        </Typography>
      </Paper>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    isSuspended: state.auth.userMeta ? state.auth.userMeta.isSuspended : false,
  }
};

export { AccountSuspended as DisconnectedAccountSuspended };
export default connect(mapStateToProps)(AccountSuspended);

