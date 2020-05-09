import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const MuiCard = ({ tConfig }) => {
  return (
    <Card>
      <CardContent>
        {tConfig.map((config, i) => (
          <Typography key={i} {...config.styles}>
            {config.value}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

MuiCard.propTypes = {
  tConfig: PropTypes.array.isRequired
};

export default MuiCard;
