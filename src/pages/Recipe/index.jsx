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
        <div className={styles.header}>
          <h1 className={styles.title}>{recipe.name}</h1>
          <span className={styles.dishType}>{recipe.dishType}</span>
          <span className={styles.likes}>
            <AiOutlineHeart size={20} />
            {recipe.likes.length}
          </span>
        </div>
        {loggedInUser && (
          <div className={styles.actionButtons}>
            {recipe.createdBy !== loggedInUser.id && (
              <button type="button" className={cx(styles.actionBtn, styles.likeBtn)}>
                {recipe.likes.includes(loggedInUser.id) ? (
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
            {recipe.createdBy === loggedInUser.id && (
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
        )}
        <ImageCarousel images={recipe.images} recipeName={recipe.name} />
        <section className={cx(styles.section, styles.detailSection)}>
          <h2 className={styles.sectionHeading}>Details</h2>
          <div className={styles.details}>
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
          </div>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Description</h2>
          <p>{recipe.description}</p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Ingredients</h2>
          <ul className={styles.ingredients}>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient} className={styles.ingredient}>{ingredient}</li>
            ))}
          </ul>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Directions</h2>
          <div className={styles.directions}>
            {recipe.directions.map((direction, index) => (
              <div key={direction}>
                <h3 className={styles.step}>{`Step ${index + 1}`}</h3>
                <p className={styles.direction}>{direction}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  );
}
