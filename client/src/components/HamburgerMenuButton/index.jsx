import React from 'react';
import PropTypes from 'prop-types';
import { GoThreeBars } from 'react-icons/go';

import styles from './hamburgerMenuButton.module.css';

export default function HamburgerMenuButton({ onClick }) {
  return (
    <button
      className={styles.hamburger}
      type="button"
      onClick={onClick}
    >
      <GoThreeBars />
    </button>

  );
}

HamburgerMenuButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
