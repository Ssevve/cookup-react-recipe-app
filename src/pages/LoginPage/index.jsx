/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import login from '../../lib/login';

import styles from './loginPage.module.css';

import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import ErrorBox from '../../components/ErrorBox';
import Form from '../../components/Form';
import { Input } from '../../components/FormFields';
import Button from '../../components/Button';

export default function LoginPage({ setUser }) {
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
    <PageContainer>
      <section className={styles.formSection}>
        <PageTitle>Log in</PageTitle>
        <p className={styles.newUser}>
          New user?
          <Link className={styles.link} to="/signup">
            Sign up
          </Link>
        </p>
        {(errors.email || errors.password || responseError) && (
          <ErrorBox message={responseError || 'Invalid email or password'} />
        )}
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
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
          <Button submit>Login</Button>
        </Form>
      </section>
      <section className={styles.loginImage} />
    </PageContainer>
  );
}
