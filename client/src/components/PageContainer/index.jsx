import React from 'react';
import PropTypes from 'prop-types';
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

PageContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  column: PropTypes.bool,
  small: PropTypes.bool,
  alignStretch: PropTypes.bool,
};

PageContainer.defaultProps = {
  column: false,
  small: false,
  alignStretch: false,
};
