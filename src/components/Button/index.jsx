/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './button.module.css';

export default function Button({
  className, onClick, text, variant, ...rest
}) {
  return (
    <button
      className={`${styles.btn} ${className} ${variant === 'outline' && styles.outline}`}
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
  variant: PropTypes.string,
};

Button.defaultProps = {
  className: '',
  onClick: undefined,
  text: '',
  variant: '',
};
