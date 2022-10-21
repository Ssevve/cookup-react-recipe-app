import { useState } from 'react';
import isEmail from 'validator/lib/isEmail';

import './style.css';

import ErrorBox from '../ErrorBox';

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
        return setError(data.message);
      }

      if (data.user) {
        setUser(data.user);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main className="login">
      <div className="container flex justify-content-sb h-full align-items-center">
        <section className="form-section">
          <h1 className="subpage-title">Login</h1>
          {error && <ErrorBox error={error} />}
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
