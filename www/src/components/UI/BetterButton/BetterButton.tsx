import { Box, Button, ButtonTypeMap } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import BetterButtonStyles from './BetterButton.css';

interface Props {
  to?: string;
  color?: string;
  FramerAnimation?: React.ComponentType<any>;
}

const BetterButton: FC<Props & ButtonTypeMap['props'] & PropsWithChildren> = ({
  children,
  to,
  color,
  FramerAnimation,
  ...props
}) => {
  return (
    <>
      {FramerAnimation !== undefined ? (
        <FramerAnimation>
          <BetterButtonStyles
            {...props}
            sx={{ color: color ?? 'black' }}
            component={to ? Link : Button}
            to={to ?? ''}
          >
            <Box>{children}</Box>
          </BetterButtonStyles>
        </FramerAnimation>
      ) : (
        <BetterButtonStyles
          {...props}
          sx={{ color: color ?? 'black' }}
          component={to ? Link : Button}
          to={to ?? ''}
        >
          <Box>{children}</Box>
        </BetterButtonStyles>
      )}
    </>
  );
};

export default BetterButton;
