import { useState } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';

import './style.css';

import ImageUpload from '../ImageUpload';

export default function RecipeForm() {
  const [image, setImage] = useState({ preview: '', data: null });
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

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('recipe', JSON.stringify(recipe));
    formData.append('image', image.data);

    const url = 'http://localhost:8000/api/recipes';
    const requestOptions = {
      method: 'POST',
      body: formData,
    };

    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      className="form flex justify-content-sb"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="col-1-2">
        <div className="form-group">
          <label className="form__label" htmlFor="title">
            Recipe Title
          </label>
          <input
            className="form__input"
            onChange={(e) => handleChange(e)}
            id="title"
            type="text"
            name="title"
          />
        </div>
        <div className="form-group">
          <label className="form__label" htmlFor="description">
            Recipe Description
          </label>
          <textarea
            className="form__textarea"
            onChange={(e) => handleChange(e)}
            id="description"
            name="description"
          />
        </div>
        <section className="form__ingredients flex-column">
          <h2 className="section-heading--small">Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => {
              return (
                <li key={index}>
                  <fieldset className="form__fieldset flex align-items-center">
                    <legend className="form__legend">{`Ingredient ${
                      index + 1
                    }`}</legend>
                    <div className="form-group">
                      <label
                        className="form__label"
                        htmlFor={`ingredient-${index}-name`}
                      >
                        Name
                      </label>
                      <input
                        id={`ingredient-${index}-name`}
                        className="form__input"
                        onChange={(e) => handleChange(e)}
                        name={`ingredients-name-${index}`}
                        type="text"
                        value={ingredient.name}
                      />
                    </div>
                    <div className="form-group">
                      <label
                        className="form__label"
                        htmlFor={`ingredient-${index}-amount`}
                      >
                        Amount
                      </label>
                      <input
                        id={`ingredient-${index}-amount`}
                        className="form__input"
                        onChange={(e) => handleChange(e)}
                        name={`ingredients-amount-${index}`}
                        type="number"
                        value={ingredient.amount}
                        min="0"
                        step="0.1"
                      />
                    </div>
                    <div className="form-group">
                      <label
                        className="form__label"
                        htmlFor={`ingredient-${index}-unit`}
                      >
                        Unit
                      </label>
                      <select
                        id={`ingredient-${index}-unit`}
                        className="select"
                        onChange={(e) => handleChange(e)}
                        name={`ingredients-unit-${index}`}
                        value={ingredient.unit}
                      >
                        <option value="kilogram">kg</option>
                        <option value="gram">g</option>
                        <option value="liter">l</option>
                        <option value="milliliter">ml</option>
                      </select>
                    </div>
                    <button
                      className="btn btn--delete align-self-end"
                      type="button"
                      onClick={() => deleteIngredient(index)}
                    >
                      <FaTrash />
                    </button>
                  </fieldset>
                </li>
              );
            })}
          </ul>
          <button
            className="btn btn--add align-self-end"
            onClick={addIngredient}
            type="button"
          >
            <FaPlus />
            Add ingredient
          </button>
        </section>
        <section className="form__instructions flex-column">
          <h2 className="section-heading--small">Instructions</h2>
          <ul>
            {recipe.instructions.map((instruction, index) => {
              return (
                <li key={index}>
                  <fieldset className="form__fieldset instruction-group">
                    <legend className="form__legend">{`Instruction ${
                      index + 1
                    }`}</legend>
                    <div className="form-group">
                    <label
                      className="form__label"
                      htmlFor={`instruction-${index}-title`}
                    >
                      Title
                    </label>
                    <input
                      id={`instruction-${index}-title`}
                      className="form__input"
                      onChange={(e) => handleChange(e)}
                      name={`instructions-title-${index}`}
                      type="text"
                      value={instruction.title}
                    />
                    </div>
                    <div className="form-group">
                    <label
                      className="form__label"
                      htmlFor={`instruction-${index}-description`}
                    >
                      Description
                    </label>
                    <textarea
                      id={`instruction-${index}-description`}
                      className="form__textarea"
                      onChange={(e) => handleChange(e)}
                      name={`instructions-text-${index}`}
                      type="text"
                      value={instruction.text}
                    />
                    </div>
                    <button
                      className="btn btn--delete align-self-end"
                      type="button"
                      onClick={() => deleteInstruction(index)}
                    >
                      <FaTrash />
                    </button>
                  </fieldset>
                </li>
              );
            })}
          </ul>
          <button
            className="btn btn--add align-self-end"
            onClick={addInstruction}
            type="button"
          >
            <FaPlus />
            Add instruction
          </button>
        </section>
      </div>
      <section className="col-1-2 flex-column align-items-end">
        <ImageUpload image={image} setImage={setImage} />
        <button className="btn btn--cta" type="submit">
          Add Recipe
        </button>
      </section>
    </form>
  );
}
