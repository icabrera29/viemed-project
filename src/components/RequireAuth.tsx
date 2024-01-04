import React, {type PropsWithChildren} from 'react';
import {Navigate, useLocation} from 'react-router-dom';

const RequireAuth = ({children}: PropsWithChildren): JSX.Element => {
  const location = useLocation();
  const token: string | null = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" state={{from: location}} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
