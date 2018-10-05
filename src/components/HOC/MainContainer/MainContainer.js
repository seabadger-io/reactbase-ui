import React from 'react';

import Grid from '@material-ui/core/Grid';

import classes from './MainContainer.css';

const mainContainer = props => (
  <Grid component="main" className={classes.MainContainer}>
    {props.children}
  </Grid>
);

export default mainContainer;
