/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import PropTypes from 'prop-types';

import './style.css';

export default function CardOptions({ recipeId, setRecipes }) {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = (e) => {
    e.preventDefault();
    setShowOptions((prev) => !prev);
  };

  const deleteRecipe = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8000/api/recipes/${recipeId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        setRecipes((recipes) => recipes.filter((recipe) => recipe._id !== recipeId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section onMouseLeave={() => setShowOptions(false)} className="card-options">
      <button onClick={toggleOptions} type="button" className="btn dropdown-toggle">
        <BsThreeDots />
      </button>
      {showOptions && (
        <ul className="dropdown-menu">
          <li>
            <button className="btn dropdown-item" type="button">
              Edit
            </button>
          </li>
          <li>
            <button onClick={deleteRecipe} className="btn dropdown-item" type="button">
              Delete
            </button>
          </li>
        </ul>
      )}
    </section>
  );
}

CardOptions.propTypes = {
  recipeId: PropTypes.string.isRequired,
  setRecipes: PropTypes.func.isRequired,
};
