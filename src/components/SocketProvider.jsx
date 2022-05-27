// @ts-check

import React from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import socketContext from '../context/socketContext.js';

const SocketProvider = ({ socket, children }) => {
  const { t } = useTranslation();
  const socketWrapper = (action, data) => {
    if (socket.disconnected) {
      toast.error(t('networkError'));
      throw new Error('networkError');
    }

    socket.emit(action, data, _.noop);
  };

  const sendMessage = (message) => {
    socketWrapper('newMessage', message);
  };

  const addChannel = (channel) => {
    socketWrapper('newChannel', channel);
  };

  const removeChannel = (channel) => {
    socketWrapper('removeChannel', channel);
  };

  const renameChannel = (channel) => {
    socketWrapper('renameChannel', channel);
  };

  return (
    <socketContext.Provider value={{
      sendMessage, addChannel, removeChannel, renameChannel,
    }}
    >
      {children}
    </socketContext.Provider>
  );
};

export default SocketProvider;
