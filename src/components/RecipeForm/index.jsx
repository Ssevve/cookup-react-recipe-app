/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

import './style.css';

import ImageUpload from '../ImageUpload';

export default function RecipeForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    watch,
    setValue,
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
  const {
    fields: instructionFields,
    append: instructionAppend,
    remove: instructionRemove,
  } = useFieldArray({
    control,
    name: 'instructions',
    rules: { required: { value: true, message: 'At least one instruction is required' } },
  });

  const handleFormSubmit = async (e, data) => {
    e.preventDefault();
    trigger();
    console.log(data);
  };

  const requiredField = {
    required: { value: true, message: 'Required field' },
  };

  return (
    <form
      noValidate
      className="recipe-form justify-content-center"
      onSubmit={(e) => handleSubmit(handleFormSubmit(e))}
    >
      <div className="form-group">
        <label className="form__label" htmlFor="title">
          Recipe Title
          <input
            {...register('title', requiredField)}
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
            {...register('description', requiredField)}
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
                      {...register(`ingredients[${index}].name`, requiredField)}
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
                        ...requiredField,
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
        <button
          className="btn btn--add align-self-start"
          onClick={() => ingredientAppend({ name: '', amount: 0.1 })}
          type="button"
        >
          Add ingredient
        </button>
      </section>

      {/* INSTRUCTIONS */}
      <section className="form__ingredients flex-column">
        <h2 className="section-heading--small">Instructions</h2>
        {errors?.instructions?.root && (
          <span role="alert" className="form-error-message">
            {errors?.instructions?.root.message}
          </span>
        )}
        <ul>
          {instructionFields.map((instruction, index) => (
            <li key={instruction.id}>
              <fieldset className="form__fieldset flex align-items-center">
                <legend className="form__legend">{`Instruction ${index + 1}`}</legend>
                <div className="form-group">
                  <label className="form__label" htmlFor={`instructions[${index}].title`}>
                    Title
                    <input
                      {...register(`instructions[${index}].title`, requiredField)}
                      aria-invalid={errors.instructions?.[index]?.title ? 'true' : 'false'}
                      id={`instructions[${index}].title`}
                      className="form__input"
                      name={`instructions[${index}].title`}
                      type="text"
                    />
                  </label>
                  {errors.instructions?.[index]?.title && (
                    <span role="alert" className="form-error-message">
                      {errors.instructions?.[index]?.title.message}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form__label" htmlFor={`instructions[${index}].description`}>
                    Description
                    <textarea
                      {...register(`instructions[${index}].description`, requiredField)}
                      aria-invalid={errors.instructions?.[index]?.description ? 'true' : 'false'}
                      name={`instructions[${index}].description`}
                      id={`instructions[${index}].description`}
                      className="form__textarea"
                    />
                  </label>
                  {errors.instructions?.[index]?.description && (
                    <span role="alert" className="form-error-message">
                      {errors.instructions?.[index]?.description.message}
                    </span>
                  )}
                </div>
                <button
                  className="btn btn--delete"
                  type="button"
                  onClick={() => instructionRemove(index)}
                >
                  &#8722;
                </button>
              </fieldset>
            </li>
          ))}
        </ul>
        <button
          className="btn btn--add align-self-start"
          onClick={() => instructionAppend({ title: '', description: '' })}
          type="button"
        >
          Add Instruction
        </button>
      </section>
      <ImageUpload onChange={(e) => setValue('image', e.target.files)} src={watch('image')} />

      <button className="btn btn--cta" type="submit">
        Add Recipe
      </button>
    </form>
  );
}
