import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cx from 'classnames';

import useLoggedInUser from '../../hooks/useLoggedInUser';

import styles from './landingPage.module.css';

import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';

export default function LandingPage() {
  const [user] = useLoggedInUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate(`/profile/${user.id}`);
  });

  return (
    <PageContainer>
      <section className={styles.content}>
        <PageTitle big>
          Cookup.
          <span className={styles.highlightedText}>Whatever</span>
          you want.
        </PageTitle>
        <p className={styles.copy}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore asperiores adipisci minima
          quo nulla sequi quas eos deleniti consectetur dolor?
        </p>
        <div className={styles.buttons}>
          <Link className={cx(styles.btn, styles.cta)} to="/signup">
            Sign up
          </Link>
          <Link className={cx(styles.btn, styles.outline)} to="/recipes/browse">
            Browse recipes
          </Link>
        </div>
      </section>
      <div className={styles.heroImage} />
    </PageContainer>
  );
}
