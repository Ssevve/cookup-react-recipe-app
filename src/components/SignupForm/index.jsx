/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import signup from '../../lib/signup';

import ErrorBox from '../ErrorBox';
import Form from '../Form';
import Label from '../Label';
import { Input } from '../FormFields';
import ErrorMessage from '../ErrorMessage';
import { SubmitButton } from '../Buttons';

export default function SignupForm() {
  const [responseErrors, setResponseErrors] = useState(undefined);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  async function handleFormSubmit(data) {
    try {
      const res = await signup(data);
      const resData = await res.json();

      if (res.status === 400 || res.status === 409) setResponseErrors(resData.message);
      else if (res.status === 404) setResponseErrors({ message: 'Something went wrong.' });
      else if (res.status === 500) setResponseErrors({ message: 'Server error.' });
      else navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {responseErrors && <ErrorBox message={responseErrors} />}
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <div>
          <Label htmlFor="firstName" text="First name">
            <Input
              register={register}
              validationRules={{ required: { value: true, message: 'First name is required' } }}
              name="firstName"
              label="First name"
              error={errors?.firstName}
              type="text"
            />
          </Label>
          <ErrorMessage message={errors?.firstName?.message} />
        </div>
        <div>
          <Label htmlFor="lastName" text="Last name">
            <Input
              register={register}
              validationRules={{ required: { value: true, message: 'Last name is required' } }}
              name="lastName"
              label="Last name"
              error={errors?.lastName}
              type="text"
            />
          </Label>
          <ErrorMessage message={errors?.lastName?.message} />
        </div>
        <div>
          <Label htmlFor="email" text="Email">
            <Input
              register={register}
              validationRules={{
                required: { value: true, message: 'Email is required' },
                pattern: {
                  value:
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                  message: 'Incorrect email format',
                },
              }}
              name="email"
              label="Email"
              error={errors?.email}
              type="email"
            />
          </Label>
          <ErrorMessage message={errors?.email?.message} />
        </div>
        <div>
          <Label htmlFor="password" text="Password">
            <Input
              register={register}
              validationRules={{
                required: { value: true, message: 'Password is required' },
                minLength: {
                  value: 8,
                  message: 'Min. 8 characters required',
                },
              }}
              name="password"
              label="Password"
              type="password"
              error={errors?.password}
            />
          </Label>
          <ErrorMessage message={errors?.password?.message} />
        </div>
        <div>
          <Label htmlFor="confirmPassword" text="Confirm password">
            <Input
              register={register}
              validationRules={{
                required: { value: true, message: 'You need to confirm the password' },
                // eslint-disable-next-line consistent-return
                validate: (value) => {
                  if (watch('password') !== value) {
                    return 'Passwords do not match';
                  }
                },
                minLength: {
                  value: 8,
                  message: 'Min. 8 characters required',
                },
              }}
              name="confirmPassword"
              label="Confirm password"
              type="password"
              error={errors?.confirmPassword}
            />
          </Label>
          <ErrorMessage message={errors?.confirmPassword?.message} />
        </div>
        <SubmitButton>Sign up</SubmitButton>
      </Form>
    </>
  );
}
