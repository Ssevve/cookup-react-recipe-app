import { useState } from 'react';
import isEmail from 'validator/lib/isEmail';

import './style.css';

export default function Login({ setUser }) {
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  function handleChange(e) {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  }

  function validateInput() {
    if (userInput.email.length === 0
      || !isEmail(userInput.email)
      || userInput.password.length < 8) {
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

      if (data.user) {
        setUser(data.user);
      }

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main className="login">
      <div className="container flex justify-content-sb h-full align-items-center">
        <section className="form-section">
          <h1 className="subpage-title">Login</h1>
          {error &&<div className="alert-box">
            <p>{error}</p>
          </div>}
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form__label" htmlFor="login-email">
                Email
              </label>
              <input
                className="form__input"
                onChange={handleChange}
                id="login-email"
                type="email"
                name="email"
              />
            </div>
            <div className="form-group">
              <label className="form__label" htmlFor="login-password">
                Password
              </label>
              <input
                className="form__input"
                onChange={handleChange}
                id="login-password"
                type="password"
                name="password"
              />
            </div>
            <button className="btn btn--cta pt-2 align-self-end" type="submit">
              Login
            </button>
          </form>
        </section>
        <section className="login__image"></section>
      </div>
    </main>
  );
}
