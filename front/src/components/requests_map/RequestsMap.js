import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RequestMarker from './RequestMarker';
import MarkerLegend from './MarkerLegend';
import useGeoLocation from '../geolocation/Geolocation';
import { Map, APIProvider } from '@vis.gl/react-google-maps';

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

        const interval = setInterval(fetchRequests, 5000); // For the unfulfilled requests trqcker: fetch requests every 5 seconds 💪

        return () => clearInterval(interval);
    }, []);

    if (!currUser) {
        return null;
    }

    const unfulfilledRequestsCount = requests.filter(
        (request) => request.status !== 'closed'
    ).length;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-light pt-4 pb-12">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full">
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
