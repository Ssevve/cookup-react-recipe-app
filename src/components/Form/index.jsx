/* eslint-disable react/prop-types */
import React from 'react';

import styles from './form.module.css';

export default function Form({ children, onSubmit }) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
