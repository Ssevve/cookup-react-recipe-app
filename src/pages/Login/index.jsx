/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import styles from './login.module.css';

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit' });
  // const [error, setError] = useState('');

  // function handleChange(e) {
  //   setUserInput({ ...userInput, [e.target.name]: e.target.value });
  // }

  // function validateInput() {
  //   const { email, password } = userInput;

  //   if (!email || !isEmail(email) || password.length < 8) {
  //     setError('Incorrect email address or password.');
  //     return false;
  //   }
  //   setError('');
  //   return true;
  // }

  async function handleFormSubmit(data) {
    console.log(data);

    // const isValidInput = validateInput();
    // if (!isValidInput) return;

    // const url = 'http://localhost:8000/api/auth/login';
    // const requestOptions = {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // };

    // try {
    //   const res = await fetch(url, requestOptions);
    //   const data = await res.json();

    //   if (!res.ok) {
    //     setError(data.message);
    //   }

    //   if (data.user) {
    //     setUser(data.user);
    //     navigate('/dashboard');
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  }

  return (
    <div className={styles.container}>
      <section className={styles.formSection}>
        <h1 className={styles.title}>Login</h1>
        <p className={styles.newUser}>
          New user?
          <Link className={styles.link} to="/signup">
            Sign up
          </Link>
        </p>
        {(errors.email || errors.password) && (
          <div className={styles.errorBox}>
            <span>Incorrect email or password.</span>
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
