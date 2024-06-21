import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Messages = () => {
    const { requestId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        axios
            .get(`http://localhost:3000/requests/${requestId}/messages`)
            .then((response) => setMessages(response.data))
            .catch((error) => console.error(error));
    }, [requestId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`http://localhost:3000/requests/${requestId}/messages`, {
                content: newMessage,
            })
            .then((response) => {
                setMessages([...messages, response.data]);
                setNewMessage('');
            })
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <h2>Messages</h2>
            <div>
                {messages.map((message) => (
                    <div key={message.id}>
                        <p>
                            <strong>{message.user.email}:</strong>{' '}
                            {message.content}
                        </p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    required
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Messages;
