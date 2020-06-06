import React from 'react';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  useTheme
} from '@material-ui/core/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVirus } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  toolbar: {
    padding: '0 5%'
  },
  title: {
    flexGrow: 1,
    letterSpacing: '.14rem'
  },
  github: {
    cursor: 'pointer',
    opacity: '.6',
    transition: 'opacity 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)',
    '&:hover': {
      opacity: '.9'
    }
  },
  anchor: {
    textDecoration: 'none',
    color: 'inherit'
  }
});

const Navbar = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" align="center" className={classes.title}>
            C
            <span style={{ paddingRight: '.14rem' }}>
              <FontAwesomeIcon
                spin
                color={theme.palette.secondary.main}
                icon={faVirus}
                style={{ animationDuration: '5s' }}
              ></FontAwesomeIcon>
            </span>
            VID-19 INSIGHTS
          </Typography>
          <span className={classes.github}>
            <a
              target="_blank"
              href="https://github.com/jawang12/covid-19-insights"
              rel="noopener noreferrer"
              className={classes.anchor}
            >
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </a>
          </span>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
