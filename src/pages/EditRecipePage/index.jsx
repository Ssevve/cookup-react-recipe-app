import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import RecipeForm from '../../components/RecipeForm';

export default function EditRecipePage() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const getRecipe = async () => {
    try {
      const res = await fetch(`http://localhost:8000/recipes/${recipeId}`);
      const data = await res.json();
      setRecipe(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecipe();
  }, []);
  return (
    <PageContainer column>
      <PageTitle>Edit recipe</PageTitle>
      {!loading && <RecipeForm recipe={recipe} />}
    </PageContainer>
  );
}
