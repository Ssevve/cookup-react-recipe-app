/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';

import styles from './browseRecipesPage.module.css';

import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import RecipeCard from '../../components/RecipeCard';

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
        <ul className={styles.recipes}>
          {recipes.map((recipe) => (
            <li key={recipe._id}>
              <RecipeCard setRecipes={setRecipes} recipes={recipes} recipe={recipe} user={user} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No recipes to show!</p>
      )}
    </PageContainer>
  );
}
