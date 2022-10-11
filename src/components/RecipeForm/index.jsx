import { useState } from 'react';

export default function RecipeForm() {
  const emptyInstruction = {
    instructionIndex: 0,
    title: '',
    text: '',
  }

  const emptyIngredient = {
    name: 'test',
    unit: 'kilogram',
    unitShort: 'kg',
    amount: 0,
  };
  
  // const [name, setName] = useState('');
  // const [description, setDescription] = useState('');
  // const [ingredients, setIngredients] = useState([emptyIngredient]);
  // const [instructions, setInstruction] = useState([emptyInstruction]);

  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    ingredients: [emptyIngredient],
    instructions: [emptyInstruction],
  });

  function addIngredient() {
    setRecipe({
      ...recipe,
      ingredients: [
        ...recipe.ingredients,
        emptyIngredient,
      ],
    });
  }

  // TODO: fix editing when there are multiple ingredients
  function handleIngredientChange(e) {
    const { ingredients } = { ...recipe };
    // const currentIngredients = ingredients;
    const { name, value } = e.target;
    const [propName, index] = name.split('-');

    const ingredient = ingredients[index];
    ingredient[propName] = value;

    if (propName === 'unit') {
      const optionIndex = e.nativeEvent.target.selectedIndex;
      ingredient.unitShort = e.nativeEvent.target[optionIndex].text;
      console.log(e.nativeEvent.target[optionIndex].text);
    }


    ingredients[index] = ingredient;

    setRecipe({...recipe, ingredients});

    console.log(recipe);
  }

  return (
    <>
      <h1>Add new recipe</h1>
      <form action="">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input id="title" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" />
        </div>
        <section className="form__ingredients">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => {
              return (
                <li key={index} className="form-group">
                  <input onChange={handleIngredientChange} name={`name-${index}`} type="text" value={ingredient.name} />
                  <input onChange={handleIngredientChange} name={`amount-${index}`} type="number" value={ingredient.amount} />
                  <select onChange={handleIngredientChange} name={`unit-${index}`} value={ingredient.unit}>
                    <option value="kilogram">kg</option>
                    <option value="gram">g</option>
                    <option value="liter">l</option>
                    <option value="milliliter">ml</option>
                  </select>
                </li>
              );
            })}
          </ul>
          <button onClick={addIngredient} type="button">
            Add ingredient
          </button>
        </section>

        {/* - ingredients
      - instructions
      - image */}
      </form>
    </>
  );
}
