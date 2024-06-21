import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RequestDetails = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/requests/${id}`)
      .then(response => setRequest(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handlePropose = () => {
    axios.post(`http://localhost:3000/requests/${id}/propose`)
      .then(() => {
        // handle success, e.g., show a success message or update the state
      })
      .catch(error => console.error(error));
  };

  if (!request){
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{request.title}</h2>
      <p>{request.description}</p>
      <p>Type: {request.request_type}</p>
      <p>Location: ({request.latitude}, {request.longitude})</p>
    </div>
  );
};

export default RequestDetails;
