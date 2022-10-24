/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
// import PropTypes from 'prop-types';

import './style.css';

export default function Dashboard() {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = (e) => {
    e.preventDefault();
    setShowOptions((prev) => !prev);
    if (e.target.ariaExpanded) e.target.ariaExpanded = 'false';
    else e.target.ariaExpanded = 'true';
  };

  return (
    <section onMouseLeave={(e) => toggleOptions(e)} className="card-options">
      <button
        onClick={(e) => toggleOptions(e)}
        type="button"
        className="btn dropdown-toggle"
      >
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
            <button className="btn dropdown-item" type="button">
              Delete
            </button>
          </li>
        </ul>
      )}
    </section>
  );
}

// Dashboard.propTypes = {
//   recipeId: PropTypes.string.isRequired,
// };
