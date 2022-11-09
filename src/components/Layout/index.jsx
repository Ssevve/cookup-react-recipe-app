/* eslint-disable react/prop-types */
import React from 'react';

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
