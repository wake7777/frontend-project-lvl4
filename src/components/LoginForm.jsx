// @ts-check

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';
import validationSchemas from '../validation.js';

const LoginForm = () => {
  const { loginFormSchema } = validationSchemas();
  const { t } = useTranslation();
  const auth = useAuth();
  const [isAuthFailed, setIsAuthFailed] = useState(false);
  const inputRef = useRef();
  const history = useHistory();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginFormSchema,
    onSubmit: async (loginData) => {
      try {
        const response = await axios.post(routes.loginPath(), loginData);
        const { token, username } = response.data;
        auth.logIn(token, username);
        history.replace('/');
      } catch (error) {
        if (error.isAxiosError && error.response.status === 401) {
          setIsAuthFailed(true);
          inputRef.current.select();
        } else {
          throw error;
        }
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="mt-3 mt-mb-0">
      <h1 className="text-center mb-4">{t('login')}</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          placeholder={t('yourNick')}
          name="username"
          id="username"
          autoComplete="username"
          isInvalid={isAuthFailed
            || (formik.touched.username && !!formik.errors.username)}
          required
          ref={inputRef}
          disabled={formik.isSubmitting}
        />
        <Form.Label htmlFor="username">{t('yourNick')}</Form.Label>
        {!isAuthFailed && formik.touched.username && formik.errors.username && (
          <Form.Control.Feedback type="invalid">
            {formik.errors.username}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder={t('password')}
          name="password"
          id="password"
          autoComplete="current-password"
          isInvalid={isAuthFailed
            || (formik.touched.password && !!formik.errors.password)}
          required
          disabled={formik.isSubmitting}
        />
        <Form.Label htmlFor="password">{t('password')}</Form.Label>
        {!isAuthFailed && formik.touched.password && formik.errors.password && (
          <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
        )}
        {isAuthFailed
          && (
          <Form.Control.Feedback type="invalid">
            {t('invalidUsernameOrPassword')}
          </Form.Control.Feedback>
          )}
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3" disabled={formik.isSubmitting}>{t('login')}</Button>
    </Form>
  );
};

export default LoginForm;
