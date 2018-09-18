import React from 'react';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import UserMenu from './UserMenu/UserMenu';

const ApplicationBar = (props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="title"
          color="inherit"
          style={{ flexGrow: '1' }}
        >
          {props.title}
        </Typography>
        {props.children ? props.children : null}
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
};

ApplicationBar.propTypes = {
  title: PropTypes.string.isRequired
};

export default ApplicationBar;
