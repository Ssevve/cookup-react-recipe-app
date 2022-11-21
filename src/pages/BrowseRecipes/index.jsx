/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

import styles from './browseRecipes.module.css';

export default function BrowseRecipes({ user }) {
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

  const handleLikeClick = async (e, recipeId) => {
    e.preventDefault();

    if (!user) return;

    const targetRecipe = recipes.find((recipe) => recipe._id === recipeId);
    if (user.id === targetRecipe.createdBy) return;

    try {
      const res = await fetch(`http://localhost:8000/recipes/like/${recipeId}`, {
        method: 'PUT',
        credentials: 'include',
      });

      if (res.ok) {
        fetchRecipes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Browse recipes</h1>
      {recipes.length ? (
        <ul className={styles.recipes}>
          {recipes.map((recipe) => (
            <li key={recipe._id}>
              <Link className={styles.recipeLink} to={`/recipes/${recipe._id}`}>
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <img
                      className={styles.image}
                      src={recipe.images[0]?.url || 'public/images/placeholder-recipe-image.jpg'}
                      alt={recipe.name}
                    />
                    <button
                      onClick={(e) => handleLikeClick(e, recipe._id)}
                      className={styles.likeButton}
                      type="button"
                    >
                      {user && recipe?.likes?.includes(user.id) ? (
                        <AiFillHeart />
                      ) : (
                        <AiOutlineHeart />
                      )}
                    </button>
                    <span className={styles.likes}>
                      <AiOutlineHeart />
                      {recipe.likes.length}
                    </span>
                  </div>
                  <div className={styles.details}>
                    <span className={styles.dishType}>{recipe.dishType}</span>
                    <h2 className={styles.name}>{recipe.name}</h2>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recipes to show!</p>
      )}
    </div>
  );
}