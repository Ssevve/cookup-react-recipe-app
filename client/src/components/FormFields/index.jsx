/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

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
  name, register, validationRules, error, className, ...rest
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

export function Radio({
  register, label, name, value,
}) {
  return (
    <div className={styles.customRadio}>
      <input
        {...register(name)}
        className={styles.radioInput}
        type="radio"
        id={value}
        value={value}
      />
      <label className={styles.radioLabel} htmlFor={value}>
        <span className={styles.inputCircle} />
        {label}
      </label>
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  validationRules: PropTypes.shape({}),
  error: PropTypes.oneOfType([
    PropTypes.shape({}).isRequired,
    PropTypes.oneOf([undefined]).isRequired,
  ]),
  className: PropTypes.string,
};

Input.defaultProps = {
  validationRules: {},
  error: undefined,
  className: '',
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultValue: PropTypes.string,
  register: PropTypes.func.isRequired,
  validationRules: PropTypes.shape({}),
  error: PropTypes.oneOfType([
    PropTypes.shape({}).isRequired,
    PropTypes.oneOf([undefined]).isRequired,
  ]),
};

Select.defaultProps = {
  validationRules: {},
  defaultValue: '',
  error: undefined,
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  validationRules: PropTypes.shape({}),
  error: PropTypes.oneOfType([
    PropTypes.shape({}).isRequired,
    PropTypes.oneOf([undefined]).isRequired,
  ]),
  className: PropTypes.string,
};

Textarea.defaultProps = {
  validationRules: {},
  error: undefined,
  className: '',
};

Radio.propTypes = {
  register: PropTypes.func,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
};

Radio.defaultProps = {
  register: undefined,
  name: '',
};
