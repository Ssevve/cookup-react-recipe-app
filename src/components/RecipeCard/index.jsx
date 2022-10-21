/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.css';

export default function RecipeCard({ recipe }) {
  return (
    <li>
      <Link to={`/recipe/${recipe._id}`}>
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
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};
