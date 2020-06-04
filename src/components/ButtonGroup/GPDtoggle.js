import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 8,
    right: 10
  },
  button: {
    fontSize: '.7rem',
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
  }
});

const GPDtoggle = ({ toggle, tState }) => {
  const styles = useStyles();
  return (
    <ButtonGroup
      className={styles.root}
      color="primary"
      variant="text"
      aria-label="text primary button group"
      size="small"
    >
      <Button
        onClick={() => toggle('total')}
        style={{ backgroundColor: tState === 'total' ? '#ede7f6' : '' }}
        className={styles.button}
      >
        Total
      </Button>
      <Button
        onClick={() => toggle('week')}
        className={styles.button}
        style={{ backgroundColor: tState === 'week' ? '#ede7f6' : '' }}
      >
        Last 15
      </Button>
      <Button
        onClick={() => toggle('month')}
        className={styles.button}
        style={{ backgroundColor: tState === 'month' ? '#ede7f6' : '' }}
      >
        Last 30
      </Button>
    </ButtonGroup>
  );
};

export default GPDtoggle;
