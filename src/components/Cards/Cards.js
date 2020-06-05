import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import propTypes from 'prop-types';

import SummaryCard from './Card/SummaryCard';
import { cardInfo } from './util/card-info';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.between(768, 960)]: {
      flexWrap: 'nowrap'
    }
  },
  container: {
    margin: '50px 0 30px 0',
    [theme.breakpoints.between(768, 960)]: {
      width: '85%'
    },
    [theme.breakpoints.up('md')]: {
      width: '70%'
    }
  },
  gridItem: {
    [theme.breakpoints.between('sm', 768)]: {
      // maxWidth: '65%',
      // flexBasis: '55%'
      width: 'auto'
    }
  }
}));

const Cards = (props) => {
  const styles = useStyles();
  const {
    data: { confirmedGrowth, deathsGrowth, updatedDate, recoveredGrowth },
    quantity
  } = props;

  const { amount, typography } = cardInfo({
    quantity,
    updatedDate,
    confirmedGrowth,
    deathsGrowth,
    recoveredGrowth
  });

  const typographyKeys = Object.keys(typography);

  return (
    <div className={styles.container}>
      <Grid container spacing={2} className={styles.root} justify="center">
        {Array.from({ length: amount }, (_, i) => (
          <Grid item xs={10} sm={6} md={4} key={i} className={styles.gridItem}>
            <SummaryCard
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
