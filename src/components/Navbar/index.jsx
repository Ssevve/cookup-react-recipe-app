/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { GoThreeBars } from 'react-icons/go';
import PropTypes from 'prop-types';
import { useNavigate, NavLink, Link } from 'react-router-dom';

import styles from './navbar.module.css';

export default function Navbar({ user, setUser }) {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const logout = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        setUser(null);
        navigate('/');
        setShowMenu(false);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.style.position = showMenu ? 'fixed' : 'static';
    }
  }, [showMenu]);

  return (
    <header className={styles.navbar}>
      <nav className={styles.nav}>
        <div className={cx(styles.nav, styles.left)}>
          <Link className={styles.logo} onClick={() => setShowMenu(false)} to="/">
            Cookup
          </Link>
          <button
            className={styles.hamburger}
            type="button"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <GoThreeBars />
          </button>
        </div>
        <ul className={cx(styles.navMenu, showMenu && styles.expanded)}>
          {!user && (
            <>
              <li className={styles.navItem}>
                <NavLink
                  onClick={() => setShowMenu(false)}
                  className={({ isActive }) => (isActive ? cx(styles.navLink, styles.active) : styles.navLink)}
                  to="/"
                  end
                >
                  Home
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink
                  onClick={() => setShowMenu(false)}
                  className={({ isActive }) => (isActive ? cx(styles.navLink, styles.active) : styles.navLink)}
                  to="/recipes"
                >
                  Browse Recipes
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink
                  onClick={() => setShowMenu(false)}
                  className={({ isActive }) => (isActive ? cx(styles.navLink, styles.active) : styles.navLink)}
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink
                  onClick={() => setShowMenu(false)}
                  className={({ isActive }) => (isActive ? cx(styles.navLink, styles.active) : styles.navLink)}
                  to="/signup"
                >
                  Signup
                </NavLink>
              </li>
            </>
          )}
          {user && (
            <>
              <li className={styles.navItem}>
                <NavLink
                  onClick={() => setShowMenu(false)}
                  className={({ isActive }) => (isActive ? cx(styles.navLink, styles.active) : styles.navLink)}
                  to="/dashboard"
                >
                  Dashboard
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink
                  onClick={() => setShowMenu(false)}
                  className={({ isActive }) => (isActive ? cx(styles.navLink, styles.active) : styles.navLink)}
                  to="/recipes"
                >
                  Browse recipes
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink
                  onClick={() => setShowMenu(false)}
                  className={({ isActive }) => (isActive ? cx(styles.navLink, styles.active) : styles.navLink)}
                  to="/addRecipe"
                >
                  Add recipe
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <button
                  type="button"
                  onClick={logout}
                  className={styles.navLink}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

Navbar.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  setUser: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  user: null,
};
