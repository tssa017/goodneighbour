import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserInfo = ({ currUser, setCurrUser, setShow }) => {
    const [user, setUser] = useState(currUser);

    useEffect(() => {
        setUser(currUser);
    }, [currUser]);

    return (
        <div className="min-h-screen flex flex-col items-center bg-light py-4">
            <h2 className="text-4xl font-bold text-primary text-center mb-6">
                Profile
            </h2>
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
                <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-1">
                        First name:
                    </label>
                    <p className="text-lg font-semibold text-gray-800">
                        {user.first_name}
                    </p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-1">
                        Last name:
                    </label>
                    <p className="text-lg font-semibold text-gray-800">
                        {user.last_name}
                    </p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-1">
                        Email:
                    </label>
                    <p className="text-lg font-semibold text-gray-800">
                        {user.email}
                    </p>
                </div>
                <div className="text-sm text-left">
                    <p className="py-3">
                        ℹ️{' '}
                        <em>
                            Since all profiles must be validated with a
                            government ID, users cannot individally update their
                            profiles.
                        </em>
                    </p>
                    <Link to="/contact">
                        <strong>Contact us </strong>if you need to make a
                        change!
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
