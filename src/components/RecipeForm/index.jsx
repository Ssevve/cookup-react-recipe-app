/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';

import './style.css';

import ImageUpload from '../ImageUpload';

export default function RecipeForm({ recipe }) {
  const [editingRecipe] = useState(recipe);
  const navigate = useNavigate();
  const [file, setFile] = useState(undefined);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
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

  const onSubmit = async (data) => {
    trigger();
    const formData = new FormData();

    formData.append('recipe', JSON.stringify(data));
    formData.append('image', file);

    const url = `http://localhost:8000/api/recipes/${editingRecipe ? editingRecipe._id : ''}`;
    const requestOptions = {
      method: editingRecipe ? 'PUT' : 'POST',
      body: formData,
      credentials: 'include',
    };

    try {
      await fetch(url, requestOptions);
      navigate('/dashboard');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const requiredField = {
    required: { value: true, message: 'Required field' },
  };

  useEffect(() => {
    if (editingRecipe) {
      setValue('title', editingRecipe.title);
      setValue('description', editingRecipe.description);
      setValue('ingredients', editingRecipe.ingredients);
      setValue('instructions', editingRecipe.instructions);
    }
  }, []);

  return (
    <form
      noValidate
      className="recipe-form justify-content-center"
      onSubmit={handleSubmit(onSubmit)}
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
            {...register('description', requiredField, { value: editingRecipe?.description || '' })}
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
                      <option value="kilogram">kilogram</option>
                      <option value="gram">gram</option>
                      <option value="liter">liter</option>
                      <option value="milliliter">milliliter</option>
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
      <ImageUpload
        onChange={(e) => setFile(() => e.target?.files[0])}
        src={file ? URL.createObjectURL(file) : editingRecipe?.imageUrl}
      />

      <button className="btn btn--cta" type="submit">
        {editingRecipe ? 'Save' : 'Add Recipe'}
      </button>
    </form>
  );
}

RecipeForm.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

RecipeForm.defaultProps = {
  recipe: null,
};
