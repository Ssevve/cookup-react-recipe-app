/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';

import './style.css';

import Button from '../Button';
import { Input, Select, Textarea } from '../FormFields';
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
      setValue('instructions', editingRecipe.instructions);
    }
  }, []);

  return (
    <form
      noValidate
      className="recipe-form justify-content-center"
      onSubmit={handleSubmit(onSubmit)}
    >
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
                <Input
                  label="Name"
                  name={`ingredients[${index}].name`}
                  register={register}
                  validationRules={requiredField}
                  error={errors.ingredients?.[index]?.name}
                />
                <Input
                  label="Amount"
                  name={`ingredients[${index}].amount`}
                  register={register}
                  validationRules={{
                    ...requiredField,
                    min: { value: 0.1, message: 'Invalid amount' },
                  }}
                  error={errors.ingredients?.[index]?.amount}
                  type="number"
                  min="0.1"
                  step="0.1"
                />
                <Select
                  label="Unit"
                  register={register}
                  options={['kilogram', 'gram', 'liter', 'milliliter']}
                  name={`ingredients[${index}].unit`}
                />
                <Button className="btn--delete align-self-end" onClick={() => ingredientRemove(index)} text="&#8722;" />
              </fieldset>
            </li>
          ))}
        </ul>
        <Button className="btn--add align-self-start" onClick={() => ingredientAppend({ name: '', amount: 0.1, unit: 'kilogram' })} text="Add ingredient" />
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
                <Input
                  label="Title"
                  name={`instructions[${index}].title`}
                  register={register}
                  validationRules={requiredField}
                  error={errors?.instructions?.[index]?.title}
                />
                <Textarea
                  label="Description"
                  name={`instructions[${index}].description`}
                  register={register}
                  validationRules={requiredField}
                  error={errors?.instructions?.[index]?.description}
                />
                <Button className="btn--delete align-self-end" onClick={() => instructionRemove(index)} text="&#8722;" />
              </fieldset>
            </li>
          ))}
        </ul>
        <Button className="btn--add align-self-start" onClick={() => instructionAppend({ title: '', description: '' })} text="Add instruction" />
      </section>
      <ImageUpload
        onChange={(e) => setFile(() => e.target?.files[0])}
        src={file ? URL.createObjectURL(file) : editingRecipe?.imageUrl}
      />
      <Button className=" btn--cta" type="submit" text={editingRecipe ? 'Save' : 'Add Recipe'} />
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
