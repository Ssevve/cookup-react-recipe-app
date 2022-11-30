/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import cx from 'classnames';
// import PropTypes from 'prop-types';

import styles from './formFields.module.css';

export function Input({
  name, register, validationRules, error, className, ...rest
}) {
  return (
    <input
      {...register(name, validationRules)}
      className={cx(styles.input, className, error && styles.error)}
      name={name}
      aria-invalid={error ? 'true' : 'false'}
      id={name}
      {...rest}
    />
  );
}

export function Select({
  name,
  options,
  label,
  defaultValue = '',
  register,
  validationRules,
  error,
  ...rest
}) {
  return (
    <select
      defaultValue={defaultValue}
      {...register(name, validationRules)}
      aria-invalid={error ? 'true' : 'false'}
      className={cx(styles.input, error && styles.error)}
      id={name}
      {...rest}
    >
      {defaultValue === '' && (
        <option disabled value="">
          -- Select one --
        </option>
      )}
      {options.map((option) => (
        <option key={option} value={option.toLowerCase()}>{option}</option>
      ))}
    </select>
  );
}

export function Textarea({
  name, label, register, validationRules, error, className, ...rest
}) {
  return (
    <textarea
      {...register(name, validationRules)}
      className={cx(styles.input, className, error && styles.error)}
      id={name}
      name={name}
      aria-invalid={error ? 'true' : 'false'}
      {...rest}
    />
  );
}

// Input.propTypes = {
//   register: PropTypes.func.isRequired,
//   name: PropTypes.string.isRequired,
//   validationRules: PropTypes.shape({}).isRequired,
//   error: PropTypes.shape({
//     message: PropTypes.string,
//   }),
//   label: PropTypes.string,
//   title: PropTypes.string,
// };

// Input.defaultProps = {
//   error: {},
//   label: undefined,
//   title: undefined,
// };

// Select.propTypes = {
//   register: PropTypes.func.isRequired,
//   name: PropTypes.string.isRequired,
//   options: PropTypes.arrayOf(PropTypes.string).isRequired,
//   label: PropTypes.string,
//   title: PropTypes.string,
// };

// Select.defaultProps = {
//   label: undefined,
//   title: undefined,
// };

// Textarea.propTypes = {
//   register: PropTypes.func.isRequired,
//   name: PropTypes.string.isRequired,
//   validationRules: PropTypes.shape({}).isRequired,
//   error: PropTypes.shape({
//     message: PropTypes.string,
//   }),
//   label: PropTypes.string.isRequired,
// };

// Textarea.defaultProps = {
//   error: {},
// };
