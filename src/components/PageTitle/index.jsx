/* eslint-disable react/prop-types */
import React from 'react';
import cx from 'classnames';

import styles from './pageTitle.module.css';

export default function AddRecipe({ children, big }) {
  return (
    <h1 className={cx(styles.title, big && styles.big)}>
      {children}
    </h1>
  );
}
