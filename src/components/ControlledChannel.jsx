// @ts-check

import React from 'react';
import {
  Nav, Button, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ControlledChannel = ({
  name,
  btnVariant,
  removeChannel,
  renameChannel,
  handleActiveChannel,
}) => {
  const { t } = useTranslation();
  return (
    <Nav.Item className="w-100" as="li">
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button
          onClick={handleActiveChannel}
          variant={btnVariant}
          className="w-100 rounded-0 text-start text-truncate"
        >
          <span className="me-1">#</span>
          {name}
        </Button>
        <Dropdown.Toggle split variant={btnVariant} className="flex-grow-0">
          <span className="visually-hidden">{t('channelControl')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={removeChannel}>{t('remove')}</Dropdown.Item>
          <Dropdown.Item onClick={renameChannel}>{t('rename')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
};

export default ControlledChannel;
