import React from 'react';
// import RecipeForm from '../../components/RecipeForm';

import styles from './addRecipe.module.css';

import Container from '../../components/Container';

export default function AddRecipe() {
  return (
    <section className={styles.addRecipe}>
      <Container className={styles.container}>
        <h1 className={styles.title}>Add recipe</h1>
        {/* <RecipeForm className={styles.form} /> */}
      </Container>
    </section>
  );
}
