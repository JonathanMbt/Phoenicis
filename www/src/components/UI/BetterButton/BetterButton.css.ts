import { Button } from '@mui/material';
import { withStyles } from 'tss-react/mui';

const BetterButtonStyles = withStyles(Button, (theme) => ({
  textSizeSmall: {
    fontSize: theme.typography.pxToRem(15),
  },
  textSizeMedium: {
    fontSize: theme.typography.pxToRem(20),
  },
  textSizeLarge: {
    fontSize: theme.typography.pxToRem(30),
  },
}));

export default BetterButtonStyles;
