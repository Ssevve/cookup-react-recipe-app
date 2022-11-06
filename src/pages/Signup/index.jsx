import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';

import styles from './signup.module.css';

import ErrorBox from '../../components/ErrorBox';
import Container from '../../components/Container';
import Button from '../../components/Button';

export default function Signup() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState(null);

  function handleChange(e) {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  }

  function validateInput() {
    const errors = [];

    const {
      firstName, lastName, email, password, confirmPassword,
    } = userInput;

    if (firstName.length === 0) errors.push('First name cannot be empty');
    if (lastName.length === 0) errors.push('Last name cannot be empty');

    if (email.length === 0) errors.push('Email cannot be empty');
    else if (!isEmail(email)) errors.push('Email is not valid');

    if (password.length < 8) errors.push('Password must be at least 8 characters long');
    if (confirmPassword !== password) errors.push('Passwords do not match');

    setFormErrors(errors || null);
    return Object.values(errors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const isValidInput = validateInput();
    if (!isValidInput) return;

    const url = 'http://localhost:8000/api/auth/signup';
    const requestOptions = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userInput),
    };

    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();

      if (!res.ok) {
        setFormErrors([data.message]);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className={styles.signup}>
      <Container className={styles.container}>
        <section className={styles.formSection}>
          <h1 className={styles.title}>Signup</h1>
          <p>
            Existing user?
            <Link className={styles.link} to="/login">Log in</Link>
          </p>
          {formErrors && <ErrorBox errors={formErrors} />}
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className={styles.label} htmlFor="signup-first-name">
                First name
                <input
                  className={styles.input}
                  onChange={handleChange}
                  id="signup-first-name"
                  type="text"
                  name="firstName"
                />
              </label>
            </div>
            <div className="form-group">
              <label className={styles.label} htmlFor="signup-last-name">
                Last name
                <input
                  className={styles.input}
                  onChange={handleChange}
                  id="signup-last-name"
                  type="text"
                  name="lastName"
                />
              </label>
            </div>
            <div className="form-group">
              <label className={styles.label} htmlFor="signup-email">
                Email
                <input
                  className={styles.input}
                  onChange={handleChange}
                  id="signup-email"
                  type="email"
                  name="email"
                />
              </label>
            </div>
            <div className="form-group">
              <label className={styles.label} htmlFor="signup-password">
                Password
                <input
                  className={styles.input}
                  onChange={handleChange}
                  id="signup-password"
                  type="password"
                  name="password"
                />
              </label>
            </div>
            <div className="form-group">
              <label className={styles.label} htmlFor="signup-confirm-password">
                Confirm Password
                <input
                  className={styles.input}
                  onChange={handleChange}
                  id="signup-confirm-password"
                  type="password"
                  name="confirmPassword"
                />
              </label>
            </div>
            <Button className={styles.btn} type="submit" text="Signup" />
          </form>
        </section>
        <section className={styles.signupImage} />
      </Container>
    </main>
  );
}
