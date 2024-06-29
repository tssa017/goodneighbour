import React, { useState } from 'react';
import axios from 'axios';

const MessageSender = ({ currChat, currUser, setRefreshMessages }) => {
    const [messageContent, setMessageContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:3000/messages',
                {
                    message: {
                        chat_id: currChat.id,
                        user_id: currUser.id,
                        content: messageContent,
                    },
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error('Error sending message:', error);
        }

        setRefreshMessages(true);
        setMessageContent('');
    };

    return (
        <div className="flex flex-col pb-10 mb-10 items-center justify-end overflow-y-scroll ">
            <div className="bg-light rounded-lg w-full max-w-md p-8">
                <h2 className="text-2xl font-semibold mb-6 text-center text-primary">
                    Send message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="content"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Content
                        </label>
                        <textarea
                            id="content"
                            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)}
                            required
                            rows={4}
                            placeholder="Type your message here..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-secondary rounded-lg text-white hover:bg-dark focus:outline-none focus:bg-dark transition duration-200"
                    >
                        Send message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MessageSender;
