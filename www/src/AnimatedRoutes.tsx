import { AnimatePresence } from 'framer-motion';
import { FC } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './views/Home';
import WIP from './views/WIP';

const AnimatedRoutes: FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes key={location.pathname} location={location}>
        <Route index element={<Home />} />
        <Route element={<Layout />}>
          <Route path="/WIP" element={<WIP />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
