import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import './style.css';

import RecipeCard from '../RecipeCard';

export default function Dashboard() {
  const user = useOutletContext();
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/recipes/user/${user.id}`, {
        credentials: 'include',
      });
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
    <section className="container page">
      <h1 className="subpage-title">Dashboard</h1>
      <div className="dashboard">
        <ul className="recipes">
          {recipes.length ? (
            recipes.map((recipe) => (
              // eslint-disable-next-line no-underscore-dangle
              <RecipeCard key={recipe._id} setRecipes={setRecipes} recipe={recipe} showOptions />
            ))
          ) : (
            <p>You have not created any recipes yet...</p>
          )}
        </ul>
      </div>
    </section>
  );
}
