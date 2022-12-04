import React from 'react';
import { Link } from 'react-router-dom';

import styles from './signupPage.module.css';

import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import SignupForm from '../../components/SignupForm';

export default function SignupPage() {
  return (
    <PageContainer>
      <section className={styles.formSection}>
        <PageTitle>Sign up</PageTitle>
        <p className={styles.existingUser}>
          Existing user?
          <Link className={styles.link} to="/login">Log in</Link>
        </p>
        <SignupForm />
      </section>
      <section className={styles.signupImage} />
    </PageContainer>
  );
}
