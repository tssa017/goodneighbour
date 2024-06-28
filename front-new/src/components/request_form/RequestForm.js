import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    GoogleMap,
    LoadScript,
    MarkerF,
    Autocomplete,
} from '@react-google-maps/api';

const libraries = ['places'];

const mapContainerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: 37.7749,
    lng: -122.4194,
};

const RequestForm = ({ currUser }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [requestType, setRequestType] = useState('task');
    const [latitude, setLatitude] = useState(center.lat);
    const [longitude, setLongitude] = useState(center.lng);
    const [locationError, setLocationError] = useState('');
    const [mapCenter, setMapCenter] = useState(center);
    const [modalOpen, setModalOpen] = useState(false);
    const autocompleteRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Math.abs(latitude) > 90.0 || Math.abs(longitude) > 180.0) {
            setLocationError('Latitude or Longitude have wrong values.');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:3000/requests',
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
            setModalOpen(true);
        } catch (error) {
            console.error(error);
        }

        setLocationError(''); // Clear error after successful submission
    };

    const onLoad = (autoC) => {
        autocompleteRef.current = autoC;
    };

    const onPlaceChanged = () => {
        if (autocompleteRef.current !== null) {
            const place = autocompleteRef.current.getPlace();
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            setLatitude(lat);
            setLongitude(lng);
            setMapCenter({ lat, lng });
        } else {
            console.log('Autocomplete is not loaded yet!');
        }
    };

    const onMarkerDragEnd = (event) => {
        setLatitude(event.latLng.lat());
        setLongitude(event.latLng.lng());
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-light">
            <h2 className="text-4xl font-bold text-primary text-center mb-6">
                Create a Request
            </h2>
            <div className="bg-white mb-8 p-8 rounded-lg shadow-lg w-full max-w-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="request_type"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Request Type
                        </label>
                        <select
                            id="request_type"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                            value={requestType}
                            onChange={(e) => setRequestType(e.target.value)}
                            required
                        >
                            <option value="task">Task</option>
                            <option value="material">Material</option>
                        </select>
                    </div>
                    {locationError && (
                        <div className="mb-4 text-red-500 text-center">
                            {locationError}
                        </div>
                    )}
                    <div>
                        <LoadScript
                            googleMapsApiKey={
                                process.env.REACT_APP_GOOGLE_MAPS_API_KEY
                            }
                            libraries={libraries}
                            loadingElement={<div>Loading...</div>}
                        >
                            <Autocomplete
                                onLoad={onLoad}
                                onPlaceChanged={onPlaceChanged}
                            >
                                <input
                                    type="text"
                                    placeholder="Enter a location"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                                />
                            </Autocomplete>
                            <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                center={mapCenter}
                                zoom={10}
                            >
                                <MarkerF
                                    position={{ lat: latitude, lng: longitude }}
                                    draggable={true}
                                    onDragEnd={onMarkerDragEnd}
                                />
                            </GoogleMap>
                        </LoadScript>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-primary text-light rounded-lg hover:bg-secondary focus:outline-none focus:bg-secondary transition duration-200"
                    >
                        Create request
                    </button>
                </form>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
                        <h2 className="text-xl font-semibold mb-4 text-primary">
                            Request Submitted
                        </h2>
                        <p className="text-gray-700 mb-4 bg-light">
                            Your request has been submitted successfully.
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
