import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';

export default function PrivateRoutes() {
  const [user, isLoading] = useLoggedInUser();

  return (!isLoading && (user ? <Outlet context={user} /> : <Navigate to="/login" />));
}
