import { Stack } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

interface Props {
  backgroundColor?: string;
  justifyContent?: string;
}

const SplashScreen: FC<Props & PropsWithChildren> = ({
  backgroundColor,
  children,
  justifyContent,
}) => {
  return (
    <Stack
      flexDirection="column"
      height="100vh"
      sx={{ backgroundColor }}
      justifyContent={justifyContent}
    >
      {children}
    </Stack>
  );
};

SplashScreen.defaultProps = {
  backgroundColor: '#E9DAC4',
  justifyContent: 'flex-start',
};

export default SplashScreen;
