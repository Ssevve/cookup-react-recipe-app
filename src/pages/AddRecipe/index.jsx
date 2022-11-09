import React from 'react';

import styles from './addRecipe.module.css';

import Container from '../../components/Container';
import RecipeForm from '../../components/RecipeForm';

export default function AddRecipe() {
  return (
    <section className={styles.addRecipe}>
      <Container className={styles.container}>
        <h1 className={styles.title}>Add recipe</h1>
        <RecipeForm />
      </Container>
    </section>
  );
}
