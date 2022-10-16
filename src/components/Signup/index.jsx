import { useState } from 'react';

import './style.css';

export default function Signup() {
  const [userInput, setUserInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  function handleChange(e) {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
      // TODO: Add validation

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
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form__label" htmlFor="signup-first-name">
                First name
              </label>
              <input
                className="form__input"
                onChange={handleChange}
                id="signup-first-name"
                type="text"
                name="firstName"
              />
            </div>
            <div className="form-group">
              <label className="form__label" htmlFor="signup-last-name">
                Last name
              </label>
              <input
                className="form__input"
                onChange={handleChange}
                id="signup-last-name"
                type="text"
                name="lastName"
              />
            </div>
            <div className="form-group">
              <label className="form__label" htmlFor="signup-email">
                Email
              </label>
              <input
                className="form__input"
                onChange={handleChange}
                id="signup-email"
                type="email"
                name="email"
              />
            </div>
            <div className="form-group">
              <label className="form__label" htmlFor="signup-password">
                Password
              </label>
              <input
                className="form__input"
                onChange={handleChange}
                id="signup-password"
                type="password"
                name="password"
              />
            </div>
            <div className="form-group">
              <label className="form__label" htmlFor="signup-confirm-password">
                Confirm Password
              </label>
              <input
                className="form__input"
                onChange={handleChange}
                id="signup-confirm-password"
                type="password"
                name="repeatPassword"
              />
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
