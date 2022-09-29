import { createTheme } from '@mui/material';
import symbiod from '../../assets/fonts/symbiod.woff2';

const phoenicisTheme = createTheme({
  typography: {
    h1: {
      fontFamily: 'Symbiod',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
            font-family: 'Symbiod';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: url(${symbiod}) format('woff2');
        }
        `,
    },
  },
});

export default phoenicisTheme;
