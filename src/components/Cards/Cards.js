import React from 'react';
import { Grid } from '@material-ui/core';
import propTypes from 'prop-types';

import classes from './Cards.module.css';
import MuiCard from './Card/MuiCard';

const Cards = ({ info: { amount, typography } }) => {
  const typographyKeys = Object.keys(typography);
  return (
    <div className={classes.Container}>
      <Grid container spacing={3} justify="center">
        {Array.from({ length: amount }, (_, i) => (
          <Grid item key={i}>
            <MuiCard tConfig={typography[typographyKeys[i]]} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

Cards.propTypes = {
  info: propTypes.shape({
    amount: propTypes.number.isRequired,
    typography: propTypes.object.isRequired
  })
};

export default Cards;
