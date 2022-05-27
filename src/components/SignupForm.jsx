// @ts-check

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';
import validationSchemas from '../validation.js';

const SignupForm = () => {
  const { signupFormSchema } = validationSchemas();
  const { t } = useTranslation();
  const history = useHistory();
  const [isValidData, setIsValidData] = useState(true);
  const inputRef = useRef();
  const auth = useAuth();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupFormSchema,
    onSubmit: async ({ username, password }) => {
      const credentials = { username, password };
      try {
        const response = await axios.post(routes.signupPath(), credentials);
        const { token } = response.data;
        auth.logIn(token, username);
        history.replace('/');
      } catch (error) {
        if (error.isAxiosError && error.response.status === 409) {
          inputRef.current.select();
          setIsValidData(false);
        } else {
          throw error;
        }
      }
    },
  });

  const validationParams = signupFormSchema.describe().fields;
  const usernameMinCharsCount = _.find(validationParams.username.tests, ['name', 'min']).params.min;
  const usernameMaxCharsCount = _.find(validationParams.username.tests, ['name', 'max']).params.max;
  const passwordMinCharsCount = _.find(validationParams.password.tests, ['name', 'min']).params.min;

  return (
    <Form onSubmit={formik.handleSubmit} className="p-3">
      <h1 className="text-center mb-4">Регистрация</h1>
      <Form.Group>
        <FloatingLabel
          controlId="username"
          label={t('username')}
          className="mb-3"
        >
          <Form.Control
            type="text"
            name="username"
            value={formik.values.username}
            ref={inputRef}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t('fromToChars', { min: usernameMinCharsCount, max: usernameMaxCharsCount })}
            autoComplete="username"
            isInvalid={
              (formik.errors.username && formik.touched.username) || !isValidData
            }
          />
          {formik.touched.username && formik.errors.username && (
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.username)}
            </Form.Control.Feedback>
          )}
        </FloatingLabel>
      </Form.Group>
      <Form.Group>
        <FloatingLabel
          controlId="password"
          label={t('password')}
          className="mb-3"
        >
          <Form.Control
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t('atLeastChars', { min: passwordMinCharsCount })}
            autoComplete="new-password"
            isInvalid={
              (formik.errors.password && formik.touched.password) || !isValidData
            }
          />
          {formik.touched.password && formik.errors.password && (
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.password)}
            </Form.Control.Feedback>
          )}
        </FloatingLabel>
      </Form.Group>
      <Form.Group>
        <FloatingLabel
          controlId="confirmPassword"
          label={t('confirmPassword')}
          className="mb-4"
        >
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t('passwordsMustMatch')}
            autoComplete="new-password"
            isInvalid={
              (formik.errors.confirmPassword && formik.touched.confirmPassword)
              || !isValidData
            }
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.confirmPassword)}
            </Form.Control.Feedback>
          )}
          {!isValidData && (
            <Form.Control.Feedback type="invalid">
              {t('suchUserAlreadyExists')}
            </Form.Control.Feedback>
          )}
        </FloatingLabel>
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100" disabled={formik.isSubmitting}>{t('signup')}</Button>
    </Form>
  );
};

export default SignupForm;
