import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { GoThreeBars } from 'react-icons/go';
import PropTypes from 'prop-types';
import { useNavigate, NavLink, Link } from 'react-router-dom';

import styles from './navbar.module.css';

import Button from '../Button';

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
      <div className={styles.container}>
        <NavLink className={styles.logo} to="/">
          Cookup
        </NavLink>
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
                <li>
                  <NavLink className={styles.link} activeClassName={styles.active} to="/" end>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink className={styles.link} activeClassName={styles.active} to="/recipes">
                    Recipes
                  </NavLink>
                </li>
                <li>
                  <NavLink className={styles.link} activeStyle={styles.active} to="/login">
                    Login
                  </NavLink>
                </li>
                <li>
                  <Link to="/signup">
                    <Button text="Signup" />
                  </Link>
                </li>
              </>
            )}
            {user && (
              <>
                <li>
                  <NavLink activeclassname="active" className={styles.navbarLink} to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink activeclassname="active" className={styles.navbarLink} to="/recipes">
                    Recipes
                  </NavLink>
                </li>
                <li>
                  <NavLink activeclassname="active" className={styles.navbarLink} to="/add">
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

Navbar.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  setUser: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  user: null,
};
