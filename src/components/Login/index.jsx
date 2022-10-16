import { useState } from 'react';

import './style.css';

export default function Login() {
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // TODO: Add validation

    const url = 'http://localhost:8000/api/auth/login';
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
    <main className="login">
      <div className="container flex justify-content-sb h-full align-items-center">
        <section className="form-section">
          <h1 className="subpage-title">Login</h1>
          <form className="auth-form" onSubmit={handleSubmit}>
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
            <button className="btn btn--cta pt-2" type="submit">
              Login
            </button>
          </form>
        </section>
        <section className="login__image"></section>
      </div>
    </main>
  );
}
