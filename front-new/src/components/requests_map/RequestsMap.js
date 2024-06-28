import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RequestMarker from './RequestMarker';

import {
    AdvancedMarker,
    Marker,
    Pin,
    Map,
    APIProvider,
} from '@vis.gl/react-google-maps';
// const libraries = ['places', 'marker'];

const mapContainerStyle = {
    width: '100%',
    height: '600px',
};

const center = {
    lat: 37.7749,
    lng: -122.4194,
};

const RequestMap = ({ currUser }) => {
    const [requests, setRequests] = useState([]);

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

        if (currUser) {
            fetchRequests();
        }
    }, [currUser]);

    if (!currUser) {
        return null; // Or render a message or redirect to login
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-light">
            <h2 className="text-4xl font-bold text-primary text-center mb-6">
                Track the aid requests!
            </h2>
            <div className="bg-white rounded shadow-md m-10 p-8 w-full max-w-5xl">
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
                        <Marker position={center} />
                        {requests.map((request) => (
                            <RequestMarker key={request.id} request={request} />
                        ))}
                    </Map>
                </APIProvider>
            </div>
        </div>
    );
};

export default RequestMap;
