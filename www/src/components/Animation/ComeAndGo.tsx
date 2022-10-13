import { motion, Variants } from 'framer-motion';
import { FC, PropsWithChildren } from 'react';
import { Orientation } from '../../types/animation';

interface Props {
  direction: Orientation;
}

const ComeAndGo: FC<Props & PropsWithChildren> = ({ direction, children }) => {
  const variants: Variants = {
    come: {
      y: 0,
    },
    go: {
      y: '30%',
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="come"
      animate="go"
      transition={{ repeatType: 'reverse', repeat: Infinity, duration: 1.5 }}
    >
      {children}
    </motion.div>
  );
};

export default ComeAndGo;
