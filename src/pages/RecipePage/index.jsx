/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import cx from 'classnames';

import styles from './recipePage.module.css';

import Loader from '../../components/Loader';
import ImageCarousel from '../../components/ImageCarousel';
import { Button } from '../../components/Buttons';
import LikeButton from '../../components/LikeButton';
import ConfirmationButton from '../../components/ConfirmationButton';

import useLoggedInUser from '../../hooks/useLoggedInUser';
import PageContainer from '../../components/PageContainer';

export default function RecipePage() {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInUser, isLoadingLoggedInUser] = useLoggedInUser();

  const fetchRecipe = async () => {
    try {
      const res = await fetch(`http://localhost:8000/recipes/${recipeId}`);
      const recipeData = await res.json();
      setRecipe(recipeData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8000/recipes/${recipeId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  return isLoading || isLoadingLoggedInUser ? (
    <Loader />
  ) : (
    <PageContainer column small>
      <div className={styles.header}>
        <h1 className={styles.title}>{recipe.name}</h1>
        <span className={styles.dishType}>{recipe.dishType}</span>
        <span className={styles.likes}>
          <AiOutlineHeart size={20} />
          {recipe.likes.length}
        </span>
        <p className={styles.author}>
          <span>Recipe by </span>
          <Link to={`/profile/${recipe.createdBy._id}`} className={styles.authorName}>
            <span
              className={styles.authorName}
            >
              {`${recipe.createdBy.firstName} ${recipe.createdBy.lastName}`}
            </span>
          </Link>
        </p>
        {loggedInUser && (
          <div className={styles.actionButtons}>
            {recipe.createdBy._id !== loggedInUser.id && (
              <LikeButton recipe={recipe} setRecipe={setRecipe} user={loggedInUser} />
            )}
            {recipe.createdBy._id === loggedInUser.id && (
              <>
                <Link className={styles.editLink} to={`/recipes/edit/${recipe._id}`}>
                  <Button variant="outline">Edit Recipe</Button>
                </Link>
                <ConfirmationButton
                  text="Delete Recipe"
                  confirmText="Really delete?"
                  callback={handleDelete}
                  className={styles.deleteBtn}
                />
              </>
            )}
          </div>
        )}
      </div>
      <ImageCarousel
        className={styles.imageCarousel}
        images={recipe.images}
        recipeName={recipe.name}
      />
      <div className={cx(styles.section, styles.detailSection)}>
        <div className={styles.details}>
          <div>
            <span className={styles.detailsLabel}>Prep time:</span>
            <span
              className={styles.detail}
            >
              {`${recipe.prepTime.time} ${recipe.prepTime.unit}`}
            </span>
          </div>
          <div>
            <span className={styles.detailsLabel}>Cook time:</span>
            <span
              className={styles.detail}
            >
              {`${recipe.cookTime.time} ${recipe.cookTime.unit}`}
            </span>
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
      </div>
      <section className={cx(styles.section, styles.descriptionSection)}>
        <h2 className={styles.sectionHeading}>Description</h2>
        <p className={styles.description}>{recipe.description}</p>
      </section>
      <section className={cx(styles.section, styles.ingredientSection)}>
        <h2 className={styles.sectionHeading}>Ingredients</h2>
        <ul className={styles.ingredients}>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={`${ingredient + index}`} className={styles.ingredient}>
              {ingredient}
            </li>
          ))}
        </ul>
      </section>
      <section className={cx(styles.section, styles.directionSection)}>
        <h2 className={styles.sectionHeading}>Directions</h2>
        <div className={styles.directions}>
          {recipe.directions.map((direction, index) => (
            <div key={`${direction + index}`}>
              <h3 className={styles.step}>{`Step ${index + 1}`}</h3>
              <p className={styles.direction}>{direction}</p>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
