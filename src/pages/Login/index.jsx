/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import styles from './login.module.css';

export default function Login({ setUser }) {
  const [responseError, setResponseError] = useState('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit' });

  async function handleFormSubmit(data) {
    const url = 'http://localhost:8000/api/auth/login';
    const requestOptions = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const res = await fetch(url, requestOptions);
      const resData = await res.json();

      if (res.status === 400 || res.status === 401) setResponseError(resData.message);
      else if (res.status === 404) setResponseError('Something went wrong.');
      else if (res.status === 500) setResponseError('Server error.');

      console.log(resData);

      if (resData.user) {
        setUser(resData.user);
        navigate('/dashboard');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.container}>
      <section className={styles.formSection}>
        <h1 className={styles.title}>Log in</h1>
        <p className={styles.newUser}>
          New user?
          <Link className={styles.link} to="/signup">
            Sign up
          </Link>
        </p>
        {(errors.email || errors.password || responseError) && (
          <div className={styles.errorBox}>
            <span>{responseError || 'Incorrect email or password.'}</span>
            <span>Please try again.</span>
          </div>
        )}
        <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <div className="form-group">
            <label className={styles.label} htmlFor="email">
              Email
              <input
                {...register('email', {
                  required: true,
                  pattern:
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                })}
                className={styles.input}
                id="email"
                type="email"
                name="email"
              />
            </label>
          </div>
          <div className="form-group">
            <label className={styles.label} htmlFor="password">
              Password
              <input
                {...register('password', { required: true, minLength: 8 })}
                className={styles.input}
                id="password"
                type="password"
                name="password"
              />
            </label>
          </div>
          <button className={styles.btn} type="submit">
            Login
          </button>
        </form>
      </section>
      <section className={styles.loginImage} />
    </div>
  );
}
