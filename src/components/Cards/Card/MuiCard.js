import React from 'react';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';

const useStyles = makeStyles({
  card: {
    margin: '0 2%'
  },
  infected: {
    borderBottom: '10px solid #7e57c2b0'
  },
  recovered: {
    borderBottom: '10px solid #17f71785'
  },
  deceased: {
    borderBottom: '10px solid rgba(244, 54, 54, .69)'
  }
});

const MuiCard = ({ tConfig, type }) => {
  const styles = useStyles();
  return (
    <Card className={[styles[type], styles.card].join(' ')}>
      <CardContent>
        {tConfig.map((config, i) => {
          if (typeof config.value === 'number') {
            return (
              <Typography align="center" key={i} {...config.styles}>
                <CountUp {...config.cu_config} />
              </Typography>
            );
          }
          return (
            <Typography align="center" key={i} {...config.styles}>
              {config.value}
            </Typography>
          );
        })}
      </CardContent>
    </Card>
  );
};

MuiCard.propTypes = {
  tConfig: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
};

export default MuiCard;
