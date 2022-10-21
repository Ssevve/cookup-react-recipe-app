import React from 'react';
import RecipeForm from '../RecipeForm';

export default function AddRecipe() {
  return (
    <section className="container page">
      <h1 className="subpage-title">Add new recipe</h1>
      <RecipeForm />
    </section>
  );
}
