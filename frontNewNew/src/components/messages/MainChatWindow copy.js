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
  const [selectedRequestTitle, setSelectedRequestTitle] = useState(location.state || null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeChat, setActiveChat] = useState(location.state || null);  // Set initial state
  const [selectedUserId, setSelectedUserId] = useState(location.state || null);
  const [refreshMessages, setRefreshMessages] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/chats?user_id=${currUser.id}`);
        const { answerer, requester } = response.data;
        setChatsAsAnswerer(answerer);
        setChatsAsRequester(requester);
        console.log("chat")
        console.log(response.data)
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
      setActiveChat(location.state.activeChat);
      console.log(location.state)
      console.log("POOOOOOOOOO")
      console.log(location.state.activeChat)
      console.log(location.state.request)

      setSelectedUserId(location.state.request.user_id);
      setSelectedRequestTitle(location.state.request.title);
      setActiveTab("answerer");
    }
  }, [location.state]);

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

    console.log("BEFORE");
    console.log(chatsForSelectedRequest);
    const usersList = chatsForSelectedRequest
      .filter(chat => chat.request.title === selectedRequestTitle)
      .map(chat => activeTab === 'answerer' ? {receiver: chat.requester, request_id: chat.request_id, updated_at: chat.updated_at} : {receiver: chat.answerer, request_id: chat.request_id, updated_at: chat.updated_at});
    console.log(usersList);
    console.log("SHIT")
    const userToSelect = chatsForSelectedRequest.filter(chat => chat.requester.id === selectedUserId)[0];
    console.log(userToSelect);

    setSelectedUser(userToSelect);

    return (
      <div className="users-list">
        {usersList.map((user, index) => (
          <div key={index} className={`user-item ${selectedUser === user.receiver.id ? 'selected' : ''}`} onClick={() => handleUserSelection(user)}>
            <p>{`${user.receiver.first_name} ${user.receiver.last_name}`}</p>
          </div>
        ))}
      </div>
    );
  };

  const handleUserSelection = async (user) => {
    try {
      setSelectedUser(user.receiver);
      setSelectedUserId(user.receiver.id);

      // Ensure selectedRequest is defined before making API call
      if (!selectedRequestTitle) {
        console.error('Selected request is not defined.');
        return;
      }

      // Fetch chat details between current user and selected user
      const response = await axios.get(`http://localhost:3000/chats/chat?user_id=${currUser.id}&receiver_id=${user.receiver.id}&request_id=${user.request_id}`);

      console.log("POOO")
      // Get request id
      console.log(currUser.id)
      console.log(user.receiver.id)
      console.log(user.request_id)

      console.log(response.data.chat[0])
      // Assuming the API response structure based on the expected data
      setActiveChat(response.data.chat[0])
      setSelectedUser(activeTab === 'answerer' ? response.data.chat[0].requester : response.data.chat[0].answerer); // Adjust based on your API response structure
      setSelectedUserId(selectedUser.id)
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
                  {/* Render additional currentUser chat details here */}
                </div>

              {selectedUser && (
                <div className="selected-user">
                  <p><strong>Selected User:</strong> {`${selectedUser.first_name} ${selectedUser.last_name}`}</p>
                  {/* Render additional selectedUser chat details here */}
                </div>
              )}
              <div><strong>ChatId:</strong> {` ${activeChat?.id} `}</div>
              { activeChat != null ? (
                <div>
                  <div>
                    <MessagesChannel currChat={activeChat} currUser={currUser} refreshMessages={refreshMessages} />
                  </div>
                  <div>
                      <MessageSender currChat={activeChat} currUser={currUser} setRefreshMessages={setRefreshMessages} />
                  </div>
                </div>
                ) : null }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainChatWindow;
