import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import propTypes from 'prop-types';

import SummaryCard from './Card/SummaryCard';
import { cardInfo } from './util/card-info';
import { totalsForCard } from '../../utils/totalsForCard';

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

const Cards = ({ data, quantity }) => {
  const styles = useStyles();

  let confirmedGrowth;
  let deathsGrowth;
  let recoveredGrowth;

  if (data.length) {
    confirmedGrowth = data[data.length - 1].confirmedGrowth;
    deathsGrowth = data[data.length - 1].deathsGrowth;
    recoveredGrowth = data[data.length - 1].recoveredGrowth;
  }

  const {
    iMonthTotal,
    iWeekTotal,
    rMonthTotal,
    rWeekTotal,
    dMonthTotal,
    dWeekTotal
  } = totalsForCard(data);

  const typography = cardInfo({
    confirmedGrowth,
    deathsGrowth,
    recoveredGrowth,
    iMonthTotal,
    iWeekTotal,
    rMonthTotal,
    rWeekTotal,
    dMonthTotal,
    dWeekTotal
  });

  const typographyKeys = Object.keys(typography);

  return (
    <div className={styles.container}>
      <Grid container spacing={2} className={styles.root} justify="center">
        {Array.from({ length: quantity }, (_, i) => (
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
  data: propTypes.array.isRequired,
  quantity: propTypes.number.isRequired
};

export default Cards;
