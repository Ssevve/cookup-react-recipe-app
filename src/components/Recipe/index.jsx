import { useLocation } from 'react-router-dom';

import IngredientList from '../IngredientList';
import Steps from '../Steps';

export default function Recipe() {
  const location = useLocation();
  const { recipe } = location.state;

  return (
    <section>
      <div className="container flex">
        <section className="recipe__images">
          <img src={recipe.images[0]} alt={recipe.title} />
        </section>
        <section className="recipe__details">
          <h1 className="recipe__title">{recipe.title}</h1>
          <p className="recipe__description">{recipe.description}</p>
          <section className="recipe__ingredients">
            <h2 className="section-heading">Ingredients</h2>
            <IngredientList ingredients={recipe.ingredients} />
          </section>
          <section className="recipe__steps">
            <h2 className="section-heading">Steps</h2>
            <Steps steps={recipe.steps}/>
          </section>
        </section>
      </div>
    </section>
  );
}