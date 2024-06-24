import React, { useState, useCallback } from 'react';
import {
    GoogleMap,
    LoadScript,
    Marker,
    Autocomplete,
} from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
    width: '100%',
    height: '400px',
};
const defaultCenter = {
    lat: 51.505,
    lng: -0.09,
};

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const MapComponent = ({
    latitude,
    longitude,
    setLatitude,
    setLongitude,
    address,
    setAddress,
}) => {
    const [autocomplete, setAutocomplete] = useState(null);

    const onLoad = useCallback((autocomplete) => {
        setAutocomplete(autocomplete);
    }, []);

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            setAddress(place.formatted_address);
            setLatitude(place.geometry.location.lat());
            setLongitude(place.geometry.location.lng());
        } else {
            console.log('Autocomplete is not loaded yet!');
        }
    };

    const onMapClick = (e) => {
        setLatitude(e.latLng.lat());
        setLongitude(e.latLng.lng());
    };

    return (
        <LoadScript
            googleMapsApiKey={GOOGLE_MAPS_API_KEY}
            libraries={libraries}
        >
            <div className="mt-4">
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <input
                        type="text"
                        className="mt-1 p-3 w-full border border-lightBrown rounded-lg"
                        placeholder="Enter an address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Autocomplete>
                <GoogleMap
                    id="request-map"
                    mapContainerStyle={mapContainerStyle}
                    zoom={13}
                    center={
                        latitude && longitude
                            ? { lat: latitude, lng: longitude }
                            : defaultCenter
                    }
                    onClick={onMapClick}
                >
                    {latitude && longitude && (
                        <Marker position={{ lat: latitude, lng: longitude }} />
                    )}
                </GoogleMap>
            </div>
        </LoadScript>
    );
};

export default MapComponent;
