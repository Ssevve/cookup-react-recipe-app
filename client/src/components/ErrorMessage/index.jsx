import React from 'react';
import PropTypes from 'prop-types';

import styles from './errorMessage.module.css';

export default function ErrorMessage({ message }) {
  return (
    <span role="alert" className={styles.errorMessage}>
      {message}
    </span>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

ErrorMessage.defaultProps = {
  message: '',
};
