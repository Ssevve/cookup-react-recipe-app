import { NavLink } from 'react-router-dom';

import './style.css';

export default function Header({ user, setUser }) {
  async function logout(e) {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      const data = await res.json();

      if (res.status === 200) {
        setUser(null);
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <header className="header">
      <div className="container flex justify-content-sb align-items-center">
        <NavLink className="header__logo" to="/">
          <span>Cookup</span>
        </NavLink>
        <nav className="header__nav">
          <ul className="header__link-list flex">
            <li>
              <NavLink
                activeclassname="active"
                className="btn header__link"
                to="/"
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                activeclassname="active"
                className="btn header__link"
                to="/recipes"
              >
                Recipes
              </NavLink>
            </li>
            <li>
              <NavLink
                activeclassname="active"
                className="btn header__link"
                to="/add"
              >
                Add Recipe
              </NavLink>
            </li>
            <li>
              <NavLink
                activeclassname="active"
                className="btn header__link"
                to="/login"
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                activeclassname="active"
                className="btn header__link"
                to="/signup"
              >
                Signup
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={logout}
                activeclassname="active"
                className="btn header__link"
                to="#"
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
