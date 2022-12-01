/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
import React from 'react';
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

export function Radio({
  register, name, value, label,
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
