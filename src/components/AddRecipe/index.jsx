import RecipeForm from '../RecipeForm';

// import './style.css';

export default function AddRecipe() {
  return (
    <section className="container page">
      <h1 className="page__title">Add new recipe</h1>
      <RecipeForm />
    </section>
  );
}
