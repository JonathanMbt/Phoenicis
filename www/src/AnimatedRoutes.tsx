import { AnimatePresence } from 'framer-motion';
import { FC } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './views/Home';
import WIP from './views/WIP';

const AnimatedRoutes: FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes key={location.pathname} location={location}>
        <Route index element={<Home />} />
        <Route path="/WIP" element={<WIP />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
