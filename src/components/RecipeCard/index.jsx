/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.css';

export default function RecipeCard({ recipe, showOptions, showAuthor }) {
  return (
    <li>
      <section className="card flex-column">
        <Link to={`/recipe/${recipe._id}`}>
          <section className="card__section">
            <img className="card__image" src={recipe.image} alt={recipe.title} />
          </section>
          <section className="card__section">
            <h2 className="card__title">{recipe.title}</h2>
            <p className="card__description">{recipe.description}</p>
          </section>
        </Link>
        {showAuthor && (
          <div className="card__author">
            <img
              className="author-avatar"
              src={recipe.createdBy.avatar}
              alt={`${recipe.createdBy.firstName} ${recipe.createdBy.lastName}`}
            />
            {`${recipe.createdBy.firstName} ${recipe.createdBy.lastName}`}
          </div>
        )}
        {showOptions && (
          <section className="card__options">
            <button className="btn" type="button">
              Edit recipe
            </button>
            <button className="btn btn--delete" type="button">
              Delete recipe
            </button>
          </section>
        )}
      </section>
    </li>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    createdBy: PropTypes.shape({
      _id: PropTypes.string,
      avatar: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
  }).isRequired,
  showOptions: PropTypes.bool,
  showAuthor: PropTypes.bool,
};

RecipeCard.defaultProps = {
  showOptions: false,
  showAuthor: false,
};
