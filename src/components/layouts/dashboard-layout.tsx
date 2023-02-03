import { Fragment, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux';
import Sidebar from '../dashboard/sidebar';
import Topbar from '../dashboard/topbar';

const DashboardLayout = () => {
  const { userInfo } = useAppSelector((state) => state.login);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo && !userInfo?.isAdmin) {
      navigate('/');
    }
  }, [userInfo]);

  return (
    <Fragment>
      <div className='d-flex flex-column flex-lg-row '>
        <Sidebar />
        <div style={{ minHeight: '100vh' }} className=' flex-grow-1 '>
          <Topbar />
          <main>
            <Container fluid>
              <Outlet />
            </Container>
          </main>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardLayout;
