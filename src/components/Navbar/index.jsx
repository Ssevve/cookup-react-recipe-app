import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { GoThreeBars } from 'react-icons/go';
import PropTypes from 'prop-types';
import { useNavigate, NavLink, Link } from 'react-router-dom';

import styles from './navbar.module.css';

import Button from '../Button';
import Container from '../Container';

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
      <Container className={styles.container}>
        <Link onClick={() => setShowMenu(false)} className={styles.logo} to="/">
          Cookup
        </Link>
        <button
          className={styles.hamburger}
          type="button"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <GoThreeBars />
        </button>
        <nav className={cx(styles.nav, showMenu && styles.expanded)}>
          <ul className={styles.links}>
            {!user && (
              <>
                <li className={styles.listItem}>
                  <NavLink onClick={() => setShowMenu(false)} className={({ isActive }) => (isActive ? cx(styles.link, styles.active) : styles.link)} to="/" end>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={() => setShowMenu(false)} className={({ isActive }) => (isActive ? cx(styles.link, styles.active) : styles.link)} to="/recipes">
                    Browse Recipes
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={() => setShowMenu(false)} className={({ isActive }) => (isActive ? cx(styles.link, styles.active) : styles.link)} to="/login">
                    Login
                  </NavLink>
                </li>
                <li>
                  <Link onClick={() => setShowMenu(false)} to="/signup">
                    <Button className={styles.navBtn} text="Signup" />
                  </Link>
                </li>
              </>
            )}
            {user && (
              <>
                <li>
                  <NavLink onClick={() => setShowMenu(false)} className={({ isActive }) => (isActive ? cx(styles.link, styles.active) : styles.link)} to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={() => setShowMenu(false)} className={({ isActive }) => (isActive ? cx(styles.link, styles.active) : styles.link)} to="/recipes">
                    Browse recipes
                  </NavLink>
                </li>
                <li>
                  <Link onClick={() => setShowMenu(false)} to="/add">
                    Add Recipe
                  </Link>
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
      </Container>
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