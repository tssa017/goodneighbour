import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useGeoLocation() {
    const [locationData, setLocationData] = useState(null);
    useEffect(() => {
        getLocation();
    }, []);
    async function getLocation() {
        // Making a request to this API will return the following attributes:
        // country, countryCode, regionName, city, lat, lon, zip and timezone
        const res = await axios.get('http://ip-api.com/json');
        console.log(res);
        if (res.status === 200) setLocationData(res.data);
    }
    // Default to San Francisco because I left my heart in SF ❤️
    return {
        lat: locationData?.lat || 37.7749,
        lon: locationData?.lon || -122.4194,
    };
}
