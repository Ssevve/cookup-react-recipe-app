// Loader from https://github.com/vineethtrv/css-loader

import React from 'react';

import styles from './loader.module.css';

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <span className={styles.loader} />
      <span>Loading...</span>
    </div>
  );
}
