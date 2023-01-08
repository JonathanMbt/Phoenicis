import { Box, Button, ButtonProps } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import BetterButtonStyles from './BetterButton.css';

interface Props {
  to?: string;
  //eslint-disable-next-line
  FramerAnimation?: React.ComponentType<any>;
}

const BetterButton: FC<Props & ButtonProps & PropsWithChildren> = ({
  children,
  to,
  FramerAnimation,
  ...props
}) => {
  return (
    <>
      {FramerAnimation !== undefined ? (
        <FramerAnimation>
          <BetterButtonStyles {...props} component={to ? Link : Button} to={to ?? ''}>
            <Box>{children}</Box>
          </BetterButtonStyles>
        </FramerAnimation>
      ) : (
        <BetterButtonStyles {...props} component={to ? Link : Button} to={to ?? ''}>
          <Box>{children}</Box>
        </BetterButtonStyles>
      )}
    </>
  );
};

export default BetterButton;
