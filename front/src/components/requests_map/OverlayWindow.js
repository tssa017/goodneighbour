import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './styles.css'; // Import the CSS file

const OverlayWindow = ({ request, currUser, onClose }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleClickSubmitRequest = async () => {
    try {
      const response = await axios.post('http://localhost:3000/requests/answer_request', {
        answerer_id: currUser.id,
        request_id: request.id,
        requester_id: request.user_id,
      });
      console.log('Request submitted successfully:', response.data);

      navigate('/messages', { state: { activeChat: response.data, request: request } });
      onClose(); // Close the overlay after successful submission
    } catch (error) {
      console.error('Error submitting request:', error);
      setErrorMessage(error.response.data.details)
    }
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <h2>{request.title}</h2>
        <p>{request.description}</p>
        <p>{request.user_id}</p>
        <p>{request.id}</p>

        <p>Are you sure you want to answer this request?</p>
        <div className="flex flex-row items-center justify-center space-between">
          <div>
            <button onClick={handleClickSubmitRequest}>Yes</button>
          </div>
          <div>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
        <div><p>{errorMessage}</p></div>
      </div>
    </div>
  );
};

export default OverlayWindow;
