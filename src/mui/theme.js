import { createMuiTheme } from '@material-ui/core';
import deepPurple from '@material-ui/core/colors/deepPurple';

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
    primary: deepPurple
  }
});
