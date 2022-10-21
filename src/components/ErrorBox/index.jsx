import PropTypes from 'prop-types';

import './style.css';

export default function ErrorBox({ errors }) {
  return (
    <div className="error-box">
      {Array.isArray(errors) ? (
        errors.map((error) => <p>{error}</p>)
      ) : (
        <p>{errors}</p>
      )}
    </div>
  );
}

ErrorBox.propTypes = {
  errors: PropTypes.array.isRequired,
};
