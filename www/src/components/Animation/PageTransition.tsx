import { motion, Transition, Variants } from 'framer-motion';
import { FC, PropsWithChildren } from 'react';

interface Props {
  transition?: Transition;
  initial?: boolean;
  customVariants?: Variants;
}

const PageTransition: FC<Props & PropsWithChildren> = ({
  children,
  transition,
  initial,
  customVariants,
}) => {
  const variants: Variants = {
    displayed: { scale: 1, transition: { duration: 1.4, ease: 'easeInOut' } },
    triggered: {
      y: '-100%',
      position: 'absolute',
      zIndex: 1,
      width: '100%',
      transition: { type: 'spring', damping: 5, stiffness: 40 },
    },
    enter: { scale: 2 },
  };

  return (
    <motion.div
      variants={customVariants ?? variants}
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
