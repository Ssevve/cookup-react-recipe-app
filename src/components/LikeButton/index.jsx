/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import cx from 'classnames';

import styles from './likeButton.module.css';

export default function LikeButton({
  setRecipes, recipes, recipe, setRecipe, user, round, className,
}) {
  const [authorId] = useState(recipe.createdBy._id || recipe.createdBy);

  const handleClick = async (e) => {
    e.preventDefault();

    if (!user) return;
    if (user.id === authorId) return;

    if (recipe.likes.includes(user.id)) {
      const idIndex = recipe.likes.findIndex((id) => id === user.id);
      recipe.likes.splice(idIndex, 1);
    } else {
      recipe.likes.push(user.id);
    }

    if (recipes && setRecipes) {
      const newRecipes = [...recipes];
      const recipeIndex = recipes.findIndex((rec) => rec._id === recipe._id);
      newRecipes.splice(recipeIndex, 1, recipe);
      setRecipes(newRecipes);
    } else {
      setRecipe({ ...recipe });
    }

    try {
      await fetch(`http://localhost:8000/recipes/like/${recipe._id}`, {
        method: 'PUT',
        credentials: 'include',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    user && (user.id !== authorId)
      && (
      <button
        onClick={handleClick}
        className={cx(styles.likeButton, round && styles.round, className)}
        type="button"
      >
        {user && recipe.likes.includes(user.id) && !round && 'Liked'}
        {user && !recipe.likes.includes(user.id) && !round && 'Like'}
        {user && recipe.likes.includes(user.id) ? <AiFillHeart size={!round ? 20 : ''} /> : <AiOutlineHeart size={!round ? 20 : ''} />}
      </button>
      )
  );
}

LikeButton.propTypes = {
  setRecipes: PropTypes.func,
  recipes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  recipe: PropTypes.shape({
    createdBy: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string).isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  setRecipe: PropTypes.func,
  user: PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    PropTypes.oneOf([null]),
  ]),
  round: PropTypes.bool,
  className: PropTypes.string,
};

LikeButton.defaultProps = {
  setRecipes: undefined,
  setRecipe: undefined,
  user: null,
  round: false,
  className: '',
};
