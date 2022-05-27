// @ts-check
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';

import '../assets/application.scss';
import init from './init.jsx';

const runApp = async () => {
  const mode = process.env.NODE_ENV;

  if (mode !== 'production') {
    localStorage.debug = 'chat:*';
  }

  const socket = io();
  const vdom = await init(socket);
  const container = document.querySelector('#chat');

  ReactDOM.render(vdom, container);
};

runApp();
