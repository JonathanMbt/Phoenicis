import { Box, Button, ButtonTypeMap } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import BetterButtonStyles from './BetterButton.css';

interface Props {
  to?: string;
  color?: string;
  onClick?: () => void;
  FramerAnimation?: React.ComponentType<any>;
}

const BetterButton: FC<Props & ButtonTypeMap['props'] & PropsWithChildren> = ({
  children,
  to,
  color,
  onClick,
  FramerAnimation,
  ...props
}) => {
  return (
    <>
      {FramerAnimation !== undefined ? (
        <FramerAnimation>
          <BetterButtonStyles
            {...props}
            onClick={onClick}
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
          onClick={onClick}
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
