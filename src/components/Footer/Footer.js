import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '130px',
    alignItems: 'center',
    padding: '0 5%',
    textAlign: 'center',
    height: '90px',
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      flexDirection: 'column',
      height: '100%',
      paddingTop: '10px',
      paddingBottom: '10px'
    }
  },
  textBox1: {
    paddingTop: '7px'
  },
  item2: {
    flexGrow: 1
  },
  textBox2: {
    paddingBottom: '7px'
  },
  text: {
    color: '#fff',
    cursor: 'default',
    opacity: 0.6
  },
  glow: {
    transition: 'opacity 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)',
    '&:hover': {
      opacity: 0.9
    }
  },
  anchor: {
    textDecoration: 'none',
    opacity: 0.4,
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '2px',
      bottom: 0,
      left: 0,
      backgroundColor: '#fff',
      visibility: 'hidden',
      transform: 'scaleX(0)',
      transition: 'all .3s ease-in-out 0s'
    },
    '&:hover::before': {
      visibility: 'visible',
      transform: 'scaleX(1)'
    },
    '&:any-link': {
      color: '#fff'
    }
  }
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.textBox1}>
        <Typography className={classes.text} display="inline">
          Data is provided by{' '}
        </Typography>
        <a
          target="_blank"
          className={[classes.anchor, classes.glow].join(' ')}
          rel="noopener noreferrer"
          href="https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6"
        >
          <Typography display="inline">
            Johns Hopkins University CSSE
          </Typography>
        </a>{' '}
        <Typography display="inline" className={classes.text}>
          via{' '}
        </Typography>
        <a
          target="_blank"
          className={[classes.anchor, classes.glow].join(' ')}
          rel="noopener noreferrer"
          href="https://github.com/mathdroid/covid-19-api"
        >
          <Typography display="inline">mathdroid API</Typography>
        </a>
      </Grid>
      <Grid item className={classes.item2}>
        <Typography className={classes.textBox2} align="right">
          <span className={[classes.text, classes.glow].join(' ')}>
            powered by{' '}
            <FontAwesomeIcon
              size="2x"
              transform="down-2"
              spin
              style={{ animationDuration: '3s' }}
              icon={faReact}
            />
          </span>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
