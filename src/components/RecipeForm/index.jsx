/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cx from 'classnames';
import { BsTrash2 } from 'react-icons/bs';
import { useForm, useFieldArray, Controller } from 'react-hook-form';

import styles from './recipeForm.module.css';

import Form from '../Form';
import Label from '../Label';
import { Input, Textarea, Select } from '../FormFields';
import { Button, SubmitButton } from '../Buttons';
import ImageDropzone from '../ImageDropzone';
import ConfirmationButton from '../ConfirmationButton';
import ErrorMessage from '../ErrorMessage';

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
        servings: recipe?.servings || 0,
        difficulty: recipe?.difficulty || 'moderate',
        prepTime: recipe?.prepTime || { time: 0, unit: 'minutes' },
        cookTime: recipe?.cookTime || { time: 0, unit: 'minutes' },
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
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <Label htmlFor="name">
          Recipe name
          <Input
            register={register}
            validationRules={{
              required: { value: true, message: 'Recipe name is required' },
              maxLength: { value: 70, message: 'Maximum length is 70' },
              validate: (value) => (value.trim() === '' ? 'Recipe name is required' : null),
            }}
            name="name"
            error={errors.name}
            type="text"
          />
        </Label>
        <ErrorMessage message={errors?.name?.message} />
      </div>
      <div>
        <Label htmlFor="description">
          Recipe description
          <Textarea
            register={register}
            validationRules={{
              required: { value: true, message: 'Recipe description is required' },
              validate: (value) => (value.trim() === '' ? 'Recipe description is required' : null),
            }}
            name="description"
            error={errors.description}
          />
        </Label>
        <ErrorMessage message={errors?.description?.message} />
      </div>
      <div>
        <Label htmlFor="dishType">
          Dish type
          <Select
            name="dishType"
            options={['Main dish', 'Side dish', 'Appetizer', 'Soup', 'Salad', 'Dessert', 'Drink']}
            register={register}
            validationRules={{
              required: { value: true, message: 'Dish type is required' },
            }}
            error={errors.dishType}
          />
        </Label>
        <ErrorMessage message={errors?.dishType?.message} />
      </div>
      <div>
        <Label htmlFor="servings">
          No. of servings
          <Input
            register={register}
            validationRules={{
              required: { value: true, message: 'No. of servings is required' },
              min: { value: 1, message: 'Minimum value is 1' },
              step: 1,
              valueAsNumber: true,
              validate: (value) => (!Number.isInteger(value) ? 'Decimals not allowed' : null),
            }}
            name="servings"
            error={errors.servings}
            type="number"
          />
        </Label>
        <ErrorMessage message={errors?.servings?.message} />
      </div>
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
        {errors?.ingredients?.root && <ErrorMessage message={errors?.ingredients?.root.message} />}
        <ul>
          {ingredientFields.map((ingredient, index) => (
            <li className={styles.listItem} key={ingredient.id}>
              <Label htmlFor={`ingredients.${index}.name`}>
                {`Ingredient ${index + 1}`}
                <div className={styles.listGroup}>
                  <Input
                    register={register}
                    validationRules={{
                      required: { value: true, message: 'Ingredient is required' },
                      maxLength: { value: 100, message: 'Maximum length is 100' },
                      validate: (value) => (value.trim() === '' ? 'Ingredient is required' : null),
                    }}
                    name={`ingredients.${index}.name`}
                    error={errors?.ingredients?.[index]?.name}
                    type="text"
                    className={styles.listGroupInput}
                  />
                  <Button noPaddingBlock variant="delete" onClick={() => ingredientRemove(index)}>
                    <BsTrash2 size={24} />
                  </Button>
                </div>
              </Label>
              <ErrorMessage message={errors?.ingredients?.[index]?.name.message} />
            </li>
          ))}
        </ul>
        <Button variant="outline" onClick={() => ingredientAppend({ name: '' })}>
          Add ingredient
        </Button>
      </fieldset>
      {/* DIRECTIONS */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Directions</legend>
        {errors?.directions?.root && <ErrorMessage message={errors?.directions?.root.message} />}
        <ul>
          {directionFields.map((direction, index) => (
            <li className={styles.listItem} key={direction.id}>
              <Label htmlFor={`directions.${index}.description`}>
                {`Step ${index + 1}`}
                <div className={styles.listGroup}>
                  <Textarea
                    register={register}
                    validationRules={{
                      required: { value: true, message: 'Direction is required' },
                      validate: (value) => (value.trim() === '' ? 'Direction is required' : null),
                    }}
                    name={`directions.${index}.description`}
                    error={errors?.directions?.[index]?.description}
                    className={styles.listGroupInput}
                  />
                  <Button noPaddingBlock variant="delete" onClick={() => directionRemove(index)}>
                    <BsTrash2 size={24} />
                  </Button>
                </div>
              </Label>
              <ErrorMessage message={errors?.directions?.[index]?.description.message} />
            </li>
          ))}
        </ul>
        <Button variant="outline" onClick={() => directionAppend({ description: '' })}>
          Add direction
        </Button>
      </fieldset>

      <h2 className={styles.sectionHeading}>Images</h2>
      <ImageDropzone images={images} setImages={setImages} files={files} setFiles={setFiles} />

      <SubmitButton>{isEditingRecipe ? 'Save' : 'Add recipe'}</SubmitButton>
      {isEditingRecipe && (
        <ConfirmationButton
          text="Cancel"
          confirmText="Discard changes?"
          callback={() => navigate(-1)}
          bypassConfirmation={isFormClean}
        />
      )}
    </Form>
  );
}
