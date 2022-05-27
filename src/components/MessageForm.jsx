// @ts-check

import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import useSocket from '../hooks/useSocket.js';
import useAuth from '../hooks/useAuth.js';
import validationSchemas from '../validation.js';

const MessageForm = () => {
  const { messageFormSchema } = validationSchemas();
  const { t } = useTranslation();
  const socket = useSocket();
  const auth = useAuth();
  const username = auth.getUsername();
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const inputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validateOnMount: true,
    validationSchema: messageFormSchema,
    onSubmit: ({ body }, { resetForm }) => {
      const message = {
        nickname: username,
        body,
        channelId: currentChannelId,
      };
      try {
        socket.sendMessage(message);
        resetForm();
      } catch (error) {
        if (error.message === 'networkError') {
          setTimeout(() => {
            formik.setSubmitting(false);
          }, 3000);
        }
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId, formik.isSubmitting]);

  return (
    <Form
      noValidate
      onSubmit={formik.handleSubmit}
      onChange={formik.handleChange}
      className="py-1 border rounded-2"
    >
      <InputGroup hasValidation>
        <Form.Control
          type="text"
          autoComplete="off"
          onChange={formik.handleChange}
          value={formik.values.body}
          name="body"
          ref={inputRef}
          aria-label={t('newMessage')}
          data-testid="new-message"
          placeholder={t('enterMessage')}
          className="border-0 p-0 ps-2"
          disabled={formik.isSubmitting}
        />
        <Button type="submit" variant="group-vertical" disabled={!formik.isValid || !formik.dirty}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-square" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
          </svg>
          <span className="visually-hidden">{t('send')}</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessageForm;
