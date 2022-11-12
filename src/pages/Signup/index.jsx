/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import styles from './signup.module.css';

export default function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  async function handleFormSubmit(data) {
    console.log(data);

    // const url = 'http://localhost:8000/api/auth/signup';
    // const requestOptions = {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    //   body: JSON.stringify(userInput),
    // };

    // try {
    //   const res = await fetch(url, requestOptions);
    //   const data = await res.json();

    //   if (!res.ok) {
    //     setFormErrors([data.message]);
    //   } else {
    //     navigate('/login');
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }

  return (
    <div className={styles.container}>
      <section className={styles.formSection}>
        <h1 className={styles.title}>Signup</h1>
        <p className={styles.existingUser}>
          Existing user?
          <Link className={styles.link} to="/login">
            Log in
          </Link>
        </p>
        {/* {(errors.email || errors.password) && (
          <div className={styles.errorBox}>
            <span role="alert">Incorrect email or password.</span>
            <span role="alert">Please try again.</span>
          </div>
        )} */}
        <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <div className="form-group">
            <label className={styles.label} htmlFor="first-name">
              First name
              <input
                {...register('firstName', {
                  required: { value: true, message: 'First name is required' },
                })}
                className={styles.input}
                id="first-name"
                type="text"
                name="firstName"
              />
            </label>
            <span role="alert" className={styles.errorMessage}>{errors?.firstName?.message}</span>
          </div>
          <div className="form-group">
            <label className={styles.label} htmlFor="last-name">
              Last name
              <input
                {...register('lastName', {
                  required: { value: true, message: 'Last name is required' },
                })}
                className={styles.input}
                id="last-name"
                type="text"
                name="lastName"
              />
            </label>
            <span role="alert" className={styles.errorMessage}>{errors?.lastName?.message}</span>
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
                className={styles.input}
                id="email"
                type="email"
                name="email"
              />
            </label>
            <span role="alert" className={styles.errorMessage}>{errors?.email?.message}</span>
          </div>
          <div className="form-group">
            <label className={styles.label} htmlFor="password">
              Password
              <input
                {...register('password', {
                  required: { value: true, message: 'Password is required' },
                  minLength: {
                    value: 8,
                    message: 'Password needs to be at least 8 characters long',
                  },
                })}
                className={styles.input}
                id="password"
                type="password"
                name="password"
              />
            </label>
            <span role="alert" className={styles.errorMessage}>{errors?.password?.message}</span>
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
                className={styles.input}
                id="confirm-password"
                type="password"
                name="confirmPassword"
              />
            </label>
            <span role="alert" className={styles.errorMessage}>{errors?.confirmPassword?.message}</span>
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
