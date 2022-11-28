import React from 'react';

import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import RecipeForm from '../../components/RecipeForm';

export default function AddRecipe() {
  return (
    <PageContainer column>
      <PageTitle>Add recipe</PageTitle>
      <RecipeForm />
    </PageContainer>
  );
}
