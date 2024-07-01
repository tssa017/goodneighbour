import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useGeoLocation from '../geolocation/Geolocation'; // Custom hook (useGeoLocation) to fetch the current user's geographic coordinates (lat and lon)

import {
    Marker,
    Map,
    APIProvider,
    MapControl,
    ControlPosition,
} from '@vis.gl/react-google-maps';

import PlaceAutocomplete from './Autocomplete';
import MapHandler from './MapHandler';

const mapContainerStyle = {
    width: '100%',
    height: '400px',
};

const RequestForm = ({ currUser }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [requestType, setRequestType] = useState('task');

    const [locationError, setLocationError] = useState('');
    const { lat, lon } = useGeoLocation();
    const [latitude, setLatitude] = useState(lat);
    const [longitude, setLongitude] = useState(lon);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    //
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate latitude + longitude values
        // First, Checks that the `latitude` is within the valid range of -90 to +90 degrees
        // Then, check that the `longitude` is within the valid range of -180 to +180 degrees
        if (Math.abs(latitude) > 90.0 || Math.abs(longitude) > 180.0) {
            setLocationError('Latitude or Longitude have wrong values.');
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/requests`,
                {
                    request: {
                        user_id: currUser.id,
                        title,
                        description,
                        request_type: requestType,
                        latitude,
                        longitude,
                    },
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }

        setLocationError('');
    };

    // Update the latitude and longitude states when the marker on the map is dragged to a new position
    const onMarkerDragEnd = (event) => {
        setLatitude(event.latLng.lat());
        setLongitude(event.latLng.lng());
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-light py-4">
            <h2 className="text-4xl font-bold text-primary text-center mb-6">
                Create an aid request
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mb-10">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 text-left pb-1"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700 text-left pb-1"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="request_type"
                            className="block text-sm font-medium text-gray-700 text-left pb-1"
                        >
                            Request type
                        </label>
                        <select
                            id="request_type"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            value={requestType}
                            onChange={(e) => setRequestType(e.target.value)}
                            required
                        >
                            <option value="task">Task</option>
                            <option value="material">Material</option>
                        </select>
                    </div>
                    {locationError && (
                        <div className="mb-4 text-dark text-center">
                            {locationError}
                        </div>
                    )}
                    <p className="text-left text-sm pb-2 pt-8">
                        ℹ️{' '}
                        <em>
                            Enter an address or drag and drop the marker to your
                            exact location!
                        </em>
                    </p>
                    <div>
                        <APIProvider
                            apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                            libraries={['places']}
                        >
                            <MapControl position={ControlPosition.TOP}>
                                <div className="autocomplete-control w-full rounded-lg">
                                    <PlaceAutocomplete
                                        onPlaceSelect={setSelectedPlace}
                                    />
                                </div>
                            </MapControl>
                            <Map
                                mapId={'bf51a92d020fa25b'}
                                style={mapContainerStyle}
                                defaultZoom={15}
                                center={{ lat: latitude, lng: longitude }}
                                gestureHandling={'greedy'}
                                disableDefaultUI={true}
                            >
                                <Marker
                                    position={{ lat: latitude, lng: longitude }}
                                    draggable={true}
                                    onDragEnd={onMarkerDragEnd}
                                />
                            </Map>
                            <MapHandler
                                place={selectedPlace}
                                setLatitude={setLatitude}
                                setLongitude={setLongitude}
                            />
                        </APIProvider>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-primary text-light rounded-lg hover:bg-secondary focus:outline-none focus:bg-secondary transition duration-200"
                    >
                        Create request
                    </button>
                </form>
            </div>
            {/* Conditionally open a modal that confirms a request has been submitted (on successful submit) */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
                        <h2 className="text-xl font-semibold mb-4 text-primary">
                            Request Submitted
                        </h2>
                        <p className="text-gray-700 mb-4 bg-light">
                            Your request has been submitted successfully. You
                            will now be able to view your marker on the home
                            page.
                        </p>
                        <Link
                            to="/home"
                            className="py-2 px-4 bg-primary text-light rounded-lg hover:bg-secondary transition duration-200"
                            onClick={closeModal}
                        >
                            Close
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestForm;
