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
    anchorEl: null
  }

  openMenuHandler = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  closeMenu = () => {
    this.setState({ anchorEl: null });
  }

  redirectToPath = (path) => {
    this.props.history.push(path);
    this.closeMenu();
  }

  redirectWithContinueUrl = (path) => {
    this.props.setContinueUrl(this.props.location);
    this.redirectToPath(path);
  }

  buildMenu(isOpen=false) {
    // menu items: [ 'path' or handler, 'title' ]
    const authenticatedMenuItems = [
      [routes.MYPROFILE, 'Profile'],
      [() => this.redirectWithContinueUrl(routes.AUTH_LOGOUT), 'Logout'],
    ];
    const anonMenuItems = [
      [() => this.redirectWithContinueUrl(routes.AUTH_LOGIN), 'Login'],
    ];
    const menuItems = this.props.isAuthenticated ? authenticatedMenuItems : anonMenuItems;
    return (
      <Menu
        id={this.menuId}
        anchorEl={this.state.anchorEl}
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

  getMenuIcon() {
    const iconStyle = {
      fontSize: '36px'
    };
    let photoSrc = this.props.photoURL;
    if (this.props.profile && this.props.profile.profile
    && this.props.profile.profile.profilePhoto) {
      photoSrc = this.props.profile.profile.profilePhoto;
    }

    if (this.props.isAuthenticated) {
      if (photoSrc) {
        return <Avatar alt="Menu" src={photoSrc} />;
      } else {
        return <SettingsIcon style={iconStyle} />;
      }
    } else {
      return <AccountCircleIcon style={iconStyle} />;
    }
  }

  render() {
    const menuIsOpen = Boolean(this.state.anchorEl);
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
};

UserMenu.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.user !== null,
    photoURL: state.auth.user ? state.auth.user.photoURL : null,
    profile: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setContinueUrl: (url) => dispatch(authActions.setContinueUrl(url)),
  }
};

export { UserMenu as DisconnectedUserMenu };
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserMenu));
