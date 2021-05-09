import { useContext } from 'react';
import { MessageContext } from '../MessageContextProvider';

import './Messages.scoped.css';

const Messages = () => {
  const { messages, clear } = useContext(MessageContext);

  const handleClear = (): void => clear();

  return (
    <div>
      <h2>Messages</h2>
      <button
        disabled={!messages.length}
        className={'clear'}
        onClick={() => handleClear()}
      >
        Clear messages
      </button>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  );
};

export default Messages;
