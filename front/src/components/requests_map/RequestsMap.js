import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Custom components used for displaying markers and legends on the map
import RequestMarker from './RequestMarker';
import MarkerLegend from './MarkerLegend';
import useGeoLocation from '../geolocation/Geolocation'; // Custom hook for fetching the current geolocation of the user
import { Map, APIProvider } from '@vis.gl/react-google-maps'; // For integrating Google Maps into the application

const mapContainerStyle = {
    width: '100%',
    height: '600px',
};

const RequestMap = ({ currUser }) => {
    const [requests, setRequests] = useState([]); // To hold the list of requests fetched from the server
    const { lat, lon } = useGeoLocation(); // Retrieves the current latitude + longitude
    const center = {
        lat: lat,
        lng: lon,
    };

    // Fetch requests
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3000/requests'
                );
                setRequests(response.data);
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        const interval = setInterval(fetchRequests, 5000); // For the unfulfilled requests tracker: fetch requests every 5 seconds 💪

        return () => clearInterval(interval); // Ensures request doesn't keep running in background when component unmounts
    }, []);

    // Only display results if from current user
    if (!currUser) {
        return null;
    }

    // Filters requests array to count # of requests (with a status other than 'closed'), indicating unfulfilled requests in the tracker
    const unfulfilledRequestsCount = requests.filter(
        (request) => request.status !== 'closed'
    ).length;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-light pt-4 pb-12">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full">
                <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                    <Map
                        mapId={'bf51a92d020fa25a'}
                        style={mapContainerStyle}
                        defaultCenter={center}
                        defaultZoom={10}
                        gestureHandling={'greedy'}
                    >
                        {/* Conditionally render RequestMarker components for each visible request where `request.hidden` = false */}
                        {requests.map((request) => (
                            <div key={request.id}>
                                {request.hidden === false ? (
                                    <RequestMarker
                                        request={request}
                                        currUser={currUser}
                                    />
                                ) : null}
                            </div>
                        ))}
                    </Map>
                </APIProvider>
                <MarkerLegend />
                <h2 className="text-2xl p-8 font-bold bg-secondary text-white text-center mb-6">
                    Unfulfilled requests count: {unfulfilledRequestsCount}
                </h2>
            </div>
        </div>
    );
};

export default RequestMap;
