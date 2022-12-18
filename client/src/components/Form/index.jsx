import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './form.module.css';

export default function Form({ children, onSubmit, highGap }) {
  return (
    <form className={cx(styles.form, highGap && styles.highGap)} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onSubmit: PropTypes.func.isRequired,
  highGap: PropTypes.bool,
};

Form.defaultProps = {
  highGap: false,
};
