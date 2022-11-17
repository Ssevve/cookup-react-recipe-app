/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cx from 'classnames';
import { BsTrash2 } from 'react-icons/bs';
// import { AiOutlineCloudUpload } from 'react-icons/ai';
// import Dropzone from 'react-dropzone';
import { useForm, useFieldArray } from 'react-hook-form';

import styles from './recipeForm.module.css';

import ImageDropzone from '../ImageDropzone';

export default function RecipeForm({ recipe }) {
  const [images, setImages] = useState([]);
  const [editingRecipe] = useState(recipe);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    setFocus,
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
    fields: directionFields,
    append: directionAppend,
    remove: directionRemove,
  } = useFieldArray({
    control,
    name: 'directions',
    rules: { required: { value: true, message: 'At least one direction is required' } },
  });

  const handleFormSubmit = async (data) => {
    // trigger();
    console.table(`data: ${data}`);
    console.log(`images: ${images}`);
    const formData = new FormData();

    formData.append('recipe', JSON.stringify(data));
    images.forEach((image) => {
      formData.append('images', image);
    });
    // eslint-disable-next-line no-underscore-dangle
    const url = `http://localhost:8000/recipes/${editingRecipe ? editingRecipe._id : ''}`;
    const requestOptions = {
      method: editingRecipe ? 'PUT' : 'POST',
      body: formData,
      credentials: 'include',
    };

    try {
      await fetch(url, requestOptions);
      // navigate('/dashboard');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    if (editingRecipe) {
      setValue('title', editingRecipe.title);
      setValue('description', editingRecipe.description);
      setValue('ingredients', editingRecipe.ingredients);
      setValue('directions', editingRecipe.directions);
    } else {
      ingredientAppend({ name: '' }, { shouldFocus: false });
      directionAppend({ description: '' }, { shouldFocus: false });
    }

    setFocus('name');
  }, []);

  const stringPattern = {
    value: /^[^\s]+(?:$|.*[^\s]+$)/,
    message: 'Trailing white space no allowed',
  };

  return (
    <form noValidate className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
      {/* NAME */}
      <div>
        <label className={styles.label} htmlFor="recipe-name">
          Recipe name
          <input
            {...register('name', {
              required: { value: true, message: 'Recipe name is required' },
              pattern: stringPattern,
            })}
            aria-invalid={errors.name ? 'true' : 'false'}
            className={cx(styles.input, errors.name && styles.error)}
            id="recipe-name"
            type="text"
          />
        </label>
        <span role="alert" className={styles.errorMessage}>
          {errors?.name?.message}
        </span>
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className={styles.label} htmlFor="recipe-description">
          Recipe description
          <textarea
            {...register('description', {
              required: { value: true, message: 'Recipe description is required' },
              pattern: stringPattern,
            })}
            aria-invalid={errors.description ? 'true' : 'false'}
            className={cx(styles.input, errors.description && styles.error)}
            id="recipe-description"
            type="text"
          />
        </label>
        <span role="alert" className={styles.errorMessage}>
          {errors?.description?.message}
        </span>
      </div>

      {/* DISH TYPE */}
      <div>
        <label className={styles.label} htmlFor="dish-type">
          Dish type
          <select
            defaultValue=""
            {...register('dishType', {
              required: { value: true, message: 'Dish type is required' },
            })}
            aria-invalid={errors.dishType ? 'true' : 'false'}
            className={cx(styles.input, errors.dishType && styles.error)}
            id="dish-type"
          >
            <option disabled value="">
              -- Select one --
            </option>
            <option value="main dish">Main dish</option>
            <option value="side dish">Side dish</option>
            <option value="appetizer">Appetizer</option>
            <option value="soup">Soup</option>
            <option value="salad">Salad</option>
            <option value="dessert">Dessert</option>
            <option value="drink">Drink</option>
          </select>
        </label>
        <span role="alert" className={styles.errorMessage}>
          {errors?.dishType?.message}
        </span>
      </div>

      {/* SERVINGS */}
      <div>
        <label className={styles.label} htmlFor="servings">
          No. of servings
          <input
            {...register('servings', {
              required: { value: true, message: 'No. of servings is required' },
              min: { value: 1, message: 'Minimum value is 1' },
              step: 1,
              valueAsNumber: true,
              validate: (value) => (!Number.isInteger(value) ? 'Decimals not allowed' : null),
            })}
            aria-invalid={errors.servings ? 'true' : 'false'}
            className={cx(styles.input, errors.servings && styles.error)}
            id="servings"
            type="number"
          />
        </label>
        <span role="alert" className={styles.errorMessage}>
          {errors?.servings?.message}
        </span>
      </div>

      {/* DIFFICULTY */}
      <fieldset className={cx(styles.fieldset, styles.difficultyFieldset)}>
        <legend className={styles.legend}>Difficulty</legend>
        <div>
          <label className={cx(styles.label, styles.radioLabel)} htmlFor="easy">
            <input
              {...register('difficulty')}
              className={styles.radioInput}
              type="radio"
              id="easy"
              value="easy"
            />
            <span className={styles.radioSpan}>Easy</span>
          </label>
        </div>
        <div>
          <label className={cx(styles.label, styles.radioLabel)} htmlFor="moderate">
            <input
              {...register('difficulty')}
              defaultChecked
              className={styles.radioInput}
              type="radio"
              id="moderate"
              value="moderate"
            />
            <span className={styles.radioSpan}>Moderate</span>
          </label>
        </div>
        <div>
          <label className={cx(styles.label, styles.radioLabel)} htmlFor="hard">
            <input
              {...register('difficulty')}
              className={styles.radioInput}
              type="radio"
              id="hard"
              value="hard"
            />
            <span className={styles.radioSpan}>Hard</span>
          </label>
        </div>
      </fieldset>

      {/* PREPARATION TIME */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Preparation time</legend>
        <div>
          <label className={styles.label} htmlFor="preparation-time">
            Time
            <input
              {...register('prepTime.time', {
                required: { value: true, message: 'Preparation time is required' },
                min: { value: 1, message: 'Minimum value is 1' },
                max: { value: 59, message: 'Maximum value is 59' },
                step: 1,
                valueAsNumber: true,
                validate: (value) => (!Number.isInteger(value) ? 'Decimals not allowed' : null),
              })}
              aria-invalid={errors?.prepTime?.time ? 'true' : 'false'}
              className={cx(styles.input, errors?.prepTime?.time && styles.error)}
              type="number"
              id="preparation-time"
            />
          </label>
          <span role="alert" className={styles.errorMessage}>
            {errors?.prepTime?.time?.message}
          </span>
        </div>
        <div>
          <label className={styles.label} htmlFor="preparation-unit">
            Unit
            <select
              defaultValue="minutes"
              {...register('prepTime.unit')}
              className={styles.input}
              id="preparation-unit"
            >
              <option value="minutes">minutes</option>
              <option value="hours">hours</option>
            </select>
          </label>
        </div>
      </fieldset>

      {/* COOKING TIME */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Cooking time</legend>
        <div>
          <label className={styles.label} htmlFor="cooking-time">
            Time
            <input
              {...register('cookTime.time', {
                required: { value: true, message: 'Cooking time is required' },
                min: { value: 1, message: 'Minimum value is 1' },
                max: { value: 59, message: 'Maximum value is 59' },
                step: 1,
                valueAsNumber: true,
                validate: (value) => (!Number.isInteger(value) ? 'Decimals not allowed' : null),
              })}
              aria-invalid={errors?.cookTime?.time ? 'true' : 'false'}
              className={cx(styles.input, errors?.cookTime?.time && styles.error)}
              type="number"
              id="cooking-time"
              title="Cooking time"
            />
          </label>
          <span role="alert" className={styles.errorMessage}>
            {errors?.cookTime?.time?.message}
          </span>
        </div>
        <div>
          <label className={styles.label} htmlFor="cooking-unit">
            Unit
            <select
              defaultValue="minutes"
              {...register('cookTime.unit')}
              className={styles.input}
              id="cooking-unit"
              title="Cooking time unit"
            >
              <option value="minutes">minutes</option>
              <option value="hours">hours</option>
            </select>
          </label>
        </div>
      </fieldset>

      {/* INGREDIENTS */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Ingredients</legend>
        {errors?.ingredients?.root && (
          <span role="alert" className={styles.errorMessage}>
            {errors?.ingredients?.root.message}
          </span>
        )}
        <ul>
          {ingredientFields.map((ingredient, index) => (
            <li className={styles.listItem} key={ingredient.id}>
              <label className={styles.label} htmlFor={`ingredients${index}`}>
                {`Ingredient ${index + 1}`}
                <div className={styles.listGroup}>
                  <input
                    {...register(`ingredients.${index}.name`, {
                      required: { value: true, message: 'Ingredient is required' },
                      pattern: stringPattern,
                    })}
                    aria-invalid={errors?.ingredients?.[index]?.name ? 'true' : 'false'}
                    className={cx(
                      styles.input,
                      styles.listGroupInput,
                      errors?.ingredients?.[index]?.name && styles.error,
                    )}
                    type="text"
                    id={`ingredients${index}`}
                  />
                  <button
                    type="button"
                    className={cx(styles.btn, styles.btnDelete)}
                    onClick={() => ingredientRemove(index)}
                  >
                    <BsTrash2 />
                  </button>
                </div>
              </label>
              <span role="alert" className={styles.errorMessage}>
                {errors?.ingredients?.[index]?.name.message}
              </span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={cx(styles.btn, styles.btnAdd)}
          onClick={() => ingredientAppend({ name: '' })}
        >
          Add ingredient
        </button>
      </fieldset>

      {/* DIRECTIONS */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Directions</legend>
        {errors?.directions?.root && (
          <span role="alert" className={styles.errorMessage}>
            {errors?.directions?.root.message}
          </span>
        )}
        <ul>
          {directionFields.map((direction, index) => (
            <li className={styles.listItem} key={direction.id}>
              <label className={styles.label} htmlFor={`directions${index}`}>
                {`Step ${index + 1}`}
                <div className={styles.listGroup}>
                  <textarea
                    {...register(`directions.${index}.description`, {
                      required: { value: true, message: 'Description is required' },
                      pattern: stringPattern,
                    })}
                    aria-invalid={errors?.directions?.[index]?.description ? 'true' : 'false'}
                    className={cx(
                      styles.input,
                      styles.listGroupInput,
                      errors?.directions?.[index]?.description && styles.error,
                    )}
                    type="text"
                    id={`directions${index}`}
                  />
                  <button
                    type="button"
                    className={cx(styles.btn, styles.btnDelete)}
                    onClick={() => directionRemove(index)}
                  >
                    <BsTrash2 />
                  </button>
                </div>
              </label>
              <span role="alert" className={styles.errorMessage}>
                {errors?.directions?.[index]?.description.message}
              </span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={cx(styles.btn, styles.btnAdd)}
          onClick={() => directionAppend({ description: '' })}
        >
          Add direction
        </button>
      </fieldset>

      {/* IMAGE */}
      <h2 className={styles.sectionHeading}>Images</h2>
      <ImageDropzone images={images} setImages={setImages} />

      <button onClick={() => console.log(errors)} className={cx(styles.btn, styles.btnSubmit)} type="submit">
        {editingRecipe ? 'Save' : 'Add recipe'}
      </button>
    </form>
  );
}
