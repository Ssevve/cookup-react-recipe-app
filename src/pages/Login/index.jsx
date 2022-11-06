import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEmail from 'validator/lib/isEmail';

import styles from './login.module.css';

import ErrorBox from '../../components/ErrorBox';
import Container from '../../components/Container';
import Button from '../../components/Button';

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  function handleChange(e) {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  }

  function validateInput() {
    const { email, password } = userInput;

    if (!email || !isEmail(email) || password.length < 8) {
      setError('Incorrect email address or password.');
      return false;
    }
    setError('');
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const isValidInput = validateInput();
    if (!isValidInput) return;

    const url = 'http://localhost:8000/api/auth/login';
    const requestOptions = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userInput),
    };

    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
      }

      if (data.user) {
        setUser(data.user);
        navigate('/dashboard');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main className={styles.login}>
      <Container className={styles.container}>
        <section className={styles.formSection}>
          <h1 className={styles.title}>Login</h1>
          <p>
            New user?
            <Link className={styles.link} to="/signup">Sign up</Link>
          </p>
          {error && <ErrorBox error={error} />}
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className={styles.label} htmlFor="login-email">
                Email
                <input
                  className={styles.input}
                  onChange={handleChange}
                  id="login-email"
                  type="email"
                  name="email"
                />
              </label>
            </div>
            <div className="form-group">
              <label className={styles.label} htmlFor="login-password">
                Password
                <input
                  className={styles.input}
                  onChange={handleChange}
                  id="login-password"
                  type="password"
                  name="password"
                />
              </label>
            </div>
            <Button className={styles.btn} type="submit" text="Login" />
          </form>
        </section>
        <section className={styles.loginImage} />
      </Container>
    </main>
  );
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
};
