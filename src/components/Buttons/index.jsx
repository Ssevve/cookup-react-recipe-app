/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
import React from 'react';
import cx from 'classnames';

import styles from './buttons.module.css';

export function Button({
  children, variant, noPaddingBlock, onClick,
}) {
  return (
    <button
      className={cx(
        styles.btn,
        noPaddingBlock && styles.noPaddingBlock,
        variant === 'delete' && styles.delete,
        variant === 'outline' && styles.outline,
      )}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export function SubmitButton({ children }) {
  return (
    <button className={cx(styles.btn, styles.submit)} type="submit">
      {children}
    </button>
  );
}
