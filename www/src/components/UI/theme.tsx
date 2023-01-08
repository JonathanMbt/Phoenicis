import { createTheme } from '@mui/material';
import { TypographyStyleOptions } from '@mui/material/styles/createTypography';

declare module '@mui/material/styles' {
  interface Palette {
    overlay: Palette['primary'];
    overlayText: Palette['primary'];
  }

  interface PaletteOptions {
    overlay?: PaletteOptions['primary'];
    overlayText?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/ButtonGroup' {
  export interface ButtonGroupPropsColorOverrides {
    overlayText: true;
  }
}

const headings: TypographyStyleOptions = {
  fontFamily: 'Symbiod',
};

const paragraph: TypographyStyleOptions = {
  fontFamily: 'Caslon',
  fontSize: 30,
};

const defaultTheme = createTheme({});

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
  palette: {
    overlay: {
      main: 'rgba(0, 0, 0, 0.65)',
    },
    overlayText: {
      main: defaultTheme.palette.getContrastText('rgba(0, 0, 0, 0.65)'),
    },
  },
});

export default phoenicisTheme;
