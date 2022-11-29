/* eslint-disable react/prop-types */
import React from 'react';
import cx from 'classnames';

import styles from './form.module.css';

export default function Form({ children, onSubmit, highGap }) {
  return (
    <form className={cx(styles.form, highGap && styles.highGap)} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
