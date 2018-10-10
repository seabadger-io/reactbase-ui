import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';

import * as routes from '../../ContentRouter/routes';
import * as authActions from '../../../redux/actions/auth';

class UserMenu extends Component {
  menuId = 'appbar-usermenu';

  state = {
    anchorEl: null,
  }

  getMenuIcon() {
    const iconStyle = {
      fontSize: '36px',
    };
    const { isAuthenticated, photoURL, profile } = this.props;
    let photoSrc = photoURL;
    if (profile && profile.profile
    && profile.profile.profilePhoto) {
      photoSrc = profile.profile.profilePhoto;
    }

    if (isAuthenticated) {
      if (photoSrc) {
        return <Avatar alt="Menu" src={photoSrc} />;
      }
      return <SettingsIcon style={iconStyle} />;
    }
    return <AccountCircleIcon style={iconStyle} />;
  }

  closeMenu = () => {
    this.setState({ anchorEl: null });
  }

  openMenuHandler = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  redirectToPath = (path) => {
    const { history } = this.props;
    history.push(path);
    this.closeMenu();
  }

  redirectWithContinueUrl = (path) => {
    const { setContinueUrl, location } = this.props;
    setContinueUrl(location);
    this.redirectToPath(path);
  }

  buildMenu(isOpen = false) {
    // menu items: [ 'path' or handler, 'title' ]
    const authenticatedMenuItems = [
      [routes.MYPROFILE, 'Profile'],
      [() => this.redirectWithContinueUrl(routes.AUTH_LOGOUT), 'Logout'],
    ];
    const anonMenuItems = [
      [() => this.redirectWithContinueUrl(routes.AUTH_LOGIN), 'Login'],
    ];
    const { isAuthenticated } = this.props;
    const { anchorEl } = this.state;
    const menuItems = isAuthenticated ? authenticatedMenuItems : anonMenuItems;
    return (
      <Menu
        id={this.menuId}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isOpen}
        onClose={this.closeMenu}
        MenuListProps={{ disablePadding: true }}
      >
        {
        menuItems.map(([pathOrHandler, title]) => {
          let clickHandler;
          if (typeof pathOrHandler === 'function') {
            clickHandler = pathOrHandler;
          } else {
            clickHandler = () => this.redirectToPath(pathOrHandler);
          }
          return (
            <MenuItem key={uuid()} onClick={clickHandler}>
              {title}
            </MenuItem>
          );
        })
      }
      </Menu>
    );
  }

  render() {
    const { anchorEl } = this.state;
    const menuIsOpen = Boolean(anchorEl);
    return (
      <div>
        <IconButton
          aria-owns={menuIsOpen ? this.menuId : null}
          aria-haspopup="true"
          onClick={this.openMenuHandler}
          color="inherit"
        >
          {this.getMenuIcon()}
        </IconButton>
        {this.buildMenu(menuIsOpen)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.user !== null,
  photoURL: state.auth.user ? state.auth.user.photoURL : null,
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  setContinueUrl: url => dispatch(authActions.setContinueUrl(url)),
});

UserMenu.propTypes = {
  isAuthenticated: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  setContinueUrl: PropTypes.func.isRequired,
  photoURL: PropTypes.string,
  profile: PropTypes.shape({
    profile: PropTypes.shape({
      profilePhoto: PropTypes.string,
    }),
  }),
};

UserMenu.defaultProps = {
  isAuthenticated: false,
  photoURL: null,
  profile: null,
};

export { UserMenu as DisconnectedUserMenu };
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserMenu));
