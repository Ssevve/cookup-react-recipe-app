/* eslint-disable react/prop-types */
import React from 'react';

import styles from './formInputErrorMessage.module.css';

export default function FormInputErrorMessage({ message }) {
  return (
    <span role="alert" className={styles.errorMessage}>
      {message}
    </span>
  );
}
