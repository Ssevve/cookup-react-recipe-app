/* eslint-disable react/prop-types */
import React from 'react';
import cx from 'classnames';

import styles from './pageContainer.module.css';

export default function PageContainer({
  children, column, small, alignStretch,
}) {
  return (
    <div
      className={cx(
        styles.container,
        column && styles.column,
        small && styles.small,
        alignStretch && styles.alignStretch,
      )}
    >
      {children}
    </div>
  );
}
