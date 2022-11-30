/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// /* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import cx from 'classnames';
// import PropTypes from 'prop-types';

import styles from './formFields.module.css';

import FormInputErrorMessage from '../FormInputErrorMessage';

export function Input({
  name, label, register, validationRules, errors, ...rest
}) {
  return (
    <div>
      <label className={styles.label} htmlFor={name}>
        {label}
        <input
          {...register(name, validationRules)}
          className={cx(styles.input, errors?.[name] && styles.error)}
          id={name}
          name={name}
          aria-invalid={errors?.[name] ? 'true' : 'false'}
          {...rest}
        />
      </label>
      <FormInputErrorMessage message={errors?.[name]?.message} />
    </div>
  );
}

export function Select({
  name,
  options,
  label,
  defaultValue = '',
  register,
  validationRules,
  errors,
  ...rest
}) {
  return (
    <div>
      <label className={styles.label} htmlFor={name}>
        {label}
        <select
          defaultValue={defaultValue}
          {...register(name, validationRules)}
          aria-invalid={errors?.[name] ? 'true' : 'false'}
          className={cx(styles.input, errors?.[name] && styles.error)}
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
      </label>
      <FormInputErrorMessage message={errors?.[name]?.message} />
    </div>
  );
}

export function Textarea({
  name, label, register, validationRules, errors, ...rest
}) {
  return (
    <div>
      <label className={styles.label} htmlFor={name}>
        {label}
        <textarea
          {...register(name, validationRules)}
          className={cx(styles.input, errors?.[name] && styles.error)}
          id={name}
          name={name}
          aria-invalid={errors?.[name] ? 'true' : 'false'}
          {...rest}
        />
      </label>
      <FormInputErrorMessage message={errors?.[name]?.message} />
    </div>
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
