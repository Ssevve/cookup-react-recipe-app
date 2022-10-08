import { useLocation } from 'react-router-dom';

import './style.css';

import IngredientList from '../IngredientList';
import InstructionList from '../InstructionList';

export default function Recipe() {
  const location = useLocation();
  const { recipe } = location.state;

  return (
    <section className="recipe page">
      <div className="container flex">
        <section className="recipe__image">
          <img src={recipe.image} alt={recipe.title} />
        </section>
        <section className="recipe__details flex flex-column">
          <div>
            <h1 className="recipe__title">{recipe.title}</h1>
            <p className="recipe__description">{recipe.description}</p>
          </div>
          <section className="recipe__ingredients">
            <h2 className="section-heading">Ingredients</h2>
            <IngredientList ingredients={recipe.ingredients} />
          </section>
          <section className="recipe__instructions">
            <h2 className="section-heading">Instructions</h2>
            <InstructionList instructions={recipe.instructions} />
          </section>
        </section>
      </div>
    </section>
  );
}
