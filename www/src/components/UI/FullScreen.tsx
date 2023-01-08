import { Stack, StackProps } from '@mui/material';
import { FC } from 'react';

type Props = Omit<StackProps, 'flexDirection' | 'flex' | 'height'>;

const FullScreen: FC<Props> = ({ children, ...props }) => {
  return (
    <Stack flexDirection="column" height="100vh" {...props}>
      {children}
    </Stack>
  );
};

FullScreen.defaultProps = {
  justifyContent: 'flex-start',
};

export default FullScreen;
