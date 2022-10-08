import './style.css';
import { useState, useEffect } from 'react';

import RecipeCard from '../RecipeCard';

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  async function fetchRecipes() {
    try {
      const res = await fetch('http://localhost:8000/api/recipes');
      const recipesData = await res.json();
      setRecipes([...recipesData]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="recipes">
      <div className="container">
        <ul className="recipes">
          {recipes.length ? (
            recipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))
          ) : (
            <p>No recipes to show! :(</p>
          )}
        </ul>
      </div>
    </section>
  );
}
