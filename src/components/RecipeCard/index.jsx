import './style.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function RecipeCard({ recipe }) {
  return (
    <li>
      <Link to="/recipe" state={{ recipe: recipe }}>
        <section className="card flex-column">
          <section className="card__section">
            <img
              className="card__image"
              src={recipe.image}
              alt={recipe.title}
            />
          </section>
          <section className="card__section">
            <h2 className="card__title">{recipe.title}</h2>
            <p className="card__description">{recipe.description}</p>
          </section>
        </section>
      </Link>
    </li>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
};
