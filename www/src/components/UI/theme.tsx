import { createTheme } from '@mui/material';
import { TypographyStyleOptions } from '@mui/material/styles/createTypography';

const headings: TypographyStyleOptions = {
  fontFamily: 'Symbiod',
};

const paragraph: TypographyStyleOptions = {
  fontFamily: 'Caslon',
  fontSize: 30,
};

const phoenicisTheme = createTheme({
  typography: {
    fontFamily: ['Caslon'].join(','),
    h1: headings,
    h2: headings,
    h3: headings,
    h4: headings,
    h5: headings,
    h6: headings,
    subtitle1: paragraph,
    subtitle2: paragraph,
    body1: paragraph,
    body2: paragraph,
    button: {
      ...paragraph,
      fontSize: 20,
    },
  },
});

export default phoenicisTheme;
