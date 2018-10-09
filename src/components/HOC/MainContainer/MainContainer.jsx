import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import classes from './MainContainer.css';

const mainContainer = ({ children }) => (
  <Grid component="main" className={classes.MainContainer}>
    {children}
  </Grid>
);

mainContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

mainContainer.defaultProps = {
  children: null,
};

export default mainContainer;
