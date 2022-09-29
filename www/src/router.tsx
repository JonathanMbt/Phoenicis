import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import TestThreeJS from './components/TestThreeJS';
import HexMap from './components/HexMap';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/testJS1',
    element: <TestThreeJS />,
  },
  {
    path: '/testJS2',
    element: <HexMap />,
  }
]);

export default router;
