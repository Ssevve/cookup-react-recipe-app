/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cx from 'classnames';
import { useForm, useFieldArray } from 'react-hook-form';

import styles from './recipeForm.module.css';

export default function RecipeForm({ recipe }) {
  const [editingRecipe] = useState(recipe);
  const [file, setFile] = useState(undefined);
  const navigate = useNavigate();
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
    fields: directionFields,
    append: directionAppend,
    remove: directionRemove,
  } = useFieldArray({
    control,
    name: 'directions',
    rules: { required: { value: true, message: 'At least one direction is required' } },
  });

  const onSubmit = async (data) => {
    trigger();
    const formData = new FormData();

    formData.append('recipe', JSON.stringify(data));
    formData.append('image', file);

    // eslint-disable-next-line no-underscore-dangle
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

  useEffect(() => {
    if (editingRecipe) {
      setValue('title', editingRecipe.title);
      setValue('description', editingRecipe.description);
      setValue('ingredients', editingRecipe.ingredients);
      setValue('directions', editingRecipe.directions);
    } else {
      // ingredientAppend('');
      directionAppend({ title: '', description: '' });
    }
  }, []);

  return (
    <form noValidate className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {/* NAME */}
      <div>
        <label className={styles.label} htmlFor="recipe-name">
          Recipe name
          <input
            {...register('recipeName', {
              required: { value: true, message: 'Recipe name is required' },
            })}
            className={cx(styles.input, errors.recipeName && styles.error)}
            id="recipe-name"
            type="text"
            name="recipeName"
          />
        </label>
        <span role="alert" className={styles.errorMessage}>
          {errors?.recipeName?.message}
        </span>
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className={styles.label} htmlFor="recipe-description">
          Recipe description
          <textarea
            {...register('recipeDescription', {
              required: { value: true, message: 'Recipe description is required' },
            })}
            className={cx(styles.input, errors.recipeDescription && styles.error)}
            id="recipe-description"
            type="text"
            name="recipeDescription"
          />
        </label>
        <span role="alert" className={styles.errorMessage}>
          {errors?.recipeDescription?.message}
        </span>
      </div>

      {/* DISH TYPE */}
      <div className={styles.group}>
        <label className={styles.label} htmlFor="dish-type">
          Dish type
          <select defaultValue="" {...register('dishType')} className={styles.input} id="dish-type">
            <option disabled value="">
              -- Select one --
            </option>
            <option value="Main dish">Main dish</option>
            <option value="Side dish">Side dish</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Soup">Soup</option>
            <option value="Salad">Salad</option>
            <option value="Dessert">Dessert</option>
            <option value="Drink">Drink</option>
          </select>
        </label>
      </div>

      {/* PREPARATION TIME */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Preparation time</legend>
        <div>
          <label className={styles.label} htmlFor="preparation-time">
            Time
            <input
              {...register('preparationTime', {
                required: { value: true, message: 'Preparation time is required' },
                pattern: { value: /^[0-9]*$/gi, message: 'Invalid format' },
              })}
              className={cx(styles.input, errors.preparationTime && styles.error)}
              type="number"
              name="preparationTime"
              id="preparation-time"
            />
          </label>
          <span role="alert" className={styles.errorMessage}>
            {errors?.preparationTime?.message}
          </span>
        </div>
        <div>
          <label className={styles.label} htmlFor="preparation-unit">
            Unit
            <select
              defaultValue="minutes"
              {...register('preparationTimeUnit')}
              className={styles.input}
              name="preparationTimeUnit"
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
              {...register('cookingTime', {
                required: { value: true, message: 'Cooking time is required' },
              })}
              className={cx(styles.input, errors.cookingTime && styles.error)}
              type="number"
              id="cooking-time"
              name="cookingTime"
              title="Cooking time"
            />
          </label>
          <span role="alert" className={styles.errorMessage}>
            {errors?.cookingTime?.message}
          </span>
        </div>
        <div>
          <label className={styles.label} htmlFor="cooking-unit">
            Unit
            <select
              value
              {...register('cookingTimeUnit')}
              className={styles.input}
              id="cooking-unit"
              title="Cooking time unit"
              name="cookingTimeUnit"
            >
              <option value="minutes">minutes</option>
              <option value="hours">hours</option>
            </select>
          </label>
        </div>
      </fieldset>

      {/* SERVINGS */}
      <div className={styles.servings}>
        <label className={styles.label} htmlFor="servings">
          No. of servings
          <input
            {...register('servings', {
              required: { value: true, message: 'No. of servings is required' },
            })}
            className={cx(styles.input, errors.servings && styles.error)}
            id="servings"
            type="number"
            name="recipeDescription"
          />
        </label>
        <span role="alert" className={styles.errorMessage}>
          {errors?.servings?.message}
        </span>
      </div>

      {/* DIFFICULTY */}

      {/* INGREDIENTS */}
      {/* <section className={styles.ingredients}>
        <h2 className={styles.sectionHeading}>Ingredients</h2>
        {errors?.ingredients?.root && (
          <span role="alert" className={styles.errorMessage}>
            {errors?.ingredients?.root.message}
          </span>
        )}
        <ul>
          {ingredientFields.map((ingredient, index) => (
            <li key={ingredient.id}>
              <Input
                label={`Ingredient ${index + 1}`}
                name={`ingredients[${index}]`}
                register={register}
                validationRules={requiredField}
                error={errors.ingredients?.[index]}
              />
              <Button
                className={styles.btnDelete}
                onClick={() => ingredientRemove(index)}
                text="&#8722;"
              />
            </li>
          ))}
        </ul>
        <Button
          className={styles.btnAdd}
          onClick={() => ingredientAppend('')}
          text="Add ingredient"
        />
      </section> */}

      {/* DIRECTIONS */}
      {/* <section className={styles.directions}>
        <h2 className={styles.sectionHeading}>Directions</h2>
        {errors?.directions?.root && (
          <span role="alert" className={styles.errorMessage}>
            {errors?.directions?.root.message}
          </span>
        )}
        <ul>
          {directionFields.map((direction, index) => (
            <li key={direction.id}>
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>{`Direction ${index + 1}`}</legend>
                <Input
                  label="Title"
                  name={`directions[${index}].title`}
                  register={register}
                  validationRules={requiredField}
                  error={errors?.directions?.[index]?.title}
                />
                <Textarea
                  label="Description"
                  name={`directions[${index}].description`}
                  register={register}
                  validationRules={requiredField}
                  error={errors?.directions?.[index]?.description}
                />
                <Button
                  className={styles.btnDelete}
                  onClick={() => directionRemove(index)}
                  text="&#8722;"
                />
              </fieldset>
            </li>
          ))}
        </ul>
        <Button
          className={styles.btnAdd}
          onClick={() => directionAppend({ title: '', description: '' })}
          text="Add direction"
        />
      </section> */}
      {/* <ImageUpload
        onChange={(e) => setFile(() => e.target?.files[0])}
        src={file ? URL.createObjectURL(file) : editingRecipe?.imageUrl}
      />
      <Button type="submit" text={editingRecipe ? 'Save' : 'Add Recipe'} />
      <Button onClick={() => navigate(-1)} text={editingRecipe ? 'Cancel' : 'Go back'} /> */}
    </form>
  );
}
