/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import styles from './recipe.module.css';

import ImageCarousel from '../../components/ImageCarousel';

export default function Recipe() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await fetch(`http://localhost:8000/recipes/${recipeId}`);
        const recipeData = await res.json();
        setRecipe(recipeData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRecipe();
  }, []);

  return (
    !isLoading && (
      <div className={styles.container}>
        <h1 className={styles.title}>{recipe.name}</h1>
        <ImageCarousel images={recipe.images} recipeName={recipe.name} />
      </div>
    )
  );
}
