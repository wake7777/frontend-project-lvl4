// @ts-check

import React, { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { animateScroll as scroll } from 'react-scroll';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import Message from './Message.jsx';
import MessageForm from './MessageForm.jsx';

const Messages = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const findCurrentChannel = (state) => _.find(state.channelsInfo.channels, ['id', currentChannelId]);
  const currentChannel = useSelector(findCurrentChannel);
  const messages = useSelector((state) => state.messages);
  const currentChannelMessages = messages.filter(
    ({ channelId }) => channelId === currentChannelId,
  );

  const scrollToBottom = () => scroll.scrollToBottom({
    containerId: 'messages-box',
    duration: 50,
    delay: 0,
    smooth: 'easeInOutQuart',
  });

  useEffect(() => {
    scrollToBottom();
  }, [currentChannelId, messages]);

  return (
    <Col className="p-0 h-100" as="main">
      <div className="d-flex flex-column h-100">
        <header className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              {currentChannel && (
                <>
                  <span className="me-1">#</span>
                  {currentChannel.name}
                </>
              )}
            </b>
          </p>
          <span className="text-muted">
            {t('messages.count', { count: currentChannelMessages.length })}
          </span>
        </header>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {currentChannelMessages.map((message) => <Message key={message.id} message={message} />)}
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm />
        </div>
      </div>
    </Col>
  );
};
export default Messages;
