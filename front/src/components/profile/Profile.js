import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState({
        first_name: '',
        last_name: '',
        id_photo_url: '',
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3000/profile'
                );
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile data', error);
            }
        };

        fetchProfile();
    }, []);

    console.log('444444', profile);

    return (
        <div className="profile">
            <h1>Profile</h1>
            <div>
                <strong>First Name:</strong> {profile.first_name}
            </div>
            <div>
                <strong>Last Name:</strong> {profile.last_name}
            </div>
            {profile.id_photo_url && (
                <div>
                    <strong>ID Photo:</strong>
                    <img src={profile.id_photo_url} alt="ID" />
                </div>
            )}
        </div>
    );
};

export default Profile;
