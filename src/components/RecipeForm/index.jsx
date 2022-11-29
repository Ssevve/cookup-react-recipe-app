/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cx from 'classnames';
import { BsTrash2 } from 'react-icons/bs';
import { useForm, useFieldArray } from 'react-hook-form';

import styles from './recipeForm.module.css';

import ImageDropzone from '../ImageDropzone';
import ConfirmationButton from '../ConfirmationButton';

export default function RecipeForm({ recipe }) {
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState(recipe?.images || []);
  const [isFormClean, setIsFormClean] = useState(true);
  const [isEditingRecipe] = useState(!!recipe);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    watch,
  } = useForm(
    {
      mode: 'onChange',
      defaultValues: {
        name: recipe?.name || '',
        description: recipe?.description || '',
        dishType: recipe?.dishType || '',
        servings: recipe?.servings || '',
        difficulty: recipe?.difficulty || 'moderate',
        prepTime: recipe?.prepTime || { time: '', unit: 'minutes' },
        cookTime: recipe?.cookTime || { time: '', unit: 'minutes' },
        ingredients: recipe?.ingredients.map((ingredient) => ({ name: ingredient })) || [{ name: '' }],
        directions: recipe?.directions.map((direction) => ({ description: direction })) || [{ description: '' }],
      },
    },
  );
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
    const formData = new FormData();
    formData.append('recipe', JSON.stringify(data));
    formData.append('images', JSON.stringify(images));

    files.forEach((file) => {
      formData.append('files', file);
    });
    const url = `http://localhost:8000/recipes/${isEditingRecipe ? recipe._id : ''}`;
    const requestOptions = {
      method: isEditingRecipe ? 'PUT' : 'POST',
      body: formData,
      credentials: 'include',
    };

    try {
      const res = await fetch(url, requestOptions);
      const resData = await res.json();
      navigate(`/recipes/${resData._id}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const checkIsFormClean = () => {
    setIsFormClean(!isDirty && !files.length && images.length === recipe?.images.length);
  };

  useEffect(() => {
    checkIsFormClean();
  }, [files, images, watch()]);

  return (
    <form noValidate className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
      {/* NAME */}
      <div>
        <label className={styles.label} htmlFor="recipe-name">
          Recipe name
          <input
            {...register('name', {
              required: { value: true, message: 'Recipe name is required' },
              maxLength: { value: 70, message: 'Maximum length is 70' },
              validate: (value) => (value.trim() === '' ? 'Recipe name is required' : null),
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
              validate: (value) => (value.trim() === '' ? 'Recipe description is required' : null),
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
                      maxLength: { value: 100, message: 'Maximum length is 100' },
                      validate: (value) => (value.trim() === '' ? 'Ingredient is required' : null),
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
                      required: { value: true, message: 'Direction is required' },
                      validate: (value) => (value.trim() === '' ? 'Direction is required' : null),
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
      <ImageDropzone images={images} setImages={setImages} files={files} setFiles={setFiles} />

      <button
        className={cx(styles.btn, styles.btnSubmit)}
        type="submit"
      >
        {isEditingRecipe ? 'Save' : 'Add recipe'}
      </button>
      {isEditingRecipe && (
        <ConfirmationButton
          text="Cancel"
          confirmText="Discard changes?"
          callback={() => navigate(-1)}
          bypassConfirmation={isFormClean}
        />
      )}
    </form>
  );
}
