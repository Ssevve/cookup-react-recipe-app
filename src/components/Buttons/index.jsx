import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './buttons.module.css';

export function Button({
  children, variant, noPaddingBlock, noFlex, onClick,
}) {
  return (
    <button
      className={cx(
        styles.btn,
        noPaddingBlock && styles.noPaddingBlock,
        noFlex && styles.noFlex,
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

Button.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  variant: PropTypes.string,
  noPaddingBlock: PropTypes.string,
  noFlex: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  variant: '',
  noPaddingBlock: '',
  noFlex: '',
  onClick: undefined,
};

SubmitButton.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
