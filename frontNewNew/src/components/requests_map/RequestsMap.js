import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RequestMarker from './RequestMarker';
import useGeoLocation from './Geolocation'
import {
  AdvancedMarker,
  Marker,
  Pin,
  Map,
  APIProvider
} from '@vis.gl/react-google-maps';
// const libraries = ['places', 'marker'];

const mapContainerStyle = {
  width: '100%',
  height: '600px',
};


const RequestMap = ({ currUser }) => {
  const [requests, setRequests] = useState([]);
  const { lat, lon } = useGeoLocation();
  const center = {
    lat: lat,
    lng: lon,
  };
  console.log(center)
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3000/requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    if (currUser) {
      fetchRequests();
    }
  }, [currUser]);

  if (!currUser) {
    return null; // Or render a message or redirect to login
  }
  console.log(requests)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl">
        <h2 className="text-3xl font-semibold mb-6 text-center text-green-700">Requests Map</h2>
        <APIProvider
          apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          // libraries={libraries}
        >
          <Map
            mapId={'bf51a92d020fa25a'}
            style={mapContainerStyle}
            defaultCenter={center}
            defaultZoom={10}
            gestureHandling={'greedy'}
          >
            {requests.map((request) => (
              <RequestMarker request={request} currUser={currUser}/>
             ))}
          </Map>
        </APIProvider>
      </div>
    </div>
  );
};

export default RequestMap;
