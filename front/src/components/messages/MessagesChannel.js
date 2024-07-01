import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessagesChannel = ({ currChat, currUser, refreshMessages }) => {
    const [messages, setMessages] = useState([]); // Manage array of messages retrieved from server

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/messages?chat_id=${currChat.id}` // Retrieve messages from server based on user ID
                );
                // Order messages by time received, if no messages, return 'No messages here' txt
                const sortedMessages = response.data.messages.sort(
                    (a, b) => new Date(a.created_at) - new Date(b.created_at)
                );
                setMessages(sortedMessages.length > 0 ? sortedMessages : []);
            } catch (error) {
                console.error('Error fetching message:', error);
            }
        };

        if (refreshMessages) {
            fetchMessages();
        }
    }, [currChat, currUser, refreshMessages]); // Execute `fetchMessages` fn. whenever there's a change in `currChat`, `currUser`, or `refreshMessages`

    const renderMessageList = () => {
        if (messages.length === 0) {
            return (
                <div className="text-gray-400 text-center">
                    No messages here 👀
                </div>
            );
        }

        return messages.map((message) => {
            const isSentByCurrentUser = message.user_id === currUser.id;
            const messageClass = isSentByCurrentUser
                ? 'flex justify-end'
                : 'flex justify-start';
            const bgColorClass = isSentByCurrentUser
                ? 'bg-blue-500'
                : 'bg-pink-400';
            const textColorClass = isSentByCurrentUser
                ? 'text-white'
                : 'text-gray-800';

            return (
                <div
                    key={message.id}
                    className={`my-2 p-2 max-w-xs w-full rounded-lg ${messageClass}`}
                >
                    <div
                        className={`py-1 px-3 rounded-lg ${bgColorClass} ${textColorClass}`}
                    >
                        {message.content}
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="messages-channel">
            <div className="column">{renderMessageList()}</div>
        </div>
    );
};

export default MessagesChannel;
