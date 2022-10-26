import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

export default function ErrorBox({ errors, error }) {
  return (
    <div className="error-box">
      {errors ? (
        // eslint-disable-next-line react/no-array-index-key
        errors.map((err, index) => <p key={index}>{err}</p>)
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
}

ErrorBox.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
  error: PropTypes.string,
};

ErrorBox.defaultProps = {
  errors: [],
  error: '',
};
