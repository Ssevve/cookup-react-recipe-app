import { useState } from 'react';

export default function RecipeForm() {
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    ingredients: [
      {
        name: '',
        unit: 'kilogram',
        unitShort: 'kg',
        amount: 0,
      },
    ],
    instructions: [
      {
        title: '',
        text: '',
      },
    ],
  });

  function addIngredient() {
    setRecipe({
      ...recipe,
      ingredients: [
        ...recipe.ingredients,
        {
          name: '',
          unit: 'kilogram',
          unitShort: 'kg',
          amount: 0,
        },
      ],
    });
  }

  function deleteIngredient(index) {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients: newIngredients });
  }

  function addInstruction() {
    setRecipe({
      ...recipe,
      instructions: [
        ...recipe.instructions,
        {
          title: '',
          text: '',
        },
      ],
    });
  }

  function deleteInstruction(index) {
    const newInstructions = recipe.instructions.filter((_, i) => i !== index);
    setRecipe({ ...recipe, instructions: newInstructions });
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === 'title') setRecipe({ ...recipe, title: value });
    else if (name === 'description')
      setRecipe({ ...recipe, description: value });
    else {
      const [recipePropName, propName, index] = name.split('-');

      if (recipePropName === 'ingredients') {
        const ingredientList = [...recipe.ingredients];
        ingredientList[index][propName] = value;

        if (propName === 'unit') {
          const optionIndex = e.nativeEvent.target.selectedIndex;
          ingredientList[index]['unitShort'] =
            e.nativeEvent.target[optionIndex].text;
        }

        setRecipe({ ...recipe, ingredients: ingredientList });
      } else if (recipePropName === 'instructions') {
        const instructionList = [...recipe.instructions];
        instructionList[index][propName] = value;

        setRecipe({ ...recipe, instructions: instructionList });
      }
    }
  }

  return (
    <>
      <h1>Add new recipe</h1>
      <form action="">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            onChange={(e) => handleChange(e)}
            id="title"
            type="text"
            name="title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            onChange={(e) => handleChange(e)}
            id="description"
            name="description"
          />
        </div>
        <section className="form__ingredients">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => {
              return (
                <li key={index} className="form-group">
                  <input
                    onChange={(e) => handleChange(e)}
                    name={`ingredients-name-${index}`}
                    type="text"
                    value={ingredient.name}
                  />
                  <input
                    onChange={(e) => handleChange(e)}
                    name={`ingredients-amount-${index}`}
                    type="number"
                    value={ingredient.amount}
                  />
                  <select
                    onChange={(e) => handleChange(e)}
                    name={`ingredients-unit-${index}`}
                    value={ingredient.unit}
                  >
                    <option value="kilogram">kg</option>
                    <option value="gram">g</option>
                    <option value="liter">l</option>
                    <option value="milliliter">ml</option>
                  </select>
                  <button type="button" onClick={() => deleteIngredient(index)}>
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
          <button onClick={addIngredient} type="button">
            Add ingredient
          </button>
        </section>
        <section className="form__instructions">
          <h2>Instructions</h2>
          <ul>
            {recipe.instructions.map((instruction, index) => {
              return (
                <li key={index} className="form-group">
                  <input
                    onChange={(e) => handleChange(e)}
                    name={`instructions-title-${index}`}
                    type="text"
                    value={instruction.title}
                  />
                  <textarea
                    onChange={(e) => handleChange(e)}
                    name={`instructions-text-${index}`}
                    type="text"
                    value={instruction.text}
                  />
                  <button
                    type="button"
                    onClick={() => deleteInstruction(index)}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
          <button onClick={addInstruction} type="button">
            Add instruction
          </button>
        </section>
      </form>
    </>
  );
}
