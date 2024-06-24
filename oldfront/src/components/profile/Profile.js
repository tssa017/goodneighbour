import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3000/profile',
                    { withCredentials: true }
                );
                setProfileData(response.data);
            } catch (error) {
                setError('Error fetching profile data');
                console.error('Error fetching profile data', error);
            }
        };

        fetchProfile();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Profile</h1>
            <h2>{profileData.first_name}</h2>
            <p>{profileData.last_name}</p>
            <p>{profileData.email}</p>
            {/* {profileData.id_photo_url && (
                <img src={profileData.id_photo_url} alt="Profile" />
            )} */}
        </div>
    );
};

export default Profile;
