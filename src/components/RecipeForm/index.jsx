/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import './style.css';

export default function RecipeForm() {
  const [units, setUnits] = useState(undefined);
  const [fetchingUnits, setFetchingUnits] = useState(true);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
  } = useForm({ mode: 'onChange' });
  const {
    fields: ingredientFields,
    append: ingredientAppend,
    remove: ingredientRemove,
  } = useFieldArray({
    control,
    name: 'ingredients',
    rules: { required: { value: true, message: 'At least one ingredient is required' } },
  });

  const getUnits = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/units');
      const data = await res.json();
      console.log(`Data: ${data}`);
      setUnits(data);
      setFetchingUnits(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUnits();
  }, []);

  async function handleFormSubmit(e) {
    e.preventDefault();
    trigger();
  }

  return (
    !fetchingUnits && (
      <form
        noValidate
        className="recipe-form justify-content-center"
        onSubmit={(e) => handleSubmit(handleFormSubmit(e))}
      >
        <div className="form-group">
          <label className="form__label" htmlFor="title">
            Recipe Title
            <input
              {...register('title', { required: { value: true, message: 'Title is required' } })}
              aria-invalid={errors.title ? 'true' : 'false'}
              className="form__input"
              id="title"
              type="text"
              name="title"
            />
          </label>
          {errors.title && (
            <span role="alert" className="form-error-message">
              {errors.title.message}
            </span>
          )}
        </div>
        <div className="form-group">
          <label className="form__label" htmlFor="description">
            Recipe Description
            <textarea
              {...register('description', {
                required: { value: true, message: 'Description is required' },
              })}
              aria-invalid={errors.description ? 'true' : 'false'}
              className="form__textarea"
              id="description"
              name="description"
            />
          </label>
          {errors.description && (
            <span role="alert" className="form-error-message">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* INGREDIENTS */}
        <section className="form__ingredients flex-column">
          <h2 className="section-heading--small">Ingredients</h2>
          {errors?.ingredients?.root && (
            <span role="alert" className="form-error-message">
              {errors?.ingredients?.root.message}
            </span>
          )}
          <ul>
            {ingredientFields.map((ingredient, index) => (
              <li key={ingredient.id}>
                <fieldset className="form__fieldset flex align-items-center">
                  <legend className="form__legend">{`Ingredient ${index + 1}`}</legend>
                  <div className="form-group">
                    <label className="form__label" htmlFor={`ingredients[${index}].name`}>
                      Name
                      <input
                        {...register(`ingredients[${index}].name`, {
                          required: { value: true, message: 'Name is required' },
                        })}
                        aria-invalid={errors.ingredients?.[index]?.name ? 'true' : 'false'}
                        id={`ingredients[${index}].name`}
                        className="form__input"
                        name={`ingredients[${index}].name`}
                        type="text"
                      />
                    </label>
                    {errors.ingredients?.[index]?.name && (
                      <span role="alert" className="form-error-message">
                        {errors.ingredients?.[index]?.name.message}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form__label" htmlFor={`ingredients[${index}].amount`}>
                      Amount
                      <input
                        {...register(`ingredients[${index}].amount`, {
                          required: { value: true, message: 'Amount is required' },
                          min: { value: 0.1, message: 'Invalid amount' },
                        })}
                        aria-invalid={errors.ingredients?.[index]?.amount ? 'true' : 'false'}
                        name={`ingredients[${index}].amount`}
                        id={`ingredients[${index}].amount`}
                        className="form__input"
                        type="number"
                        min="0.1"
                        step="0.1"
                      />
                    </label>
                    {errors.ingredients?.[index]?.amount && (
                      <span role="alert" className="form-error-message">
                        {errors.ingredients?.[index]?.amount.message}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form__label" htmlFor={`ingredients[${index}].unit`}>
                      Unit
                      <select
                        {...register(`ingredients[${index}].unit`)}
                        id={`ingredients[${index}].unit`}
                        className="select"
                        name={`ingredients[${index}].unit`}
                      >
                        {Object.entries(units).map((unit) => (
                          <option key={unit[1]} value={unit[0]}>
                            {unit[1]}
                          </option>
                        ))}
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
          <button
            className="btn btn--add align-self-end"
            onClick={() => ingredientAppend({ name: '', amount: 0.1 })}
            type="button"
          >
            Add ingredient
          </button>
        </section>

        <button className="btn btn--cta" type="submit">
          Add Recipe
        </button>
      </form>
    )
  );
}
