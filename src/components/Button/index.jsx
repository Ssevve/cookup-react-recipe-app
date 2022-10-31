/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

export default function Button({
  className, onClick, text, ...rest
}) {
  return (
    <button
      className={`btn ${className}`}
      onClick={onClick}
      type="button"
      {...rest}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
};

Button.defaultProps = {
  className: '',
  onClick: undefined,
  text: '',
};
