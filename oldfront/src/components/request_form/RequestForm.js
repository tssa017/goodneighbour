import React, { useState } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';

const RequestForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [requestType, setRequestType] = useState('task');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [tab, setTab] = useState('address');
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        if (!title.trim()) {
            errors.title = 'Title is required';
        }
        if (!description.trim()) {
            errors.description = 'Description is required';
        }
        if (tab === 'address' && !address.trim()) {
            errors.address = 'Address is required';
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:3000/requests',
                {
                    request: {
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
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-semibold mb-6 text-center text-green-700">
                    Create a Request
                </h2>
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
                            className={`mt-1 p-2 w-full border rounded-lg focus:outline-none ${
                                errors.title
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                            }`}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.title}
                            </p>
                        )}
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
                            className={`mt-1 p-2 w-full border rounded-lg focus:outline-none ${
                                errors.description
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                            }`}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.description}
                            </p>
                        )}
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
                            className="mt-1 p-2 w-full border rounded-lg focus:outline-none"
                            value={requestType}
                            onChange={(e) => setRequestType(e.target.value)}
                            required
                        >
                            <option value="task">Task</option>
                            <option value="material">Material</option>
                        </select>
                    </div>
                    <div className="flex justify-center mb-4">
                        <button
                            className={`px-4 py-2 focus:outline-none ${
                                tab === 'address'
                                    ? 'bg-green-500 text-white'
                                    : 'text-gray-600'
                            }`}
                            onClick={() => setTab('address')}
                        >
                            Address
                        </button>
                        <button
                            className={`px-4 py-2 focus:outline-none ${
                                tab === 'map'
                                    ? 'bg-green-500 text-white'
                                    : 'text-gray-600'
                            }`}
                            onClick={() => setTab('map')}
                        >
                            Map
                        </button>
                    </div>
                    {tab === 'address' && (
                        <div className="p-4">
                            <label
                                htmlFor="address"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Enter Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                className={`mt-1 p-2 w-full border rounded-lg focus:outline-none ${
                                    errors.address
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                }`}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                            {errors.address && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.address}
                                </p>
                            )}
                        </div>
                    )}
                    {tab === 'map' && (
                        <MapComponent
                            latitude={latitude}
                            longitude={longitude}
                            setLatitude={setLatitude}
                            setLongitude={setLongitude}
                        />
                    )}
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600 transition duration-200"
                    >
                        Create Request
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RequestForm;
