import { createMuiTheme } from '@material-ui/core';
// import deepPurple from '@material-ui/core/colors/deepPurple';

export const theme = createMuiTheme({
  breakpoints: {
    keys: ['xs', 'sm', 'tablet', 'md', 'laptop', 'lg', 'xl'],
    values: {
      xs: 0,
      sm: 600,
      tablet: 768,
      md: 960,
      laptop: 1024,
      lg: 1280,
      xl: 1920
    }
  },
  palette: {
    primary: {
      main: '#544E74',
      light: '#817aa3',
      dark: '#2a2648'
    },
    secondary: {
      main: '#EAD375',
      light: '#ffffa5',
      dark: '#b6a246'
    }
  }
});
