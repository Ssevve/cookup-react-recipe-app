/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

export default function InstructionList({ instructions }) {
  return (
    <ol className="instructions">
      {instructions.map((instruction) => (
        <li className="instruction" key={instruction._id}>
          <label
            className="instruction__label flex align-items-center"
            htmlFor={instruction._id}
          >
            <input
              className="instruction__checkbox"
              id={instruction._id}
              type="checkbox"
            />
            {instruction.title}
          </label>
          <p className="instruction__text">{instruction.text}</p>
        </li>
      ))}
    </ol>
  );
}

InstructionList.propTypes = {
  instructions: PropTypes.arrayOf({
    instructionIndex: PropTypes.number,
    title: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
};
