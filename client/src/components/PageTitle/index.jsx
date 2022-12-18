import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './pageTitle.module.css';

export default function PageTitle({ children, big }) {
  return (
    <h1 className={cx(styles.title, big && styles.big)}>
      {children}
    </h1>
  );
}

PageTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  big: PropTypes.bool,
};

PageTitle.defaultProps = {
  big: false,
};
