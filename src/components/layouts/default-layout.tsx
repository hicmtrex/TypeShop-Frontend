import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Brands from '../brands/brands';
import Carousels from '../carousels';
import DownFooter from '../footer/down-footer';
import Footer from '../footer/footer';
import Header from '../header';

type LayoutProvider = {
  children: ReactNode;
};

const DefaultLayout = ({ children }: LayoutProvider) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  return (
    <>
      <Header />
      {isHome && <Carousels />}
      <main id='main' className='py-3'>
        {children}
      </main>
      {isHome && <Brands />}
      <div id='footer'>
        {isHome && <DownFooter />}
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;
