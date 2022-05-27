import _ from 'lodash';
import React, { useState } from 'react';

import authContext from '../context/authContext.js';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const getToken = () => localStorage.getItem('token');
  const getUsername = () => localStorage.getItem('username');
  const isLoggedIn = () => _.has(localStorage, 'token');

  const logIn = (token, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setUser({ username, token });
  };

  const logOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setUser(false);
  };

  return (
    <authContext.Provider value={{
      user, getToken, getUsername, isLoggedIn, logIn, logOut,
    }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
