/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';

import './style.css';

import RecipeCard from '../../components/RecipeCard';

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/recipes');
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
    <section className="recipes page">
      <div className="container">
        <ul className="recipes">
          {recipes.length ? (
            recipes.map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} showAuthor />)
          ) : (
            <p>No recipes to show!</p>
          )}
        </ul>
      </div>
    </section>
  );
}
