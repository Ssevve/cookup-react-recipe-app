import './style.css';
import PropTypes from 'prop-types';

export default function RecipeCard({ recipe }) {
  return (
    <li>
      <section className="card flex flex-column">
        <section className="card__section">
          <img
            className="card__photo"
            src={recipe.images[0]}
            alt={recipe.title}
          />
        </section>
        <section className="card__section card__title">
          <h2>{recipe.title}</h2>
          <p className="card__description">{recipe.description}</p>
        </section>
      </section>
    </li>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
}
