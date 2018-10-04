import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import * as routes from '../ContentRouter/routes';
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
          <NavLink to={routes.HOME} style={{ color: 'inherit', textDecoration: 'none' }}>
            {props.title}
          </NavLink>
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
