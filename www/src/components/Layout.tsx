import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import ConnectionModal from './ConnectionModal';

const Layout: FC = () => {
  return (
    <>
      <Outlet />
      <ConnectionModal />
      <Footer />
    </>);

};

export default Layout;
