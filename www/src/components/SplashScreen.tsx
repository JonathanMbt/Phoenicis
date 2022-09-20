import { Stack } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

interface Props {
  backgroundColor?: string;
}

const SplashScreen: FC<Props & PropsWithChildren> = ({
  backgroundColor,
  children,
}) => {
  return (
    <Stack flexDirection="column" height="100vh" sx={{ backgroundColor }}>
      {children}
    </Stack>
  );
};

SplashScreen.defaultProps = {
  backgroundColor: '#E9DAC4',
};

export default SplashScreen;
