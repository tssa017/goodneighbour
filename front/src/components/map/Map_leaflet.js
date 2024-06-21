// src/components/Map.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/requests')
      .then(response => setRequests(response.data))
      .catch(error => console.error(error));
  }, []);

  const handlePropose = (requestId) => {
    axios.post(`http://localhost:3000/requests/${requestId}/propose`)
      .then(() => {
        // handle success
      })
      .catch(error => console.error(error));
  };

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {requests.map(request => (
        <Marker key={request.id} position={[request.latitude, request.longitude]}>
          <Popup>
            <h3>{request.title}</h3>
            <p>{request.description}</p>
            <button onClick={() => handlePropose(request.id)}>Propose</button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
