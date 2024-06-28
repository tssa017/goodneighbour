import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './styles.css'; // Import the CSS file
import MessageSender from './MessageSender';
import MessagesChannel from './MessagesChannel';

const MainChatWindow = ({ currUser }) => {
  const location = useLocation();
  const [chatsAsAnswerer, setChatsAsAnswerer] = useState([]);
  const [chatsAsRequester, setChatsAsRequester] = useState([]);
  const [activeTab, setActiveTab] = useState('answerer');
  const [selectedRequestTitle, setSelectedRequestTitle] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [refreshMessages, setRefreshMessages] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/chats?user_id=${currUser.id}`);
        const { answerer, requester } = response.data;
        setChatsAsAnswerer(answerer);
        setChatsAsRequester(requester);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    if (currUser) {
      fetchChats();
    }
  }, [currUser]);

  useEffect(() => {
    if (location.state) {
      const { activeChat, request } = location.state;
      setActiveChat(activeChat);
      setSelectedRequestTitle(request.title);
      setSelectedUserId(request.user_id);
      setActiveTab('answerer');
    }
  }, [location.state]);

  useEffect(() => {
    if (selectedUserId && selectedRequestTitle) {
      const chatsForSelectedRequest = activeTab === 'answerer' ? chatsAsAnswerer : chatsAsRequester;
      const userToSelect = chatsForSelectedRequest.find(chat => {
        const user = activeTab === 'answerer' ? chat.requester : chat.answerer;
        return user.id === selectedUserId;
      });
      setSelectedUser(userToSelect ? (activeTab === 'answerer' ? userToSelect.requester : userToSelect.answerer) : null);
    }
  }, [selectedUserId, selectedRequestTitle, activeTab, chatsAsAnswerer, chatsAsRequester]);

  const renderRequestList = () => {
    const requests = activeTab === 'answerer' ? chatsAsAnswerer.map(chat => chat.request.title) : chatsAsRequester.map(chat => chat.request.title);
    const uniqueRequests = [...new Set(requests)];

    return (
      <div className="request-list">
        {uniqueRequests.map((requestTitle, index) => (
          <div key={index} className={`request-item ${selectedRequestTitle === requestTitle ? 'selected' : ''}`} onClick={() => setSelectedRequestTitle(requestTitle)}>
            <h3>{requestTitle}</h3>
          </div>
        ))}
      </div>
    );
  };

  const renderUsersList = () => {
    if (!selectedRequestTitle) return null;

    const chatsForSelectedRequest = activeTab === 'answerer' ? chatsAsAnswerer : chatsAsRequester;
    const usersList = chatsForSelectedRequest
      .filter(chat => chat.request.title === selectedRequestTitle)
      .map(chat => ({
        receiver: activeTab === 'answerer' ? chat.requester : chat.answerer,
        request_id: chat.request_id,
        updated_at: chat.updated_at,
      }));

    return (
      <div className="users-list">
        {usersList.map((user, index) => (
          <div key={index} className={`user-item ${selectedUser?.id === user.receiver.id ? 'selected' : ''}`} onClick={() => handleUserSelection(user)}>
            <p>{`${user.receiver.first_name} ${user.receiver.last_name}`}</p>
          </div>
        ))}
      </div>
    );
  };

  const handleUserSelection = async (user) => {
    try {

      if (!selectedRequestTitle) {
        console.error('Selected request is not defined.');
        return;
      }

      const response = await axios.get(`http://localhost:3000/chats/chat?user_id=${currUser.id}&receiver_id=${user.receiver.id}&request_id=${user.request_id}`);

      setActiveChat(response.data.chat[0]);
      if (activeTab === 'answerer'){
        setSelectedUser(response.data.chat[0].requester);
        setSelectedUserId(response.data.chat[0].requester.id);
      }
      else{
        setSelectedUser(response.data.chat[0].answerer);
        setSelectedUserId(response.data.chat[0].answerer.id);
      }
    } catch (error) {
      console.error('Error fetching chat:', error);
    }
  };

  if (!currUser) {
    return null; // Or render a message or redirect to login
  }

  return (
    <div className="main-chat-window">
      <div className="tabs">
        <button onClick={() => setActiveTab('answerer')} className={activeTab === 'answerer' ? 'active' : ''}>
          My Answered Requests
        </button>
        <button onClick={() => setActiveTab('requester')} className={activeTab === 'requester' ? 'active' : ''}>
          My Requests
        </button>
      </div>
      <div className="content">
        <div className="column">
          {renderRequestList()}
        </div>
        <div className="column">
          {renderUsersList()}
        </div>
        <div className="column">
          <div className="chat-details">
            <h3>Chat Details</h3>
            <div className="chat">
              <div className="current-user">
                <p><strong>Current User:</strong> {`${currUser.first_name} ${currUser.last_name}`}</p>
              </div>
              {selectedUser && (
                <div className="selected-user">
                  <p><strong>Selected User:</strong> {`${selectedUser.first_name} ${selectedUser.last_name}`}</p>
                </div>
              )}
              <div><strong>ChatId:</strong> {` ${activeChat?.id} `}</div>
              {activeChat && (
                <div>
                  <div>
                    <MessagesChannel currChat={activeChat} currUser={currUser} refreshMessages={refreshMessages} />
                  </div>
                  <div>
                    <MessageSender currChat={activeChat} currUser={currUser} setRefreshMessages={setRefreshMessages} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainChatWindow;
