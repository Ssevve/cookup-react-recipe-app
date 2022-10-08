import PropTypes from 'prop-types';

export default function IngredientList({ ingredients }) {
  return (
    <ul className="ingredient-list">
      {ingredients.map((ingredient) => {
        return (
          <li key={ingredient._id}>
            <span>{ingredient.name} - {ingredient.amount} {ingredient.unitShort}</span>
          </li>
        );
      })}
    </ul>
  );
}

IngredientList.propTypes = {
  ingredients: PropTypes.array.isRequired,
};
