import React, { useState } from 'react';
import axios from 'axios';

const MessageSender = ({ currChat, currUser, setRefreshMessages }) => {
    const [messageContent, setMessageContent] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await axios.post('http://localhost:3000/messages', {
                message: {
                    chat_id: currChat.id,
                    user_id: currUser.id,
                    content: messageContent,
                },
            });
            setRefreshMessages(true);
            setMessageContent('');
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col pb-10 mb-10 items-center justify-end overflow-y-scroll">
            <div className="bg-light rounded-lg w-full max-w-md p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
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
                        className="w-full py-3 px-4 bg-secondary rounded-lg text-white hover:bg-primary"
                        disabled={submitting}
                    >
                        {submitting ? 'Sending...' : 'Send message ✨'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MessageSender;
