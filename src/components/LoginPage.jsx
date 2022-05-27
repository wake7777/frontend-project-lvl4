// @ts-check

import React from 'react';
import {
  Card, Container, Row, Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LoginForm from './LoginForm.jsx';
import setTitle from '../utils.jsx';

const LoginPage = () => {
  const { t } = useTranslation();
  setTitle();

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col sm={8} md={6} xxl={4}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <LoginForm />
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="d-flex justify-content-center gap-1">
                <span>{t('noAccount')}</span>
                <Link to="/signup">{t('registration')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
