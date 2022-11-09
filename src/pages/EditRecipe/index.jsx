// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// import RecipeForm from '../../components/RecipeForm';

// export default function EditRecipe() {
//   const { recipeId } = useParams();
//   const [recipe, setRecipe] = useState(null);
//   const [fetchingRecipe, setFetchingRecipe] = useState(true);

//   const getRecipe = async () => {
//     try {
//       const res = await fetch(`http://localhost:8000/api/recipes/${recipeId}`);
//       const data = await res.json();
//       setRecipe(data);
//       setFetchingRecipe(false);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getRecipe();
//   }, []);
//   return (
//     <section className="container page">
//       <h1 className="subpage-title">Edit recipe</h1>
//       {!fetchingRecipe && <RecipeForm recipe={recipe} />}
//     </section>
//   );
// }
