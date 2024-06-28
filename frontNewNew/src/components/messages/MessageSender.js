import React, { useState, useEffect } from 'react';
import axios from 'axios'



const MessageSender = ({ currChat, currUser, setRefreshMessages }) => {

  const [messageContent, setMessageContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/messages', {
        message: {
          chat_id: currChat.id,
          user_id: currUser.id,
          content: messageContent,
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setRefreshMessages(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-semibold mb-6 text-center text-green-700">Send message</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            id="content"
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600 transition duration-200"
        >
          Send Message
        </button>
      </form>
      </div>
    </div>
  );
};

export default MessageSender;
