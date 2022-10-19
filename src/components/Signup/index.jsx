import { useState } from 'react';
import isEmail from 'validator/lib/isEmail';

import './style.css';

export default function Signup() {
  const [userInput, setUserInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({});
 
  function handleChange(e) {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  }

  function validateInput() {
    const errors = {};
    
    if (userInput.firstName.length === 0) errors.firstName = 'First name cannot be empty';
    if (userInput.lastName.length === 0) errors.lastName = 'Last name cannot be empty';

    if (userInput.email.length === 0) errors.email = 'Email cannot be empty';
    else if (!isEmail(userInput.email)) errors.email = 'Email is not valid';
    
    if (userInput.password.length < 8) errors.password = 'Password must be at least 8 characters long';
    if (userInput.confirmPassword !== userInput.password) errors.confirmPassword = 'Passwords do not match';

    setFormErrors(errors);
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
                className={`form__input ${
                  formErrors.firstName ? 'border-error' : ''
                }`}
                onChange={handleChange}
                id="signup-first-name"
                type="text"
                name="firstName"
              />
              <small className="form-error-message">{formErrors.firstName}</small>
            </div>
            <div className="form-group">
              <label className="form__label" htmlFor="signup-last-name">
                Last name
              </label>
              <input
                className={`form__input ${
                  formErrors.lastName ? 'border-error' : ''
                }`}
                onChange={handleChange}
                id="signup-last-name"
                type="text"
                name="lastName"
              />
              <small className="form-error-message">{formErrors.lastName}</small>
            </div>
            <div className="form-group">
              <label className="form__label" htmlFor="signup-email">
                Email
              </label>
              <input
                className={`form__input ${formErrors.email ? 'border-error' : ''}`}
                onChange={handleChange}
                id="signup-email"
                type="email"
                name="email"
              />
              <small className="form-error-message">{formErrors.email}</small>
            </div>
            <div className="form-group">
              <label className="form__label" htmlFor="signup-password">
                Password
              </label>
              <input
                className={`form__input ${
                  formErrors.password ? 'border-error' : ''
                }`}
                onChange={handleChange}
                id="signup-password"
                type="password"
                name="password"
              />
              <small className="form-error-message">{formErrors.password}</small>
            </div>
            <div className="form-group">
              <label className="form__label" htmlFor="signup-confirm-password">
                Confirm Password
              </label>
              <input
                className={`form__input ${
                  formErrors.confirmPassword ? 'border-error' : ''
                }`}
                onChange={handleChange}
                id="signup-confirm-password"
                type="password"
                name="confirmPassword"
              />
              <small className="form-error-message">
                {formErrors.confirmPassword}
              </small>
            </div>
            <button className="btn btn--cta pt-2 align-self-end" type="submit">
              Signup
            </button>
          </form>
        </section>
        <section className="signup__image"></section>
      </div>
    </main>
  );
}
