import React from 'react';
import { Link } from 'react-router-dom';

import styles from './landing.module.css';

import Container from '../../components/Container';
import Button from '../../components/Button';

export default function Landing() {
  return (
    <main className={styles.hero}>
      <Container>
        <h1 className={styles.heroTitle}>
          Cookup.
          <span className={styles.highlightedText}>Whatever</span>
          you want.
        </h1>
        <p className={styles.heroCopy}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore asperiores adipisci minima
          quo nulla sequi quas eos deleniti consectetur dolor?
        </p>
        <div className={styles.buttons}>
          <Link to="/signup">
            <Button text="Signup" className={styles.btn} />
          </Link>
          <Link to="/signup">
            <Button text="Browse Recipes" variant="outline" className={styles.btn} />
          </Link>
        </div>
        <section className="hero-image" />
      </Container>
    </main>
  );
}
