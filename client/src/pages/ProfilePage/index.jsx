/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useLoggedInUser from '../../hooks/useLoggedInUser';

import styles from './profilePage.module.css';

import Loader from '../../components/Loader';
import PageContainer from '../../components/PageContainer';
import Tabs from '../../components/Tabs';
import RecipeList from '../../components/RecipeList';

export default function ProfilePage() {
  const { userId: profileUserId } = useParams();
  const [userRecipes, setUserRecipes] = useState(undefined);
  const [likedRecipes, setLikedRecipes] = useState(undefined);
  const [profileUser, setProfileUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInUser, isLoadingLoggedInUser] = useLoggedInUser();
  const tabOptions = [
    {
      option: 'userRecipes',
      sameUserText: 'Your recipes',
      differentUserText: `${profileUser?.firstName}'s recipes`,
    },
    {
      option: 'likedRecipes',
      sameUserText: 'You like',
      differentUserText: `${profileUser?.firstName}'s likes`,
    },
  ];
  const [activeTab, setActiveTab] = useState(tabOptions[0].option);

  const fetchRecipes = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/recipes/user/${profileUserId}`);
      const recipesData = await res.json();
      setUserRecipes([...recipesData.userRecipes]);
      setLikedRecipes([...recipesData.likedRecipes]);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProfileUser = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users/${profileUserId}`);
      const userData = await res.json();
      setProfileUser(userData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Promise.all([fetchProfileUser(), fetchRecipes()]).then(() => {
      setTimeout(() => setIsLoading(false), 500);
    });
  }, []);

  return isLoading || isLoadingLoggedInUser ? (
    <Loader />
  ) : (
    <PageContainer column>
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
        <Tabs
          activeTab={activeTab}
          profileUser={profileUser}
          loggedInUser={loggedInUser}
          options={tabOptions}
          setActiveTab={setActiveTab}
        />
        {activeTab === 'userRecipes' && (
          <RecipeList user={loggedInUser} setRecipes={setUserRecipes} recipes={userRecipes} />
        )}
        {activeTab === 'likedRecipes' && (
          <RecipeList user={loggedInUser} setRecipes={setLikedRecipes} recipes={likedRecipes} />
        )}
      </section>
    </PageContainer>
  );
}
