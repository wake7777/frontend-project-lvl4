// @ts-check

import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './slices/channelsSlice.js';
import messagesReducer from './slices/messagesSlice.js';
import modalWindowReducer from './slices/modalWindowSlice.js';

export default () => {
  const store = configureStore({
    reducer: {
      channelsInfo: channelsReducer.reducer,
      messages: messagesReducer.reducer,
      modalWindowInfo: modalWindowReducer.reducer,
    },
  });
  return store;
};
