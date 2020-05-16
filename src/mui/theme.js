import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  breakpoints: {
    keys: ['xs', 'sm', 'tablet', 'md', 'laptop', 'lg', 'xl'],
    values: {
      xs: 0,
      sm: 600,
      tablet: 770,
      md: 960,
      laptop: 1024,
      lg: 1280,
      xl: 1920
    }
  }
});
