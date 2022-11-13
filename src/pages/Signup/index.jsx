/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import cx from 'classnames';
import { useForm } from 'react-hook-form';

import styles from './signup.module.css';

export default function Signup() {
  const [responseErrors, setResponseErrors] = useState({});
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  async function handleFormSubmit(data) {
    console.log(data);

    const url = 'http://localhost:8000/api/auth/signup';
    const requestOptions = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const res = await fetch(url, requestOptions);
      const resData = await res.json();

      if (res.status === 400 || res.status === 409) setResponseErrors(resData.message);
      else if (res.status === 404) setResponseErrors({ notFound: 'Something went wrong.' });
      else if (res.status === 500) setResponseErrors({ serverError: 'Server error.' });
      else navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.container}>
      <section className={styles.formSection}>
        <h1 className={styles.title}>Sign up</h1>
        <p className={styles.existingUser}>
          Existing user?
          <Link className={styles.link} to="/login">
            Log in
          </Link>
        </p>
        {(responseErrors.notFound || responseErrors.serverError) && (
          <div className={styles.errorBox}>
            <span role="alert">{responseErrors.notFound || responseErrors.serverError}</span>
            <span role="alert">Please try again.</span>
          </div>
        )}
        <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <div className="form-group">
            <label className={styles.label} htmlFor="first-name">
              First name
              <input
                {...register('firstName', {
                  required: { value: true, message: 'First name is required' },
                })}
                className={cx(
                  styles.input,
                  errors.firstName && styles.error,
                )}
                id="first-name"
                type="text"
                name="firstName"
              />
            </label>
            <span role="alert" className={styles.errorMessage}>
              {errors?.firstName?.message}
            </span>
          </div>
          <div className="form-group">
            <label className={styles.label} htmlFor="last-name">
              Last name
              <input
                {...register('lastName', {
                  required: { value: true, message: 'Last name is required' },
                })}
                className={cx(
                  styles.input,
                  errors.lastName && styles.error,
                )}
                id="last-name"
                type="text"
                name="lastName"
              />
            </label>
            <span role="alert" className={styles.errorMessage}>
              {errors?.lastName?.message}
            </span>
          </div>
          <div className="form-group">
            <label className={styles.label} htmlFor="email">
              Email
              <input
                {...register('email', {
                  required: { value: true, message: 'Email is required' },
                  pattern: {
                    value:
                      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                    message: 'Incorrect email format',
                  },
                })}
                className={cx(
                  styles.input,
                  (errors.email || responseErrors.email) && styles.error,
                )}
                id="email"
                type="email"
                name="email"
              />
            </label>
            <span role="alert" className={styles.errorMessage}>
              {errors?.email?.message || responseErrors?.email}
            </span>
          </div>
          <div className="form-group">
            <label className={styles.label} htmlFor="password">
              Password
              <input
                {...register('password', {
                  required: { value: true, message: 'Password is required' },
                  minLength: {
                    value: 8,
                    message: 'Min. 8 characters required',
                  },
                })}
                className={cx(
                  styles.input,
                  errors.password && styles.error,
                )}
                id="password"
                type="password"
                name="password"
              />
            </label>
            <span role="alert" className={styles.errorMessage}>
              {errors?.password?.message}
            </span>
          </div>
          <div className="form-group">
            <label className={styles.label} htmlFor="confirm-password">
              Confirm Password
              <input
                {...register('confirmPassword', {
                  required: { value: true, message: 'You need to confirm the password' },
                  // eslint-disable-next-line consistent-return
                  validate: (value) => {
                    if (watch('password') !== value) {
                      return 'Passwords do not match';
                    }
                  },
                })}
                className={cx(
                  styles.input,
                  errors.confirmPassword && styles.error,
                )}
                id="confirm-password"
                type="password"
                name="confirmPassword"
              />
            </label>
            <span role="alert" className={styles.errorMessage}>
              {errors?.confirmPassword?.message}
            </span>
          </div>
          <button className={styles.btn} type="submit">
            Signup
          </button>
        </form>
      </section>
      <section className={styles.signupImage} />
    </div>
  );
}
