import { motion, Transition, Variants } from 'framer-motion';
import { FC, PropsWithChildren } from 'react';

interface Props {
  transition?: Transition;
  initial?: boolean;
}

const PageTransition: FC<Props & PropsWithChildren> = ({ children, transition, initial }) => {
  const variants: Variants = {
    displayed: { scale: 1, transition: { duration: 2, ease: 'easeInOut' } },
    triggered: {
      y: '-100%',
      transition: { type: 'spring', duration: 1, damping: 5, stiffness: 50 },
    },
    enter: { scale: 2 },
  };

  return (
    <motion.div
      variants={variants}
      initial={initial === false ? false : 'enter'}
      animate="displayed"
      exit="triggered"
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

PageTransition.defaultProps = {
  initial: true,
};

export default PageTransition;
