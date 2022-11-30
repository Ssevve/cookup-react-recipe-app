/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import signup from '../../lib/signup';

import styles from './signupPage.module.css';

import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import ErrorBox from '../../components/ErrorBox';
import Form from '../../components/Form';
import Label from '../../components/Label';
import { Input } from '../../components/FormFields';
import ErrorMessage from '../../components/ErrorMessage';
import { SubmitButton } from '../../components/Buttons';

export default function SignupPage() {
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
    <PageContainer>
      <section className={styles.formSection}>
        <PageTitle>Sign up</PageTitle>
        <p className={styles.existingUser}>
          Existing user?
          <Link className={styles.link} to="/login">
            Log in
          </Link>
        </p>
        {responseErrors && <ErrorBox message={responseErrors} />}
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <div>
            <Label htmlFor="firstName">
              First name
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
            <Label htmlFor="lastName">
              Last name
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
            <Label htmlFor="email">
              Email
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
            <Label htmlFor="password">
              Password
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
            <Label htmlFor="confirmPassword">
              Confirm password
              <Input
                register={register}
                validationRules={{
                  required: { value: true, message: 'You need to confirm the password' },
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
      </section>
      <section className={styles.signupImage} />
    </PageContainer>
  );
}
