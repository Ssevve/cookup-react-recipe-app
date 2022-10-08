import PropTypes from 'prop-types';

export default function IngredientList({ ingredients }) {
  return (
    <ul className="ingredient-list">
      {ingredients.map((ingredient) => {
        return (
          <li>
            <span>{ingredient.name}</span>
            <span>-</span>
            <span>
              {ingredient.amount} {ingredient.unitShort}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

IngredientList.propTypes = {
  ingredients: PropTypes.array.isRequired,
}