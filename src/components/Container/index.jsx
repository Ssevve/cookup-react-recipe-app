import React from 'react';
import PropTypes from 'prop-types';

import styles from './container.module.css';

export default function Container({ className, children }) {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
}

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element.isRequired,
};

Container.defaultProps = {
  className: '',
};
