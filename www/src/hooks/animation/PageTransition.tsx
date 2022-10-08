import { motion, Variants } from 'framer-motion';
import { FC, PropsWithChildren } from 'react';

interface Props {}

const PageTransition: FC<Props & PropsWithChildren> = ({ children }) => {
  const variants: Variants = {
    displayed: { y: 0 },
    triggered: { y: '-100%' },
  };

  return (
    <motion.div
      variants={variants}
      initial="displayed"
      exit="triggered"
      transition={{ duration: 3 }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
