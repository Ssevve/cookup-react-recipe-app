import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BiChevronDown } from 'react-icons/bi';
import { useNavigate, NavLink, Link } from 'react-router-dom';

import logout from '../../lib/logout';

import styles from './desktopNavMenu.module.css';

import DropdownMenu from '../DropdownMenu';
import { Button } from '../Buttons';

export default function DesktopNavMenu({
  user, setUser, showProfileDropdown, setShowProfileDropdown,
}) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await logout();

      if (res.ok) {
        setUser(null);
        navigate('/');
        setShowProfileDropdown(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ul className={cx(styles.navMenu, styles.desktopMenu)}>
      {!user && (
        <>
          <li className={styles.navItem}>
            <NavLink
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
              className={({ isActive }) => (
                isActive ? cx(styles.navLink, styles.active) : styles.navLink
              )}
              to="/login"
            >
              Log in
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <Link className={styles.signupLink} to="/signup">
              Sign up
            </Link>
          </li>
        </>
      )}
      {user && (
        <>
          <li className={styles.navItem}>
            <NavLink
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
              className={({ isActive }) => (
                isActive ? cx(styles.navLink, styles.active) : styles.navLink
              )}
              to="/recipes/add"
            >
              Add recipe
            </NavLink>
          </li>
          <li
            onMouseLeave={() => setShowProfileDropdown(false)}
            className={cx(styles.navItem, styles.profileDropdown)}
          >
            <button
              className={styles.profileDropdownButton}
              onClick={() => setShowProfileDropdown((prev) => !prev)}
              type="button"
            >
              <img
                className={styles.avatar}
                src={user.avatar.url}
                alt={`${user.firstName} ${user.lastName}`}
              />
              <span className={styles.userName}>{`${user.firstName} ${user.lastName}`}</span>
              <BiChevronDown size={20} />
            </button>
            {showProfileDropdown && (
              <DropdownMenu>
                <Link
                  onClick={() => setShowProfileDropdown(false)}
                  to={`/profile/${user.id}`}
                >
                  Profile
                </Link>
                <Button onClick={handleLogout}>
                  Log out
                </Button>
              </DropdownMenu>
            )}
          </li>
        </>
      )}
    </ul>
  );
}

DesktopNavMenu.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
  setUser: PropTypes.func.isRequired,
  setShowProfileDropdown: PropTypes.func.isRequired,
  showProfileDropdown: PropTypes.bool.isRequired,
};

DesktopNavMenu.defaultProps = {
  user: null,
};
