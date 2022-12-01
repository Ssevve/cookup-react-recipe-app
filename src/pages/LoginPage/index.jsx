/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './loginPage.module.css';

import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import LoginForm from '../../components/LoginForm';

export default function LoginPage({ setUser }) {
  return (
    <PageContainer>
      <section className={styles.formSection}>
        <PageTitle>Log in</PageTitle>
        <p className={styles.newUser}>
          New user?
          <Link className={styles.link} to="/signup">Sign up</Link>
        </p>
        <LoginForm setUser={setUser} />
      </section>
      <section className={styles.loginImage} />
    </PageContainer>
  );
}
