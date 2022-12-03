import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import login from '../../lib/login';

import ErrorBox from '../ErrorBox';
import Form from '../Form';
import Label from '../Label';
import { Input } from '../FormFields';
import { SubmitButton } from '../Buttons';

export default function LoginForm({ setUser }) {
  const [responseError, setResponseError] = useState('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit' });

  async function handleFormSubmit(data) {
    try {
      const res = await login(data);
      const resData = await res.json();

      if (res.status === 400 || res.status === 401) setResponseError(resData.message);
      else if (res.status === 404) setResponseError('Something went wrong.');
      else if (res.status === 500) setResponseError('Server error.');

      if (resData.user) {
        setUser(resData.user);
        navigate(`/profile/${resData.user.id}`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {(errors.email || errors.password || responseError) && (
        <ErrorBox message={responseError || 'Invalid email or password'} />
      )}
      <Form highGap onSubmit={handleSubmit(handleFormSubmit)}>
        <Label htmlFor="email" text="Email">
          <Input
            register={register}
            validationRules={{
              required: true,
              pattern:
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
            }}
            name="email"
            label="Email"
            type="email"
          />
        </Label>
        <Label htmlFor="password" text="Password">
          <Input
            register={register}
            validationRules={{
              required: true,
              minLength: 8,
            }}
            name="password"
            label="Password"
            type="password"
          />
        </Label>
        <SubmitButton>Log in</SubmitButton>
      </Form>
    </>
  );
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
};
