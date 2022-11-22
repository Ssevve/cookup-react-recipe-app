/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { GoThreeBars } from 'react-icons/go';
import { BiChevronDown } from 'react-icons/bi';
import { useNavigate, NavLink, Link } from 'react-router-dom';

import styles from './navbar.module.css';

export default function Navbar({ user, setUser }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const logout = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8000/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        setUser(null);
        navigate('/');
        setShowMenu(false);
        setShowProfileDropdown(false);
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
          {user && (
            <Link className={styles.logo} onClick={() => setShowMenu(false)} to={`/profile/${user.id}`}>
              Cookup
            </Link>
          )}
          {!user && (
            <Link className={styles.logo} onClick={() => setShowMenu(false)} to="/">
              Cookup
            </Link>
          )}
          <button
            className={styles.hamburger}
            type="button"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <GoThreeBars />
          </button>
        </div>
        {/* MOBILE NAV */}
        <ul className={cx(styles.navMenu, styles.mobileMenu, showMenu && styles.expanded)}>
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
                  to="/recipes/browse"
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
                  Log in
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <Link onClick={() => setShowMenu(false)} className={styles.btn} to="/signup">
                  Sign up
                </Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li className={styles.navItem}>
                <Link onClick={() => setShowMenu(false)} to={`/profile/${user.id}`}>
                  <img className={styles.avatar} src={user.avatar.url} alt={`${user.firstName} ${user.lastName}`} />
                  <span className={styles.userName}>{`${user.firstName} ${user.lastName}`}</span>
                </Link>
              </li>
              <li className={styles.navItem}>
                <NavLink
                  onClick={() => setShowMenu(false)}
                  className={({ isActive }) => (isActive ? cx(styles.navLink, styles.active) : styles.navLink)}
                  to="/recipes/browse"
                >
                  Browse recipes
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink
                  onClick={() => setShowMenu(false)}
                  className={({ isActive }) => (isActive ? cx(styles.navLink, styles.active) : styles.navLink)}
                  to="/recipes/add"
                >
                  Add recipe
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <button type="button" onClick={logout} className={styles.navLink}>
                  Log out
                </button>
              </li>
            </>
          )}
        </ul>
        {/* DESKTOP NAV */}
        <ul className={cx(styles.navMenu, styles.desktopMenu, showMenu && styles.expanded)}>
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
                  to="/recipes/browse"
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
                  Log in
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <Link onClick={() => setShowMenu(false)} className={styles.btn} to="/signup">
                  Sign up
                </Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li className={styles.navItem}>
                <NavLink
                  onClick={() => setShowMenu(false)}
                  className={({ isActive }) => (isActive ? cx(styles.navLink, styles.active) : styles.navLink)}
                  to="/recipes/browse"
                >
                  Browse recipes
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink
                  onClick={() => setShowMenu(false)}
                  className={({ isActive }) => (isActive ? cx(styles.navLink, styles.active) : styles.navLink)}
                  to="/recipes/add"
                >
                  Add recipe
                </NavLink>
              </li>
              <li onMouseLeave={() => setShowProfileDropdown(false)} className={cx(styles.navItem, styles.profileDropdown)}>
                <button className={styles.profileDropdownButton} onClick={() => setShowProfileDropdown((prev) => !prev)} type="button">
                  <img className={styles.avatar} src={user.avatar.url} alt={`${user.firstName} ${user.lastName}`} />
                  <span className={styles.userName}>{`${user.firstName} ${user.lastName}`}</span>
                  <BiChevronDown size={20} />
                </button>
                {showProfileDropdown && (
                  <ul className={styles.profileDropdownMenu}>
                    <li>
                      <Link
                        onClick={() => setShowProfileDropdown(false)}
                        className={styles.dropdownLink}
                        to={`/profile/${user.id}`}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button type="button" onClick={logout} className={styles.dropdownLink}>
                        Log out
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
