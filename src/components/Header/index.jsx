import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './style.css';

export default function Header({ user, setUser }) {
  const logout = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        setUser(null);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return (
    <header className="header">
      <div className="container flex justify-content-sb align-items-center">
        <NavLink className="header__logo" to="/">
          <span>Cookup</span>
        </NavLink>
        <nav className="header__nav">
          <ul className="header__link-list flex">
            {!user && (
              <>
                <li>
                  <NavLink activeclassname="active" className="btn header__link" to="/" end>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink activeclassname="active" className="btn header__link" to="/recipes">
                    Recipes
                  </NavLink>
                </li>
                <li>
                  <NavLink activeclassname="active" className="btn header__link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink activeclassname="active" className="btn header__link" to="/signup">
                    Signup
                  </NavLink>
                </li>
              </>
            )}
            {user && (
              <>
                <li>
                  <NavLink activeclassname="active" className="btn header__link" to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink activeclassname="active" className="btn header__link" to="/recipes">
                    Recipes
                  </NavLink>
                </li>
                <li>
                  <NavLink activeclassname="active" className="btn header__link" to="/add">
                    Add Recipe
                  </NavLink>
                </li>

                <li>
                  <NavLink onClick={logout} className="btn" to="#">
                    Logout
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

Header.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  setUser: PropTypes.func.isRequired,
};

Header.defaultProps = {
  user: null,
};
