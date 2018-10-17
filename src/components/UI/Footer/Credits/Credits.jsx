import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const credits = ({ title }) => (
  <Typography
    align="center"
    color="inherit"
    variant="body2"
    style={{ flexBasis: '100%' }}
  >
    {`${title} ©2018 SeaBadger.io`}
  </Typography>
);

credits.propTypes = {
  title: PropTypes.string.isRequired,
};

export default credits;
