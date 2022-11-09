/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';

import styles from './recipeForm.module.css';

import Button from '../Button';
import { Input, Textarea, Select } from '../FormFields';
import ImageUpload from '../ImageUpload';

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

  const requiredField = {
    required: { value: true, message: 'Required field' },
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
    <form noValidate className={styles.recipeForm} onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Recipe title"
        name="title"
        register={register}
        validationRules={requiredField}
        error={errors.title}
      />
      <Textarea
        label="Recipe description"
        name="description"
        register={register}
        validationRules={requiredField}
        error={errors.description}
      />
      <Select register={register} label="Dish type" name="type" options={['Main dish', 'Side dish', 'Appetizer', 'Soup', 'Salad', 'Dessert', 'Drink']} />
      <fieldset className={styles.fieldset}>
        <legend>Preparation time</legend>
        <Input name="preparation-time" register={register} title="Preparation time" />
        <Select name="preparation-unit" register={register} title="Preparation time unit" options={['minutes', 'hours']} />
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend>Cooking time</legend>
        <Input name="cooking-time" register={register} title="Cooking time" />
        <Select name="cooking-time-unit" register={register} title="Cooking time unit" options={['minutes', 'hours']} />
      </fieldset>

      {/* INGREDIENTS */}
      <section className={styles.ingredients}>
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
      </section>

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
      <ImageUpload
        onChange={(e) => setFile(() => e.target?.files[0])}
        src={file ? URL.createObjectURL(file) : editingRecipe?.imageUrl}
      />
      <Button type="submit" text={editingRecipe ? 'Save' : 'Add Recipe'} />
      <Button onClick={() => navigate(-1)} text={editingRecipe ? 'Cancel' : 'Go back'} />
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
