import { Fragment, ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import Sidebar from '../dashboard/sidebar';
import Topbar from '../dashboard/topbar';

type LayoutProvider = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: LayoutProvider) => {
  return (
    <Fragment>
      <div className='d-flex flex-column flex-lg-row '>
        <Sidebar />
        <div style={{ minHeight: '100vh' }} className=' flex-grow-1 '>
          <Topbar />
          <main>
            <Container fluid>{children}</Container>
          </main>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardLayout;
