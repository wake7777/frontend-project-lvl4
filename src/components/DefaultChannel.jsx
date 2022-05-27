// @ts-check

import React from 'react';
import {
  Nav, Button,
} from 'react-bootstrap';

const DefaultChannel = ({ name, btnVariant, handleActiveChannel }) => (
  <Nav.Item className="w-100" as="li">
    <Button
      variant={btnVariant}
      onClick={handleActiveChannel}
      className="w-100 rounded-0 text-start"
    >
      <span className="me-1">#</span>
      {name}
    </Button>
  </Nav.Item>
);

export default DefaultChannel;
