/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './button.module.css';

export default function Button({
  className, onClick, text, variant, children, lowPadding, ...rest
}) {
  return (
    <button
      className={`${styles.btn} ${className} ${variant === 'outline' && styles.outline}`}
      style={{ padding: lowPadding ? '0.75rem 1rem' : '1rem 1.5rem;' }}
      onClick={onClick}
      type="button"
      {...rest}
    >
      {children}
      {text}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.node,
  lowPadding: PropTypes.bool,
};

Button.defaultProps = {
  className: '',
  onClick: undefined,
  text: '',
  variant: '',
  children: '',
  lowPadding: false,
};
