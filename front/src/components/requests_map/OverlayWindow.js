import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OverlayWindow = ({ request, currUser, onClose }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleClickSubmitRequest = async () => {
        try {
            const response = await axios.post(
                'http://localhost:3000/requests/answer_request',
                {
                    answerer_id: currUser.id,
                    request_id: request.id,
                    requester_id: request.user_id,
                }
            );
            console.log('Request submitted successfully:', response.data);

            navigate('/messages', {
                state: { activeChat: response.data, request: request },
            });
            onClose(); // Close the overlay after successful submission
        } catch (error) {
            console.error('Error submitting request:', error);
            setErrorMessage(error.response.data.details);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">{request.title}</h2>
                <p className="text-lg mb-4">{request.description}</p>
                <p className="text-gray-600 mb-4">User ID: {request.user_id}</p>
                <p className="text-gray-600 mb-4">Request ID: {request.id}</p>

                <p className="mb-4">
                    Are you sure you want to answer this request?
                </p>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={handleClickSubmitRequest}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none"
                    >
                        Yes
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none"
                    >
                        Close
                    </button>
                </div>
                {errorMessage && (
                    <p className="text-red-500 mt-4">{errorMessage}</p>
                )}
            </div>
        </div>
    );
};

export default OverlayWindow;
