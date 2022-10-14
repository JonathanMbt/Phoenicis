import { motion, Variants } from 'framer-motion';
import { FC, PropsWithChildren } from 'react';
import { Orientation } from '../../types/animation';

interface Props {
  direction: Orientation;
}

const ComeAndGo: FC<Props & PropsWithChildren> = ({ direction, children }) => {
  const variants: Record<Orientation, Variants> = {
    down: {
      come: {
        y: 0,
      },
      go: {
        y: '30%',
      },
    },
    right: {
      come: {
        x: 0,
      },
      go: {
        x: '30%',
      },
    },
    left: {
      come: {
        x: 0,
      },
      go: {
        x: '-30%',
      },
    },
    top: {
      come: {
        y: 0,
      },
      go: {
        y: '-30%',
      },
    },
  };

  return (
    <motion.div
      variants={variants[direction]}
      initial="come"
      animate="go"
      transition={{ repeatType: 'reverse', repeat: Infinity, duration: 1.5 }}
    >
      {children}
    </motion.div>
  );
};

ComeAndGo.defaultProps = {
  direction: 'down',
};

export default ComeAndGo;
