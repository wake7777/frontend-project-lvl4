// @ts-check

import React from 'react';
import {
  Card, Container, Row, Col,
} from 'react-bootstrap';

import SignupForm from './SignupForm.jsx';
import setTitle from '../utils.jsx';

const SignupPage = () => {
  setTitle();
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col sm={8} md={6} xxl={4}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <SignupForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
