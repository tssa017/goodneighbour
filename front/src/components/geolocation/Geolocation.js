import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useGeoLocation() {
    const [locationData, setLocationData] = useState(null);
    useEffect(() => {
        getLocation();
    }, []);
    async function getLocation() {
        // This function will return the following attributes:
        // country, countryCode, regionName, city, lat, lon, zip and timezone
        const res = await axios.get('http://ip-api.com/json');
        console.log(res);
        if (res.status === 200) setLocationData(res.data);
    }
    return {
        lat: locationData?.lat || 37.7749, // default to San Francisco
        lon: locationData?.lon || -122.4194, // default to San Francisco
    };
}
