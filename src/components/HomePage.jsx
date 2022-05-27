// @ts-check

import axios from 'axios';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import routes from '../routes.js';
import useAuth from '../hooks/useAuth.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import ModalWindow from './ModalWindow.jsx';
import { initChannels } from '../slices/channelsSlice.js';
import setTitle from '../utils.jsx';

const HomePage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const { t } = useTranslation();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(null);
  setTitle();

  const fetchData = useCallback(async () => {
    const token = auth.getToken();

    try {
      const response = await axios.get(routes.data(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response;
      dispatch(initChannels({ data }));

      if (isMounted.current) {
        setIsLoading(false);
      }
    } catch (error) {
      if (error.response.status === 401) {
        history.replace('/login');
      } else {
        toast.error(t('networkError'));
      }
    }
  }, [auth, dispatch, t, history]);

  useEffect(() => {
    isMounted.current = true;
    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, [fetchData]);

  return (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="justify-content-center align-content-center h-100 bg-white">
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">{t('loading')}</span>
            </Spinner>
          ) : (
            <>
              <Channels />
              <Messages />
            </>
          )}
        </Row>
      </Container>
      <ModalWindow />
    </>
  );
};

export default HomePage;
