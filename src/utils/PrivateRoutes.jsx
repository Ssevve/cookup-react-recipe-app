import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// import PropTypes from 'prop-types';

export default function PrivateRoutes() {
  const [user, setUser] = useState(null);
  const [isFetchingUser, setIsFetchingUser] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/auth', {
        credentials: 'include',
      });
      const data = await res.json();
      setUser(data.user);
      return setIsFetchingUser(false);
    } catch (err) {
      return console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return !isFetchingUser && (user ? <Outlet context={user} /> : <Navigate to="/login" />);
}

// PrivateRoutes.propTypes = {
//   user: PropTypes.shape({}),
// };

// PrivateRoutes.defaultProps = {
//   user: null,
// };
