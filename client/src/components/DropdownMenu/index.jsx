import React from 'react';
import PropTypes from 'prop-types';

import styles from './dropdownMenu.module.css';

export default function DropdownMenu({ children }) {
  return (
    <ul className={styles.profileDropdownMenu}>
      {React.Children.map(children, (child) => (
        <li>
          {React.cloneElement(child, { className: styles.dropdownLink })}
        </li>
      ))}
    </ul>
  );
}

DropdownMenu.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
