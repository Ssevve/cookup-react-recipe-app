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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  variant: PropTypes.string,
  noPaddingBlock: PropTypes.bool,
  noFlex: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  variant: '',
  noPaddingBlock: false,
  noFlex: false,
  onClick: undefined,
};

SubmitButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
