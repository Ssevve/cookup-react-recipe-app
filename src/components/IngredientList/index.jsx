import React from 'react';
import PropTypes from 'prop-types';

export default function IngredientList({ ingredients }) {
  return (
    <ul className="ingredient-list">
      {ingredients.map((ingredient) => (
        // eslint-disable-next-line no-underscore-dangle
        <li key={ingredient._id}>
          <span>
            {ingredient.name}
            -
            {ingredient.amount}
            {ingredient.unitShort}
          </span>
        </li>
      ))}
    </ul>
  );
}

IngredientList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    amount: PropTypes.number,
    unitShort: PropTypes.string,
    unit: PropTypes.string,
  })).isRequired,
};
