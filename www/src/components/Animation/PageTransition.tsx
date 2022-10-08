import { FC, PropsWithChildren, useState } from 'react';
import { motion, Variants } from 'framer-motion';

const usePageTransition: FC<PropsWithChildren> = ({ children }) => {
  const [isTriggered, setIsTriggered] = useState(false);

  const variants: Variants = {
    displayed: { y: 0 },
    triggered: { y: '-100vw' },
  };

  return (
    <motion.div
      variants={variants}
      animate={isTriggered ? 'triggered' : 'displayed'}
    >
      {children}
    </motion.div>
  );
};

export default usePageTransition;
