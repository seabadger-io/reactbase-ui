import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as routes from '../ContentRouter/routes';
import UserMenu from './UserMenu/UserMenu';

const ApplicationBar = ({ title, children }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography
        variant="title"
        color="inherit"
        style={{ flexGrow: '1' }}
      >
        <Link to={routes.HOME} style={{ color: 'inherit', textDecoration: 'none' }}>
          {title}
        </Link>
      </Typography>
      {children}
      <UserMenu />
    </Toolbar>
  </AppBar>
);

ApplicationBar.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

ApplicationBar.defaultProps = {
  children: null,
};

export { ApplicationBar as DisconnectedApplicationBar };
export default withRouter(ApplicationBar);
