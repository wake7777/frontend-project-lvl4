// @ts-check

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Nav, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { setCurrentChannelId } from '../slices/channelsSlice.js';
import { openModalWindow } from '../slices/modalWindowSlice.js';
import DefaultChannel from './DefaultChannel.jsx';
import ControlledChannel from './ControlledChannel.jsx';

const Channels = () => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channelsInfo.channels);
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const dispatch = useDispatch();
  const handleActiveChannel = (channelId) => () => dispatch(setCurrentChannelId({ channelId }));
  const addChannel = () => {
    dispatch(openModalWindow({ name: 'addChannel' }));
  };

  const removeChannel = (channelId) => (e) => {
    e.preventDefault();
    dispatch(openModalWindow({ name: 'removeChannel', channelId }));
  };

  const renameChannel = (channelId) => (e) => {
    e.preventDefault();
    dispatch(openModalWindow({ name: 'renameChannel', channelId }));
  };

  return (
    <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light" as="aside">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels')}</span>
        <Button
          onClick={addChannel}
          variant="link"
          className="p-0 text-primary btn-group-vertical"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">{t('plus')}</span>
        </Button>
      </div>
      <Nav className="flex-column nav-pills nav-fill px-2" as="ul">
        {channels.map(({ id, name, removable }) => {
          const btnVariant = id === currentChannelId && 'secondary';
          return removable ? (
            <ControlledChannel
              key={id}
              name={name}
              btnVariant={btnVariant}
              removeChannel={removeChannel(id)}
              renameChannel={renameChannel(id)}
              handleActiveChannel={handleActiveChannel(id)}
            />
          ) : (
            <DefaultChannel
              key={id}
              name={name}
              btnVariant={btnVariant}
              handleActiveChannel={handleActiveChannel(id)}
            />
          );
        })}
      </Nav>
    </Col>
  );
};

export default Channels;
