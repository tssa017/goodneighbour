import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MapComponent = () => {
  const [map, setMap] = useState(null);
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

  useEffect(() => {
    if (map) {
      const google = window.google;
      requests.forEach(request => {
        const marker = new google.maps.Marker({
          position: { lat: request.latitude, lng: request.longitude },
          map: map,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div>
              <h3>${request.title}</h3>
              <p>${request.description}</p>
              <button onClick={() => handlePropose(request.id)}>Propose</button>
            </div>
          `,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });
    }
  }, [map, requests]);

  const onLoad = (map) => {
    setMap(map);
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <div ref={onLoad} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default MapComponent;
