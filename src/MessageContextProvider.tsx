import React, { ReactElement, useEffect, useState } from 'react';

type MessageContextProps = {
  messages: string[];
  add: (message: string) => void;
  clear: () => void;
}

type MessageContextProviderProps = {
  children: ReactElement | ReactElement[];
};

export const MessageContext = React.createContext<MessageContextProps>({} as MessageContextProps);

const MessageContextProvider = ({ children }: MessageContextProviderProps) => {
  const [messages, setMessages] = useState<string[]>([]);

  const clear = () => setMessages([])

  useEffect(() => {
    if (messages.length >= 15) {
      clear()
    }
  }, [messages.length])

  const context: MessageContextProps = {
    messages,
    add: (message: string) => setMessages([...messages, message]),
    clear,
  }

  return (
    <MessageContext.Provider value={context}>
      {children}
    </MessageContext.Provider>
  )
}

export default MessageContextProvider;
