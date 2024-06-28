import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessagesChannel = ({ currChat, currUser, refreshMessages }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/messages?chat_id=${currChat.id}`);
        const sortedMessages = response.data.messages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        setMessages(sortedMessages.length > 0 ? sortedMessages : []);
      } catch (error) {
        console.error('Error fetching message:', error);
      }
    };

    if (currChat) {
      fetchMessages();
    }
  }, [currChat]);

  const renderMessageList = () => {
    let messagesSent = [];
    let messagesReceived = [];

    if (messages.length > 0) {
      messagesSent = messages.filter(message => message.user_id === currUser.id);
      messagesReceived = messages.filter(message => message.user_id !== currUser.id);
    }

    return (
      <div className='flex flex-row'>
        <div className="messages-sent">
          {messagesSent.map((message) => (
            <div key={message.id}>{message.content}</div>
          ))}
        </div>
        <div className="messages-received">
          {messagesReceived.map((message) => (
            <div key={message.id}>{message.content}</div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="messages-channel">
      <div className="column">
        {renderMessageList()}
      </div>
    </div>
  );
};

export default MessagesChannel;
