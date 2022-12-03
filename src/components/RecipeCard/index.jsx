/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';

import styles from './recipeCard.module.css';

import LikeButton from '../LikeButton';

export default function RecipeCard({
  setRecipes, recipes, recipe, user,
}) {
  return (
    <Link className={styles.recipeLink} to={`/recipes/${recipe._id}`}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <img
            className={styles.image}
            src={recipe.images[0]?.url || '/images/placeholder-recipe-image.jpg'}
            alt={recipe.name}
          />
          <LikeButton
            className={styles.likeBtn}
            setRecipes={setRecipes}
            recipes={recipes}
            recipe={recipe}
            user={user}
            round
          />
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
  );
}

RecipeCard.propTypes = {
  setRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  recipe: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string).isRequired,
    dishType: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  user: PropTypes.shape({}),
};

RecipeCard.defaultProps = {
  user: null,
};
