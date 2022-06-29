import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux';

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const { userInfo } = useAppSelector((state) => state.login);

  if (!userInfo) {
    return (
      <>
        <Navigate to={'/login'} replace />{' '}
      </>
    );
  } else {
    return <> {children} </>;
  }
};

export default AuthProvider;
