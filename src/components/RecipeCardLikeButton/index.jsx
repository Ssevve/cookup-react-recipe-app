/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

import styles from './recipeCardLikeButton.module.css';

export default function RecipeCardLikeButton({
  setRecipes, recipes, recipe, user,
}) {
  const handleClick = async (e, recipeId) => {
    e.preventDefault();

    if (!user) return;
    if (user.id === recipe.createdBy) return;

    const newRecipes = [...recipes];
    if (recipe.likes.includes(user.id)) {
      const idIndex = recipe.likes.findIndex((id) => id === user.id);
      recipe.likes.splice(idIndex, 1);
    } else {
      recipe.likes.push(user.id);
    }

    const recipeIndex = recipes.findIndex((rec) => rec._id === recipeId);
    newRecipes.splice(recipeIndex, 1, recipe);
    setRecipes(newRecipes);

    try {
      await fetch(`http://localhost:8000/recipes/like/${recipeId}`, {
        method: 'PUT',
        credentials: 'include',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    user && (user.id !== recipe.createdBy)
      && (
      <button
        onClick={(e) => handleClick(e, recipe._id)}
        className={styles.likeButton}
        type="button"
      >
        {user && recipe.likes.includes(user.id) ? <AiFillHeart /> : <AiOutlineHeart />}
      </button>
      )
  );
}
