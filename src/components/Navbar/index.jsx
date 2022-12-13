/* eslint-disable max-len */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import styles from './navbar.module.css';

import HamburgerMenuButton from '../HamburgerMenuButton';
import MobileNavMenu from '../MobileNavMenu';
import DesktopNavMenu from '../DesktopNavMenu';

export default function Navbar({ user, setUser }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

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
          <HamburgerMenuButton onClick={() => setShowMenu((prev) => !prev)} />
        </div>
        <MobileNavMenu user={user} setUser={setUser} showMenu={showMenu} setShowMenu={setShowMenu} />
        <DesktopNavMenu user={user} setUser={setUser} showProfileDropdown={showProfileDropdown} setShowProfileDropdown={setShowProfileDropdown} />
      </nav>
    </header>
  );
}

Navbar.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }),
  setUser: PropTypes.func,
};

Navbar.defaultProps = {
  user: null,
  setUser: undefined,
};
