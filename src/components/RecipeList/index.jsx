/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import cx from 'classnames';

import styles from './recipeList.module.css';

import RecipeCard from '../RecipeCard';

export default function RecipeList({
  recipes, user, desktopAlignStart, setRecipes,
}) {
  return (
    <ul className={cx(styles.recipes, desktopAlignStart && styles.desktopAlignStart)}>
      {recipes.map((recipe) => (
        // eslint-disable-next-line no-underscore-dangle
        <li key={recipe._id}>
          <RecipeCard setRecipes={setRecipes} recipes={recipes} recipe={recipe} user={user} />
        </li>
      ))}
    </ul>
  );
}
