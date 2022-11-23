/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import cx from 'classnames';

import useLoggedInUser from '../../hooks/useLoggedInUser';

import styles from './profile.module.css';
import RecipeCard from '../../components/RecipeCard';

export default function Profile() {
  const { userId: profileUserId } = useParams();
  const [userRecipes, setUserRecipes] = useState(undefined);
  const [likedRecipes, setLikedRecipes] = useState(undefined);
  const [profileUser, setProfileUser] = useState(undefined);
  const [activeTab, setActiveTab] = useState('userRecipes');
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInUser, isLoadingLoggedInUser] = useLoggedInUser();

  const fetchRecipes = async () => {
    try {
      const res = await fetch(`http://localhost:8000/recipes/user/${profileUserId}`);
      const recipesData = await res.json();
      setUserRecipes([...recipesData.userRecipes]);
      setLikedRecipes([...recipesData.likedRecipes]);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProfileUser = async () => {
    try {
      const res = await fetch(`http://localhost:8000/users/${profileUserId}`);
      const userData = await res.json();
      setProfileUser(userData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Promise.all([fetchProfileUser(), fetchRecipes()])
      .then(() => {
        setIsLoading(false);
        console.log(loggedInUser);
      });
  }, []);

  // const handleLikeClick = async (e, recipeId) => {
  //   e.preventDefault();

  //   if (!loggedInUser) return;

  //   const targetRecipe = userRecipes.find((recipe) => recipe._id === recipeId);
  //   if (loggedInUser.id === targetRecipe.createdBy) return;

  //   try {
  //     const res = await fetch(`http://localhost:8000/recipes/like/${recipeId}`, {
  //       method: 'PUT',
  //       credentials: 'include',
  //     });

  //     if (res.ok) {
  //       fetchRecipes();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className={styles.container}>
      {!isLoading && !isLoadingLoggedInUser && (
        <>
          <section className={styles.userInfo}>
            {profileUser && (
              <img
                className={styles.avatar}
                src={profileUser.avatar.url}
                alt={`${profileUser.firstName} ${profileUser.lastName}`}
              />
            )}

            <h1>{`${profileUser.firstName} ${profileUser.lastName}`}</h1>
          </section>
          <section className={styles.recipeSection}>
            <div className={styles.tabButtons}>
              <button onClick={() => setActiveTab('userRecipes')} className={cx(styles.tab, activeTab === 'userRecipes' && styles.activeTab)} type="button">
                {loggedInUser?.id?.toString() === profileUser._id.toString() ? <span>Your recipes</span> : <span>{`${profileUser.firstName}'s recipes`}</span>}
              </button>
              <button onClick={() => setActiveTab('likedRecipes')} className={cx(styles.tab, activeTab === 'likedRecipes' && styles.activeTab)} type="button">
                {loggedInUser?.id?.toString() === profileUser._id.toString() ? <span>You like</span> : <span>{`${profileUser.firstName} likes`}</span>}
              </button>
            </div>
            <ul className={styles.recipes}>
              {activeTab === 'userRecipes' && userRecipes.map((recipe) => (
                <li key={recipe._id}>
                  <RecipeCard setRecipes={setUserRecipes} recipes={userRecipes} recipe={recipe} user={loggedInUser} />
                </li>
              ))}
              {activeTab === 'likedRecipes' && likedRecipes.map((recipe) => (
                <li key={recipe._id}>
                  <RecipeCard setRecipes={setLikedRecipes} recipes={likedRecipes} recipe={recipe} user={loggedInUser} />
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}
