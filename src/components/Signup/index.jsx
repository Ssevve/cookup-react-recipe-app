import { useState } from 'react';
import validator from 'validator';

import './style.css';

export default function Signup() {
  const [userInput, setUserInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  function handleChange(e) {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });

    validateInput(e);
  }

  function validateInput(e) {
    const { name, value } = e.target;

    let error = '';

    if (name === 'firstName')
      error = value.length < 1 ? 'Provide a first name' : '';
    else if (name === 'lastName')
      error = value.length < 1 ? 'Provide a last name' : '';
    else if (name === 'email')
      error = !validator.isEmail(value) ? 'Provide a valid email' : '';
    else if (name === 'password')
      error =
        value.length < 8 ? 'Password must be at least 8 characters long' : '';
    else if (name === 'confirmPassword')
      error = value !== userInput.password ? 'Passwords do not match' : '';


    setErrors({ ...errors, [e.target.name]: error });
    console.log(errors);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let isInputValid = Object.values(errors).every(
      (error) => error.length === 0,
    );

    if (!isInputValid) {
      console.log('Errors prevented from submitting the form');
      return;
    }

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
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main className="signup">
      <div className="container flex justify-content-sb h-full align-items-center">
        <section className="form-section">
          <h1 className="subpage-title">Signup</h1>
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form__label" htmlFor="signup-first-name">
                First name
              </label>
              <input
                className={`form__input ${errors.firstName ? 'border-error' : ''}`}
                onChange={handleChange}
                id="signup-first-name"
                type="text"
                name="firstName"
              />
              <small className="form-error-message">{errors.firstName}</small>
            </div>
            <div className="form-group">
              <label className="form__label" htmlFor="signup-last-name">
                Last name
              </label>
              <input
                className={`form__input ${errors.lastName ? 'border-error' : ''}`}
                onChange={handleChange}
                id="signup-last-name"
                type="text"
                name="lastName"
              />
              <small className="form-error-message">{errors.lastName}</small>
            </div>
            <div className="form-group">
              <label className="form__label" htmlFor="signup-email">
                Email
              </label>
              <input
                className={`form__input ${errors.email ? 'border-error' : ''}`}
                onChange={handleChange}
                id="signup-email"
                type="email"
                name="email"
              />
              <small className="form-error-message">{errors.email}</small>
            </div>
            <div className="form-group">
              <label className="form__label" htmlFor="signup-password">
                Password
              </label>
              <input
                className={`form__input ${errors.password ? 'border-error' : ''}`}
                onChange={handleChange}
                id="signup-password"
                type="password"
                name="password"
              />
              <small className="form-error-message">{errors.password}</small>
            </div>
            <div className="form-group">
              <label className="form__label" htmlFor="signup-confirm-password">
                Confirm Password
              </label>
              <input
                className={`form__input ${errors.confirmPassword ? 'border-error' : ''}`}
                onChange={handleChange}
                id="signup-confirm-password"
                type="password"
                name="confirmPassword"
              />
              <small className="form-error-message">{errors.confirmPassword}</small>
            </div>
            <button className="btn btn--cta pt-2" type="submit">
              Signup
            </button>
          </form>
        </section>
        <section className="signup__image"></section>
      </div>
    </main>
  );
}
