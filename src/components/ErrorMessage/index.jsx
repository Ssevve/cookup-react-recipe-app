/* eslint-disable react/prop-types */
import React from 'react';

import styles from './errorMessage.module.css';

export default function ErrorMessage({ message }) {
  return (
    <span role="alert" className={styles.errorMessage}>
      {message}
    </span>
  );
}
