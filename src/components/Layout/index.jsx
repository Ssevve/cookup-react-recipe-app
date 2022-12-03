import React from 'react';
import PropTypes from 'prop-types';

import styles from './layout.module.css';

import Navbar from '../Navbar';

export default function Layout({ children, user, setUser }) {
  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <main className={styles.main}>{children}</main>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  user: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.shape({}),
  ]),
  setUser: PropTypes.func.isRequired,
};

Layout.defaultProps = {
  user: null,
};
