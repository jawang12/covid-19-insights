import React from 'react';
import { Typography, makeStyles, Tooltip, Fade } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1rem',
    marginTop: '3rem'
  },
  date: {
    color: theme.palette.secondary.dark,
    marginTop: 20
  },
  title: {
    display: 'inline-block',
    textAlign: 'center'
  },
  button: {
    transform: 'translateY(-2rem)',
    display: 'inline-block',
    [theme.breakpoints.down(447)]: {
      display: 'block',
      transform: 'none',
      textAlign: 'center',
      marginTop: 15
    }
  },
  tooltip: {
    backgroundColor: theme.palette.primary.main,
    fontSize: theme.typography.pxToRem(13),
    color: theme.palette.secondary.main,
    maxWidth: 270
  },
  icon: {
    color: theme.palette.primary.light,
    transition: 'color 500ms ease-in-out',
    '&:hover': {
      color: theme.palette.secondary.main
    }
  }
}));

const Title = ({ name, dailyReport }) => {
  const styles = useStyles();
  let date;
  if (dailyReport.length) {
    date = new Date(
      dailyReport[dailyReport.length - 1].updatedDate.slice(5) +
        `-${new Date().getFullYear()}`
    ).toLocaleDateString([], {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  const tooltipText = `Daily reports reflect the accumulated total for a single day and are updated each morning.`;
  return (
    <div className={styles.root}>
      <Typography color="primary" variant="h2" className={styles.title}>
        {name}{' '}
      </Typography>
      <Tooltip
        title={tooltipText}
        classes={{ tooltip: styles.tooltip }}
        placement="top"
        arrow
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 500 }}
      >
        <div className={styles.button}>
          <FontAwesomeIcon
            icon={faInfoCircle}
            className={styles.icon}
          ></FontAwesomeIcon>
        </div>
      </Tooltip>
      <Typography align="center" className={styles.date}>
        Latest Report: {date}
      </Typography>
    </div>
  );
};

export default Title;
