import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';

const MuiCard = ({ tConfig }) => {
  return (
    <Card>
      <CardContent>
        {tConfig.map((config, i) => {
          if (typeof config.value === 'number') {
            return (
              <Typography key={i} {...config.styles}>
                <CountUp {...config.cu_config} />
              </Typography>
            );
          }
          return (
            <Typography key={i} {...config.styles}>
              {config.value}
            </Typography>
          );
        })}
      </CardContent>
    </Card>
  );
};

MuiCard.propTypes = {
  tConfig: PropTypes.array.isRequired
};

export default MuiCard;
