import React from 'react';

import styles from './addRecipe.module.css';

import PageContainer from '../../components/PageContainer';
import RecipeForm from '../../components/RecipeForm';

export default function AddRecipe() {
  return (
    <PageContainer column>
      <h1 className={styles.title}>Add recipe</h1>
      <RecipeForm />
    </PageContainer>
  );
}
