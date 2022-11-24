import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './editRecipe.module.css';

import RecipeForm from '../../components/RecipeForm';

export default function EditRecipe() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(undefined);
  const [fetchingRecipe, setFetchingRecipe] = useState(true);

  const getRecipe = async () => {
    try {
      const res = await fetch(`http://localhost:8000/recipes/${recipeId}`);
      const data = await res.json();
      setRecipe(data);
      setFetchingRecipe(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecipe();
  }, []);
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Edit recipe</h1>
      {!fetchingRecipe && <RecipeForm recipe={recipe} />}
    </section>
  );
}
