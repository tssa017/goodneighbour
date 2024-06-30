import React, { useRef, useEffect, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

const PlaceAutocomplete = ({ onPlaceSelect }) => {
    const [placeAutocomplete, setPlaceAutocomplete] = useState(null); // Holds the instance of `google.maps.places.Autocomplete`
    const inputRef = useRef(null); // Refers to the input DOM element for autocomplete
    const places = useMapsLibrary('places'); // Uses the useMapsLibrary hook to load the 'places' library from Google Maps

    useEffect(() => {
        if (!places || !inputRef.current) return; // Checks if places and inputRef.current are available

        const options = {
            fields: ['geometry', 'name', 'formatted_address'],
        };

        setPlaceAutocomplete(
            new google.maps.places.Autocomplete(inputRef.current, options)
        );
    }, [places]); // Runs when places (Google Maps 'places' library) or inputRef.current changes

    useEffect(() => {
        if (!placeAutocomplete) return;

        placeAutocomplete.addListener('place_changed', () => {
            onPlaceSelect(placeAutocomplete.getPlace());
        });
    }, [onPlaceSelect, placeAutocomplete]);

    // Provides an input field with a reference set to `inputRef`, enabling autocomplete
    return (
        <div className="autocomplete-container w-full">
            <input ref={inputRef} />
        </div>
    );
};

export default PlaceAutocomplete;
