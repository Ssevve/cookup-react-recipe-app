import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './style.css';

import IngredientList from '../IngredientList';
import InstructionList from '../InstructionList';

export default function Recipe() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const [fetching, setFetching] = useState(true);

  const fetchRecipe = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/recipes/${recipeId}`);
      const recipeData = await res.json();
      setRecipe({ ...recipeData });
      setFetching(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <section className="recipe page">
      <div className="container flex">
        {!fetching && (
          <>
            <section className="recipe__image">
              <img src={recipe.imageUrl} alt={recipe.title} />
            </section>
            <section className="recipe__details flex flex-column">
              <div>
                <h1 className="recipe__title">{recipe?.title}</h1>
                <p className="recipe__description">{recipe.description}</p>
              </div>
              <section className="recipe__ingredients">
                <h2 className="section-heading">Ingredients</h2>
                <IngredientList ingredients={recipe.ingredients} />
              </section>
              <section className="recipe__instructions">
                <h2 className="section-heading">Instructions</h2>
                <InstructionList instructions={recipe.instructions} />
              </section>
            </section>
          </>
        )}
      </div>
    </section>
  );
}
