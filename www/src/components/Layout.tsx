import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Layout: FC = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>);

};

export default Layout;
