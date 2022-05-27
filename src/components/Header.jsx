// @ts-check

import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useAuth from '../hooks/useAuth.js';

const Header = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const handleLogOut = () => {
    auth.logOut();
  };
  return (
    <header className="shadow-sm" expand="lg" bg="white">
      <Navbar>
        <Container>
          <Navbar.Brand as={Link} to="/">{t('hexletChat')}</Navbar.Brand>
          {auth.isLoggedIn() && (
            <Button onClick={handleLogOut}>{t('signout')}</Button>
          )}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
