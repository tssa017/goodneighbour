import { useRef, useState, useEffect } from 'react';

const UpdateUser = ({ currUser, setCurrUser, setShow }) => {
    const formRef = useRef();
    const [passwordError, setPasswordError] = useState('');
    const [user, setUser] = useState(currUser);

    useEffect(() => {
        setUser(currUser);
    }, [currUser]);

    const updateUser = async (formData, setCurrUser) => {
        const url = `http://localhost:3000/signup/${currUser.id}`;
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            });
            const data = await response.json();
            if (!response.ok) throw data.error;
            setCurrUser(data);
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const password = formData.get('password');
        const passwordConfirmation = formData.get('password_confirmation');

        if (password !== passwordConfirmation) {
            setPasswordError('Passwords do not match');
            return;
        }

        const userFormData = new FormData();
        for (const [key, value] of formData.entries()) {
            userFormData.append(`user[${key}]`, value);
        }

        updateUser(userFormData, setCurrUser);
        setPasswordError(''); // Clear error after successful submission
    };

    const handleClick = (e) => {
        e.preventDefault();
        setShow(true);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md"
            >
                <h2 className="mb-4 text-2xl font-semibold text-center text-gray-700">
                    Update Information
                </h2>
                <div className="mb-4">
                    <label
                        className="block mb-1 text-gray-600"
                        htmlFor="first_name"
                    >
                        First Name
                    </label>
                    <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        defaultValue={user.first_name}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block mb-1 text-gray-600"
                        htmlFor="last_name"
                    >
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        defaultValue={user.last_name}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-gray-600" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        defaultValue={user.email}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block mb-1 text-gray-600"
                        htmlFor="password"
                    >
                        New Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block mb-1 text-gray-600"
                        htmlFor="password_confirmation"
                    >
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        placeholder="confirm password"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    />
                </div>
                {passwordError && (
                    <div className="mb-4 text-red-500 text-center">
                        {passwordError}
                    </div>
                )}
                <div className="mb-4">
                    <label
                        className="block mb-1 text-gray-600"
                        htmlFor="id_photo"
                    >
                        ID Photo
                    </label>
                    <input
                        type="file"
                        id="id_photo"
                        name="id_photo"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 mb-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                    Update
                </button>
                <div className="text-center text-gray-600">
                    Go back to{' '}
                    <a
                        href="#profile"
                        onClick={handleClick}
                        className="text-indigo-500 hover:underline"
                    >
                        Profile
                    </a>{' '}
                    page.
                </div>
            </form>
        </div>
    );
};

export default UpdateUser;
