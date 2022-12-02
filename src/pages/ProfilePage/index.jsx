/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useLoggedInUser from '../../hooks/useLoggedInUser';

import styles from './profilePage.module.css';

import PageContainer from '../../components/PageContainer';
import Tabs from '../../components/Tabs';
import RecipeList from '../../components/RecipeList';

export default function ProfilePage() {
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
      });
  }, []);

  const tabOptions = ['userRecipes', 'likedRecipes'];

  return (
    <PageContainer column>
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
            <Tabs activeTab={activeTab} profileUser={profileUser} loggedInUser={loggedInUser} options={tabOptions} setActiveTab={setActiveTab} />
            {activeTab === 'userRecipes' && <RecipeList user={loggedInUser} setRecipes={setUserRecipes} recipes={userRecipes} />}
            {activeTab === 'likedRecipes' && <RecipeList user={loggedInUser} setRecipes={setLikedRecipes} recipes={likedRecipes} />}
          </section>
        </>
      )}
    </PageContainer>
  );
}
