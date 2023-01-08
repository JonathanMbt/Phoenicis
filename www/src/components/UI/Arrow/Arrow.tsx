import { Box } from '@mui/material';
import { FC, useCallback } from 'react';
import { Orientation } from '../../../types/animation';
import useArrowStyles from './Arrow.css';

interface Props {
  orientation?: Orientation;
  color?: string;
}

const Arrow: FC<Props> = ({ orientation, color }) => {
  const calcDeg = useCallback((orientation: Orientation) => {
    switch (orientation) {
      case 'left':
        return '135deg';
      case 'right':
        return '-45deg';
      case 'top':
        return '-135deg';
      case 'down':
        return '45deg';
    }
  }, []);

  const { classes, cx } = useArrowStyles({
    orientationDeg: calcDeg(orientation ?? 'down'),
    color: color ?? 'black',
  });

  return (
    <>
      <Box alignSelf="center" className={cx(classes.arrowBody)} />
    </>
  );
};

Arrow.defaultProps = {
  orientation: 'down',
};

export default Arrow;
