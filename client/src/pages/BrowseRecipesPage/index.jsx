import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import RecipeList from '../../components/RecipeList';

import Loader from '../../components/Loader';

export default function BrowseRecipesPage({ user }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/recipes`);
      const recipesData = await res.json();
      setRecipes([...recipesData]);
      setTimeout(() => setLoading(false), 500);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return loading ? (
    <Loader />
  ) : (
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

BrowseRecipesPage.propTypes = {
  user: PropTypes.shape({}),
};

BrowseRecipesPage.defaultProps = {
  user: null,
};
