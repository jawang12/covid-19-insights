import React from 'react';
import { Grid } from '@material-ui/core';
import propTypes from 'prop-types';

import classes from './Cards.module.css';
import MuiCard from './Card/MuiCard';
import { cardInfo } from './util/card-info';

const Cards = (props) => {
  const {
    data: { confirmed, deaths, lastUpdate, recovered },
    quantity
  } = props;

  const { amount, typography } = cardInfo({
    quantity,
    confirmed,
    deaths,
    lastUpdate,
    recovered
  });

  const typographyKeys = Object.keys(typography);

  return (
    <div className={classes.Container}>
      <Grid container spacing={3} justify="center">
        {Array.from({ length: amount }, (_, i) => (
          <Grid item xs={12} sm={7} md={3} key={i}>
            <MuiCard
              tConfig={typography[typographyKeys[i]]}
              type={typographyKeys[i]}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

Cards.propTypes = {
  data: propTypes.shape({
    confirmed: propTypes.object,
    deaths: propTypes.object,
    recovered: propTypes.object,
    lastUpdate: propTypes.string
  })
};

export default Cards;
