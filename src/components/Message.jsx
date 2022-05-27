// @ts-check

import React from 'react';

import filter from 'leo-profanity';

filter.add(filter.getDictionary('ru'));

const Message = ({ message }) => {
  const { nickname, body } = message;

  return (
    <div className="text-break mb-2">
      <b>{nickname}</b>
      {`: ${filter.clean(body)}`}
    </div>
  );
};

export default Message;
