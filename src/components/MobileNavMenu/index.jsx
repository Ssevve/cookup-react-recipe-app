import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useNavigate, NavLink, Link } from 'react-router-dom';

import logout from '../../lib/logout';

import styles from './mobileNavMenu.module.css';

export default function MobileNavMenu({
  user, setUser, setShowMenu, showMenu,
}) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await logout();

      if (res.ok) {
        setUser(null);
        navigate('/');
        setShowMenu(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ul className={cx(styles.navMenu, styles.mobileMenu, showMenu && styles.expanded)}>
      {!user && (
        <>
          <li className={styles.navItem}>
            <NavLink
              onClick={() => setShowMenu(false)}
              className={({ isActive }) => (
                isActive ? cx(styles.navLink, styles.active) : styles.navLink
              )}
              to="/"
              end
            >
              Home
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              onClick={() => setShowMenu(false)}
              className={({ isActive }) => (
                isActive ? cx(styles.navLink, styles.active) : styles.navLink
              )}
              to="/recipes/browse"
            >
              Browse Recipes
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              onClick={() => setShowMenu(false)}
              className={({ isActive }) => (
                isActive ? cx(styles.navLink, styles.active) : styles.navLink
              )}
              to="/login"
            >
              Log in
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <Link onClick={() => setShowMenu(false)} className={styles.signupLink} to="/signup">
              Sign up
            </Link>
          </li>
        </>
      )}
      {user && (
        <>
          <li className={styles.navItem}>
            <Link onClick={() => setShowMenu(false)} to={`/profile/${user.id}`}>
              <img
                className={styles.avatar}
                src={user.avatar.url}
                alt={`${user.firstName} ${user.lastName}`}
              />
              <span className={styles.userName}>{`${user.firstName} ${user.lastName}`}</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <NavLink
              onClick={() => setShowMenu(false)}
              className={({ isActive }) => (
                isActive ? cx(styles.navLink, styles.active) : styles.navLink
              )}
              to="/recipes/browse"
            >
              Browse recipes
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              onClick={() => setShowMenu(false)}
              className={({ isActive }) => (
                isActive ? cx(styles.navLink, styles.active) : styles.navLink
              )}
              to="/recipes/add"
            >
              Add recipe
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <button type="button" onClick={handleLogout} className={styles.navLink}>
              Log out
            </button>
          </li>
        </>
      )}
    </ul>
  );
}

MobileNavMenu.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
  setUser: PropTypes.func.isRequired,
  setShowMenu: PropTypes.func.isRequired,
  showMenu: PropTypes.bool.isRequired,
};

MobileNavMenu.defaultProps = {
  user: null,
};
