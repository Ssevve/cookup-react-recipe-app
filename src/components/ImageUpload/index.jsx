import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

export default function ImageUpload({ onChange, src }) {
  return (
    <div className="file flex-column align-items-start">
      <label className="file__label" htmlFor="file">
        Choose an image
        <input
          onChange={onChange}
          className="file__input"
          id="file"
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/webp"
        />
      </label>
      <img
        className="file__preview"
        src={
          src || '../../images/placeholder-recipe-image.jpg'
        }
        alt=""
      />
    </div>
  );
}

ImageUpload.propTypes = {
  onChange: PropTypes.func.isRequired,
  src: PropTypes.string,
};

ImageUpload.defaultProps = {
  src: null,
};
