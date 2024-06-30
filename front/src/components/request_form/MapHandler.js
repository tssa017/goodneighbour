import { useMap } from '@vis.gl/react-google-maps';
import React, { useEffect } from 'react';

// Receives `place`, `setLatitude`, and `setLongitude` as props from parent component
const MapHandler = ({ place, setLatitude, setLongitude }) => {
    const map = useMap(); // This hook gets the current map instance

    useEffect(() => {
        if (!map || !place) return;

        // Adjust map to fit viewport
        if (place.geometry?.viewport) {
            map.fitBounds(place.geometry?.viewport);
        }
        setLatitude(place.geometry?.location?.lat());
        setLongitude(place.geometry?.location?.lng());
    }, [map, place]); // Code executes whenever `map` or `place` changes

    return null;
};

// `.memo` optimises rendering performance by memoising the component based on its props, preventing unnecessary re-renders when props haven't changed!
export default React.memo(MapHandler);
