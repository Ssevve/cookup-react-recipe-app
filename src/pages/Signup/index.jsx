import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';

import './style.css';

import ErrorBox from '../../components/ErrorBox';

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
    <main className="signup">
      <div className="container flex justify-content-sb h-full align-items-center">
        <section className="form-section">
          <h1 className="subpage-title">Signup</h1>
          {formErrors && <ErrorBox errors={formErrors} />}
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form__label" htmlFor="signup-first-name">
                First name
                <input
                  className="form__input"
                  onChange={handleChange}
                  id="signup-first-name"
                  type="text"
                  name="firstName"
                />
              </label>
            </div>
            <div className="form-group">
              <label className="form__label" htmlFor="signup-last-name">
                Last name
                <input
                  className="form__input"
                  onChange={handleChange}
                  id="signup-last-name"
                  type="text"
                  name="lastName"
                />
              </label>
            </div>
            <div className="form-group">
              <label className="form__label" htmlFor="signup-email">
                Email
                <input
                  className="form__input"
                  onChange={handleChange}
                  id="signup-email"
                  type="email"
                  name="email"
                />
              </label>
            </div>
            <div className="form-group">
              <label className="form__label" htmlFor="signup-password">
                Password
                <input
                  className="form__input"
                  onChange={handleChange}
                  id="signup-password"
                  type="password"
                  name="password"
                />
              </label>
            </div>
            <div className="form-group">
              <label className="form__label" htmlFor="signup-confirm-password">
                Confirm Password
                <input
                  className="form__input"
                  onChange={handleChange}
                  id="signup-confirm-password"
                  type="password"
                  name="confirmPassword"
                />
              </label>
            </div>
            <button className="btn btn--cta pt-2 align-self-end" type="submit">
              Signup
            </button>
          </form>
        </section>
        <section className="signup__image" />
      </div>
    </main>
  );
}
