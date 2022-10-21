import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.css';

export default function RecipeCard({ recipe }) {
  return (
    <li>
      <Link to="/recipe" state={{ recipe }}>
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
  recipe: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    ingredients: PropTypes.arrayOf({
      _id: PropTypes.string,
      name: PropTypes.string,
      unit: PropTypes.string,
      unitShort: PropTypes.string,
      amount: PropTypes.number,
    }),
    instructions: PropTypes.arrayOf({
      _id: PropTypes.string,
      instructionIndex: PropTypes.number,
      title: PropTypes.string,
      text: PropTypes.string,
    }),
    image: PropTypes.string,
  }).isRequired,
};
