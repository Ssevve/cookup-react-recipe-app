/* eslint-disable react/prop-types */
import React from 'react';

import styles from './errorBox.module.css';

export default function ErrorBox({ message }) {
  return (
    <div className={styles.errorBox}>
      <span>{message}</span>
      <span>Please try again.</span>
    </div>
  );
}
