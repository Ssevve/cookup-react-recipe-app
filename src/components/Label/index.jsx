/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';

import styles from './label.module.css';

export default function Form({ children, htmlFor, ...rest }) {
  return (
    <label className={styles.label} htmlFor={htmlFor} {...rest}>
      {children}
    </label>
  );
}
