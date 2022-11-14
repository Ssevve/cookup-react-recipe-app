import React from 'react';

import styles from './addRecipe.module.css';

import RecipeForm from '../../components/RecipeForm';

export default function AddRecipe() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add recipe</h1>
      <RecipeForm />
    </div>
  );
}
