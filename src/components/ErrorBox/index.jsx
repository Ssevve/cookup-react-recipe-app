import PropTypes from 'prop-types';

import './style.css';

export default function ErrorBox({ errors, error }) {
  return (
    <div className="error-box">
      {errors ? (
        errors.map((err) => <p>{err}</p>)
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
}

ErrorBox.propTypes = {
  errors: PropTypes.array,
  error: PropTypes.string,
};
