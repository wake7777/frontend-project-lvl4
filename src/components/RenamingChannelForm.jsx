// @ts-check

import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import useSocket from '../hooks/useSocket.js';
import validationSchemas from '../validation.js';

const RenamingChannelForm = ({
  closeModal,
}) => {
  const socket = useSocket();
  const { channelFormSchema } = validationSchemas();
  const channelId = useSelector((state) => state.modalWindowInfo.channelId);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const currentChannel = channels.find(({ id }) => id === channelId);
  const { t } = useTranslation();
  const inputRef = useRef();
  const channelsNames = channels.map(({ name }) => name);
  const formik = useFormik({
    initialValues: {
      name: currentChannel.name,
    },
    validationSchema: channelFormSchema(channelsNames),
    onSubmit: ((channel) => ({ name }, { setErrors }) => {
      const changedСhannel = { ...channel, name };
      try {
        socket.renameChannel(changedСhannel);
        closeModal();
        toast.success(t('channelRenamed'));
      } catch (error) {
        if (error.message === 'networkError') {
          setTimeout(() => {
            formik.setSubmitting(false);
          }, 3000);
        }
        setErrors({ name: error.message });
      }
    })(currentChannel),
    validateOnChange: false,
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [formik.isSubmitting]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Control
          value={formik.values.name}
          ref={inputRef}
          onFocus={(e) => e.currentTarget.select()}
          type="text"
          name="name"
          id="name"
          onChange={formik.handleChange}
          aria-label="add channel"
          className="mb-2 form-control"
          data-testid="add-channel"
          isInvalid={!formik.isValid && formik.errors.name !== 'networkError'}
          disabled={formik.isSubmitting}
        />
        <Form.Label htmlFor="name" className="visually-hidden">{t('channelName')}</Form.Label>
        <Form.Control.Feedback type="invalid">
          {(formik.errors.name !== 'networkError') && formik.errors.name}
        </Form.Control.Feedback>
        <div className="d-flex justify-content-end">
          <Button
            onClick={closeModal}
            type="button"
            variant="secondary"
            className="me-2"
          >
            {t('cancel')}
          </Button>
          <Button type="submit" variant="primary" disabled={formik.isSubmitting}>{t('send')}</Button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default RenamingChannelForm;
