import React from 'react';
import styled from 'styled-components';

const Chat = () => {
  return (
    <ChatWindow>
      <h1>Chat Window</h1>
    </ChatWindow>
  )
};

export default Chat;

/*---------*/
/* Styling */
/*---------*/
const ChatWindow = styled.div`
  border: 1px solid orange;
`;