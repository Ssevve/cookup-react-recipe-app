/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './label.module.css';

export default function Label({
  children, htmlFor, text, ...rest
}) {
  return (
    <label className={styles.label} htmlFor={htmlFor} {...rest}>
      <span className={styles.text}>{text}</span>
      {children}
    </label>
  );
}

Label.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  htmlFor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
