import React from 'react';
import { Link } from 'react-router-dom';

import styles from './landing.module.css';

export default function Landing() {
  return (
    <main className={styles.hero}>
      <div className={styles.container}>
        <section className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Cookup.
            <span className={styles.highlightedText}>Whatever</span>
            you want.
          </h1>
          <p className={styles.heroCopy}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore asperiores adipisci
            minima quo nulla sequi quas eos deleniti consectetur dolor?
          </p>
          <div className={styles.buttons}>
            <Link className={styles.btn} to="/signup">
              Signup
            </Link>
            <Link className={styles.btnOutline} to="/recipes">
              Browse recipes
            </Link>
          </div>
        </section>
        <div className={styles.heroImage} />
      </div>
    </main>
  );
}
