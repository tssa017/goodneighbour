import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import MessageSender from './MessageSender'; // For message submission
import MessagesChannel from './MessagesChannel'; // For displaying the messages

const MainChatWindow = ({ currUser }) => {
    const location = useLocation(); // Current location from react router dom
    // Stored data indicates if a message was from a requester or sender
    const [chatsAsAnswerer, setChatsAsAnswerer] = useState([]); // Store chat data categorized by whether the current user is an `answerer` or `requester`!
    const [chatsAsRequester, setChatsAsRequester] = useState([]);
    const [activeTab, setActiveTab] = useState('answerer'); // Trqck which tab is currently active
    const [selectedRequestTitle, setSelectedRequestTitle] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [activeChat, setActiveChat] = useState(null); // Holds the currently active chat object
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [refreshMessages, setRefreshMessages] = useState(true); // Controls message refresh triggers

    // Track the selected request, user, and active chat
    const [showRequests, setShowRequests] = useState(false);
    const [showUsersList, setShowUsersList] = useState(false);

    // Fetches user-specific chat data (`chatsAsAnswerer` + `chatsAsRequester`) based on `currUser.id` WHEN `currUser` changes
    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/chats?user_id=${currUser.id}`
                );
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

    // Updates state (`activeChat`, `selectedRequestTitle`, `selectedUserId`, `activeTab`) based on changes in the React Router location state (`location.state`)
    // Ex: if a user clicks on a different volunteer to view a different chat.
    useEffect(() => {
        if (location.state) {
            const { activeChat, request } = location.state;
            setActiveChat(activeChat);
            setSelectedRequestTitle(request.title);
            setSelectedUserId(request.user_id);
            setActiveTab('answerer');
        }
    }, [location.state]);

    // Updates `selectedUser` based on `selectedUserId` and `selectedRequestTitle`
    useEffect(() => {
        if (selectedUserId && selectedRequestTitle) {
            const chatsForSelectedRequest =
                activeTab === 'answerer' ? chatsAsAnswerer : chatsAsRequester;
            const userToSelect = chatsForSelectedRequest.find((chat) => {
                const user =
                    activeTab === 'answerer' ? chat.requester : chat.answerer;
                return user.id === selectedUserId;
            });
            setSelectedUser(
                userToSelect
                    ? activeTab === 'answerer'
                        ? userToSelect.requester
                        : userToSelect.answerer
                    : null
            );
        } else {
            setSelectedUser(null);
        }
    }, [
        selectedUserId,
        selectedRequestTitle,
        activeTab,
        chatsAsAnswerer,
        chatsAsRequester,
    ]);

    // Clicking a request title updates the state and shows the users list
    const renderRequestList = () => {
        const requests =
            activeTab === 'answerer'
                ? chatsAsAnswerer.map((chat) => chat.request.title)
                : chatsAsRequester.map((chat) => chat.request.title);
        const uniqueRequests = [...new Set(requests)];

        return (
            <div
                className={`mb-4 h-full overflow-y-auto ${
                    showRequests ? '' : 'hidden'
                }`}
            >
                <p className="font-bold text-primary p-3 text-lg">Requests</p>
                <div className="grid grid-cols-1 gap-1 justify-items-center">
                    {uniqueRequests.map((requestTitle, index) => (
                        <div
                            key={index}
                            className={`m-2 p-2 cursor-pointer border rounded ${
                                selectedRequestTitle === requestTitle
                                    ? 'bg-pink-300 border-black'
                                    : 'bg-light border-black'
                            }`}
                            onClick={() => {
                                setSelectedRequestTitle(requestTitle);
                                setShowUsersList(true);
                            }}
                        >
                            <h3 className="font-medium text-sm">
                                {requestTitle}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Clicking a user updates the state and fetches chat data for the selected user
    const renderUsersList = () => {
        if (!selectedRequestTitle || !showUsersList) return null;

        const titleText =
            activeTab === 'answerer' ? 'Requester' : 'Select volunteer';

        const chatsForSelectedRequest =
            activeTab === 'answerer' ? chatsAsAnswerer : chatsAsRequester;
        const usersList = chatsForSelectedRequest
            .filter((chat) => chat.request.title === selectedRequestTitle)
            .map((chat) => ({
                receiver:
                    activeTab === 'answerer' ? chat.requester : chat.answerer,
                request_id: chat.request_id,
                updated_at: chat.updated_at,
            }));

        return (
            <div className="mb-4 h-full">
                <div className="flex flex-col">
                    <div className="flex-1 mb-4 mx-10">
                        <p className="font-bold text-primary p-3 text-lg">
                            {titleText}
                        </p>
                        <div className="grid grid-cols-1 gap-2">
                            {usersList.map((user, index) => (
                                <div
                                    key={index}
                                    className={`m-2 p-1 cursor-pointer ${
                                        selectedUser?.id === user.receiver.id
                                            ? 'bg-pink-200'
                                            : 'bg-light border-black'
                                    }`}
                                    onClick={() => handleUserSelection(user)}
                                >
                                    <p className="font-medium text-sm">{`${user.receiver.first_name} ${user.receiver.last_name}`}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Fetches chat data for the selected user and updates the state
    const handleUserSelection = async (user) => {
        try {
            if (!selectedRequestTitle) {
                console.error('Selected request is not defined.');
                return;
            }

            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/chats/chat?user_id=${currUser.id}&receiver_id=${user.receiver.id}&request_id=${user.request_id}`
            );

            setActiveChat(response.data.chat[0]);
            if (activeTab === 'answerer') {
                setSelectedUser(response.data.chat[0].requester);
                setSelectedUserId(response.data.chat[0].requester.id);
            } else {
                setSelectedUser(response.data.chat[0].answerer);
                setSelectedUserId(response.data.chat[0].answerer.id);
            }
        } catch (error) {
            console.error('Error fetching chat:', error);
        }
    };

    if (!currUser) {
        return null;
    }

    return (
        <div className="max-w-4xl mx-auto py-10 my-10 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-black text-primary mb-8">
                Welcome to the secure message portal 💬
            </h1>
            <div className="pb-10 text-md text-left">
                {' '}
                <p className="pt-2">
                    ℹ️ <strong>To get started</strong>, follow these steps!
                </p>
                <p className="pt-4">
                    <strong>1.</strong> Select either your aid missions or your
                    aid requests tab
                </p>
                <p className="py-2">
                    <strong>2.</strong> Select the target request
                </p>
                <p className="pb-8">
                    <strong>3.</strong> Select the user you want to communicate
                    with, and get chatting!
                </p>
            </div>

            <div className="mb-4">
                <button
                    onClick={() => {
                        setActiveTab('answerer');
                        setShowRequests(true);
                    }}
                    className={`p-3 mx-8 rounded text-lg font-bold ${
                        activeTab === 'answerer'
                            ? 'bg-primary text-white'
                            : 'bg-light'
                    }`}
                >
                    My aid missions 💪
                </button>
                <button
                    onClick={() => {
                        setActiveTab('requester');
                        setShowRequests(true);
                    }}
                    className={`p-3 rounded text-lg font-bold ${
                        activeTab === 'requester'
                            ? 'bg-primary text-white'
                            : 'bg-light'
                    }`}
                >
                    My aid requests 🤞
                </button>
            </div>
            <div className="overflow-y-auto w-full">
                <div className="flex flex-col md:flex-row justify-center w-full">
                    {renderRequestList()}
                    {renderUsersList()}
                </div>
                {selectedRequestTitle && selectedUser && (
                    <div className="w-full pt-4">
                        <p className="text-sm italic m-3">
                            Hey <strong>{currUser.first_name},</strong> get in
                            touch with{' '}
                            <span className="font-black">
                                {selectedUser.first_name}
                            </span>{' '}
                            here ⬇️
                        </p>
                        {activeChat && (
                            <div className="flex flex-col items-center w-full">
                                <MessagesChannel
                                    currChat={activeChat}
                                    currUser={currUser}
                                    refreshMessages={refreshMessages}
                                />
                                <MessageSender
                                    currChat={activeChat}
                                    currUser={currUser}
                                    setRefreshMessages={setRefreshMessages}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainChatWindow;
