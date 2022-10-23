/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.css';

import RecipeCard from '../RecipeCard';

export default function Dashboard({ user }) {
  const [recipes, setRecipes] = useState([]);
  const [currentUser, setCurrentUser] = useState(user);

  const fetchRecipes = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/recipes/user/${currentUser.id}`);
      const recipesData = await res.json();
      setRecipes([...recipesData]);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/auth', {
        credentials: 'include',
      });
      const data = await res.json();
      return setCurrentUser(data.user);
    } catch (err) {
      return console.log(err);
    }
  };

  useEffect(() => {
    if (!user) fetchUser();
  }, []);

  useEffect(() => {
    if (currentUser) fetchRecipes();
  }, [currentUser]);

  return (
    <section className="container page">
      <h1 className="subpage-title">Dashboard</h1>
      <div className="dashboard">
        <ul className="recipes">
          {recipes.length ? (
            recipes.map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} />)
          ) : (
            <p>No recipes to show! :(</p>
          )}
        </ul>
      </div>
    </section>
  );
}

Dashboard.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
};

Dashboard.defaultProps = {
  user: null,
};
