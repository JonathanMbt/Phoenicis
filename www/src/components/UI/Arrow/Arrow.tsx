import { Box } from '@mui/material';
import { FC } from 'react';
import useArrowStyles from './Arrow';

const Arrow: FC = () => {
  const { classes, cx } = useArrowStyles();

  return (
    <>
      <Box className={cx(classes.arrowBody)}></Box>
    </>
  );
};

export default Arrow;
