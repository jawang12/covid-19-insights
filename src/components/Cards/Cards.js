import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import propTypes from 'prop-types';

import classes from './Cards.module.css';
import MuiCard from './Card/MuiCard';
import { cardInfo } from './util/card-info';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.between(768, 960)]: {
      flexWrap: 'nowrap'
    }
  },
  gridItem: {
    [theme.breakpoints.between('sm', 768)]: {
      maxWidth: '60%',
      flexBasis: '55%'
    }
  }
}));

const Cards = (props) => {
  const styles = useStyles();
  const {
    data: { confirmed, deaths, updatedDate, recovered },
    quantity
  } = props;

  const { amount, typography } = cardInfo({
    quantity,
    confirmed,
    deaths,
    updatedDate,
    recovered
  });

  const typographyKeys = Object.keys(typography);

  return (
    <div className={classes.Container}>
      <Grid container spacing={3} className={styles.root} justify="center">
        {Array.from({ length: amount }, (_, i) => (
          <Grid item xs={9} sm={6} md={3} key={i} className={styles.gridItem}>
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
    confirmed: propTypes.number,
    deaths: propTypes.number,
    recovered: propTypes.number,
    updatedDate: propTypes.string
  })
};

export default Cards;
