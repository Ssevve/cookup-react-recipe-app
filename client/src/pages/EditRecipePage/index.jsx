import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../../components/Loader';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import RecipeForm from '../../components/RecipeForm';

export default function EditRecipePage() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const getRecipe = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/recipes/${recipeId}`);
      const data = await res.json();
      setRecipe(data);
      setTimeout(() => setLoading(false), 500);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecipe();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <PageContainer column>
      <PageTitle>Edit recipe</PageTitle>
      {!loading && <RecipeForm recipe={recipe} />}
    </PageContainer>
  );
}
