import { NavLink } from 'react-router-dom';

import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="container flex justify-content-sb align-items-center">
        <NavLink className="header__logo" to="/">
          <span>Cukup</span>
        </NavLink>
        <nav className="header__nav">
          <ul className="header__link-list flex">
            <li>
              <NavLink activeClassName='active' className="header__link" to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName='active' className="header__link" to="/recipes">
                Recipes
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName='active' className="header__link" to="/add">
                Add Recipe
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
