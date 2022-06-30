import { Fragment, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux';

type Props = {
  children: ReactNode;
};

const AdminProvider = ({ children }: Props) => {
  const { userInfo } = useAppSelector((state) => state.login);

  if (userInfo && userInfo.isAdmin) {
    return <>{children}</>;
  } else {
    return (
      <Fragment>
        <Navigate to={'/'} replace />
      </Fragment>
    );
  }
};

export default AdminProvider;
