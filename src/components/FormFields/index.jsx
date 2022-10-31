/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

export function Input({
  register, name, validationRules, error, label, ...rest
}) {
  return (
    <div className="form-group">
      <label className="form__label" htmlFor={name}>
        {label}
        <input
          {...register(name, validationRules)}
          className="form__input"
          id={name}
          name={name}
          aria-invalid={error ? 'true' : 'false'}
          {...rest}
        />
      </label>
      {error && (
        <span role="alert" className="form-error-message">
          {error.message}
        </span>
      )}
    </div>
  );
}

export function Select({
  register, options, name, label, ...rest
}) {
  return (
    <div className="form-group">
      <label className="form__label" htmlFor={name}>
        {label}
        <select {...register(name)} className="select" {...rest}>
          {options.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export function Textarea({
  register, validationRules, name, label, error, ...rest
}) {
  return (
    <div className="form-group">
      <label className="form__label" htmlFor={name}>
        {label}
        <textarea
          {...register(name, validationRules)}
          aria-invalid={error ? 'true' : 'false'}
          className="form__textarea"
          id={name}
          name={name}
          {...rest}
        />
      </label>
      {error && (
        <span role="alert" className="form-error-message">
          {error.message}
        </span>
      )}
    </div>
  );
}

Input.propTypes = {
  register: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  validationRules: PropTypes.shape({}).isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }).isRequired,
  label: PropTypes.string.isRequired,
};

Select.propTypes = {
  register: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.shape([]).isRequired,
  label: PropTypes.string.isRequired,
};

Textarea.propTypes = {
  register: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  validationRules: PropTypes.shape({}).isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }).isRequired,
  label: PropTypes.string.isRequired,
};
