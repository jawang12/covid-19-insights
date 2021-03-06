import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  Divider,
  Box
} from '@material-ui/core';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';

const useStyles = makeStyles({
  card: {
    borderRadius: 12,
    position: 'relative',
    overflow: 'visible',
    boxShadow:
      '0 1px 1px rgba(0,0,0,0.11), 0 2px 2px rgba(0,0,0,0.11), 0 4px 4px rgba(0,0,0,0.11), 0 6px 8px rgba(0,0,0,0.11), 0 8px 16px rgba(0,0,0,0.11)',
    // transition: 'all 0.3s ease-in-out',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: '-1',
      top: 0,
      left: 0,
      opacity: 0,
      boxShadow:
        '0 2px 1px rgba(0,0,0,0.09), 0 4px 2px rgba(0,0,0,0.09), 0 8px 4px rgba(0,0,0,0.09), 0 16px 8px rgba(0,0,0,0.09), 0 32px 16px rgba(0,0,0,0.09)',
      transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)'
    },
    // '&:hover': {
    //   transform: 'scale(1.1)'
    // },
    '&:hover::after': {
      opacity: 1
    }
  },
  box: {
    flexBasis: '50%',
    position: 'relative',
    '&:not(:last-of-type)': {
      '&:after': {
        content: '" "',
        display: 'block',
        position: 'absolute',
        height: '50%',
        width: 1,
        backgroundColor: 'rgb(0,0,0,.1)',
        top: '50%',
        right: 0,
        transform: 'translateY(-50%)'
      }
    }
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

const SummaryCard = ({ tConfig, type }) => {
  const styles = useStyles();
  const typography = tConfig.map((config, i) =>
    i === 0 ? (
      <Typography key={i} align="center" {...config.styles}>
        <CountUp {...config.cu_config} />
      </Typography>
    ) : (
      <Typography key={i} align="center" {...config.styles}>
        {config.value}
      </Typography>
    )
  );

  return (
    <Card className={[styles[type], styles.card].join(' ')}>
      <CardContent>{typography.slice(0, 2)}</CardContent>
      <Divider light variant="middle" />
      <Box display="flex">
        <Box p={2} flex="auto" className={styles.box}>
          {typography.slice(2, 4)}
        </Box>
        <Box p={2} flex="auto" className={styles.box}>
          {typography.slice(4, 6)}
        </Box>
      </Box>
    </Card>
  );
};

SummaryCard.propTypes = {
  tConfig: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
};

export default SummaryCard;

/*
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
*/
