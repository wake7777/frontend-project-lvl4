// @ts-check

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import HomePage from './HomePage.jsx';
import LoginPage from './LoginPage.jsx';
import SignupPage from './SignupPage.jsx';
import PageNotFound from './PageNotFound.jsx';
import Header from './Header.jsx';
import useAuth from '../hooks/useAuth.js';

const App = () => {
  const auth = useAuth();

  return (
    <div className="d-flex flex-column h-100">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            {({ location }) => (auth.isLoggedIn()
              ? (
                <HomePage />
              ) : (
                <Redirect to={{ pathname: '/login', state: { from: location } }} />
              ))}
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
