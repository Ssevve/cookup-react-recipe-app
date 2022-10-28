/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import './style.css';

export default function RecipeForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const {
    fields: ingredientFields,
    append: ingredientAppend,
    remove: ingredientRemove,
  } = useFieldArray({
    control,
    name: 'ingredients',
    rules: { minLength: 1 },
  });

  async function handleFormSubmit(e) {
    e.preventDefault();
    console.log('submit');
    console.log(`errors: ${JSON.stringify(errors)}`);
  }

  return (
    <form className="recipe-form justify-content-center" onSubmit={(e) => handleSubmit(handleFormSubmit(e))}>
      <div className="form-group">
        <label className="form__label" htmlFor="title">
          Recipe Title
          <input
            {...register('title', { required: true })}
            className="form__input"
            id="title"
            type="text"
            name="title"
          />
        </label>
        {errors.title && <span role="alert" className="form-error-message">Title is required</span>}
      </div>
      <div className="form-group">
        <label className="form__label" htmlFor="description">
          Recipe Description
          <textarea
            {...register('description', { required: true })}
            className="form__textarea"
            id="description"
            name="description"
          />
        </label>
        {errors.description && <span role="alert" className="form-error-message">Description is required</span>}
      </div>

      {/* INGREDIENTS */}
      <section className="form__ingredients flex-column">
        <h2 className="section-heading--small">Ingredients</h2>
        <ul>
          {ingredientFields.map((ingredient, index) => (
            <li key={ingredient.id}>
              <fieldset className="form__fieldset flex align-items-center">
                <legend className="form__legend">{`Ingredient ${index + 1}`}</legend>
                <div className="form-group">
                  <label className="form__label" htmlFor={`ingredients[${index}].name`}>
                    Name
                    <input
                      {...register(`ingredients[${index}].name`, { required: true })}
                      id={`ingredients[${index}].name`}
                      className="form__input"
                      name={`ingredients[${index}].name`}
                      type="text"
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label className="form__label" htmlFor={`ingredients[${index}].amount`}>
                    Amount
                    <input
                      {...register(`ingredients[${index}].amount`, { required: true, min: 0.1 })}
                      name={`ingredients[${index}].amount`}
                      id={`ingredients[${index}].amount`}
                      className="form__input"
                      type="number"
                      min="0.1"
                      step="0.1"
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label className="form__label" htmlFor={`ingredients[${index}].unit`}>
                    Unit
                    <select
                      {...register(`ingredients[${index}].unit`, { required: true })}
                      id={`ingredients[${index}].unit`}
                      className="select"
                      name={`ingredients[${index}].unit`}
                    >
                      <option value="kilogram">kg</option>
                      <option value="gram">g</option>
                      <option value="liter">l</option>
                      <option value="milliliter">ml</option>
                    </select>
                  </label>
                </div>
                <button
                  className="btn btn--delete align-self-end"
                  type="button"
                  onClick={() => ingredientRemove(index)}
                >
                  &#8722;
                </button>
              </fieldset>
            </li>
          ))}
        </ul>
        { errors?.ingredientFields?.root && <span role="alert" className="form-error-message">Lol</span>}
        <button
          className="btn btn--add align-self-end"
          onClick={() => ingredientAppend({ name: '', amount: 0, unit: 'kg' })}
          type="button"
        >
          {/* <FaPlus /> */}
          Add ingredient
        </button>
      </section>

      <button className="btn btn--cta" type="submit">
        Add Recipe
      </button>
    </form>
  );
}
