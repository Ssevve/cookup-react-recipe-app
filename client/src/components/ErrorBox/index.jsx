/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './errorBox.module.css';

export default function ErrorBox({ message }) {
  return (
    <div className={styles.errorBox}>
      {typeof message === 'object' ? (
        Object.values(message).map((msg) => <span key={msg}>{msg}</span>)
      ) : (
        <span>{message}</span>
      )}
      <span>Please try again.</span>
    </div>
  );
}

ErrorBox.propTypes = {
  message: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]).isRequired,
};
