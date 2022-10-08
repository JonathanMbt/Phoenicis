import { AnimatePresence } from 'framer-motion';
import { FC } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import App from './App';
import Test from './test';

const AnimatedRoutes: FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes key={location.pathname} location={location}>
        <Route index element={<App />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
