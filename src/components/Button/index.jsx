/* eslint-disable react/prop-types */
import React from 'react';

import styles from './button.module.css';

export default function Button({ submit, children }) {
  return (
    <button className={styles.btn} type={submit ? 'submit' : 'button'}>
      {children}
    </button>
  );
}
