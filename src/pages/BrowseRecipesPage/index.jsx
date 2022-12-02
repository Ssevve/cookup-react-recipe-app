/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';

import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import RecipeList from '../../components/RecipeList';

export default function BrowseRecipesPage({ user }) {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const res = await fetch('http://localhost:8000/recipes');
      const recipesData = await res.json();
      setRecipes([...recipesData]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <PageContainer column alignStretch>
      <PageTitle>Browse recipes</PageTitle>
      {recipes.length ? (
        <RecipeList desktopAlignStart recipes={recipes} setRecipes={setRecipes} user={user} />
      ) : (
        <p>No recipes to show!</p>
      )}
    </PageContainer>
  );
}
