/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import cx from 'classnames';

import styles from './recipe.module.css';

import ImageCarousel from '../../components/ImageCarousel';

import useLoggedInUser from '../../hooks/useLoggedInUser';

export default function Recipe() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInUser, isLoadingLoggedInUser] = useLoggedInUser();

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await fetch(`http://localhost:8000/recipes/${recipeId}`);
        const recipeData = await res.json();
        setRecipe(recipeData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRecipe();
  }, []);

  return (
    !isLoading
    && !isLoadingLoggedInUser && (
      <div className={styles.container}>
        <div>
          <h1 className={styles.title}>{recipe.name}</h1>
          <span className={styles.dishType}>{recipe.dishType}</span>
        </div>
        <div className={styles.actionButtons}>
          {loggedInUser && recipe.createdBy !== loggedInUser.id && (
            <button type="button" className={cx(styles.actionBtn, styles.likeBtn)}>
              {loggedInUser && recipe?.likes?.includes(loggedInUser.id) ? (
                <>
                  <span>Liked</span>
                  <AiFillHeart size={20} />
                </>
              ) : (
                <>
                  <span>Like</span>
                  <AiOutlineHeart size={20} />
                </>
              )}
            </button>
          )}
          {loggedInUser && recipe.createdBy === loggedInUser.id && (
            <>
              <Link
                to={`/recipes/edit/${recipe._id}`}
                className={cx(styles.actionBtn, styles.editBtn)}
              >
                Edit
              </Link>
              <button type="button" className={cx(styles.actionBtn, styles.deleteBtn)}>
                Delete
              </button>
            </>
          )}
        </div>
        <ImageCarousel images={recipe.images} recipeName={recipe.name} />
        <section className={styles.details}>
          <div>
            <span className={styles.detailsLabel}>Prep time:</span>
            <span className={styles.detail}>{`${recipe.prepTime.time} ${recipe.prepTime.unit}`}</span>
          </div>
          <div>
            <span className={styles.detailsLabel}>Cook time:</span>
            <span className={styles.detail}>{`${recipe.cookTime.time} ${recipe.cookTime.unit}`}</span>
          </div>
          <div>
            <span className={styles.detailsLabel}>Servings:</span>
            <span className={styles.detail}>{recipe.servings}</span>
          </div>
          <div>
            <span className={styles.detailsLabel}>Difficulty:</span>
            <span className={styles.detail}>{recipe.difficulty}</span>
          </div>
        </section>
      </div>
    )
  );
}
