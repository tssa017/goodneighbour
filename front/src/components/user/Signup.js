import { useRef, useState } from 'react';
import axios from 'axios';

const Signup = ({ setCurrUser, setShow }) => {
    const formRef = useRef();
    const [passwordError, setPasswordError] = useState('');

    const signup = async (formData, setCurrUser) => {
        const url = 'http://localhost:3000/signup';
        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const data = response.data;
            localStorage.setItem(
                'token',
                response.headers.get('Authorization')
            );
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

        signup(userFormData, setCurrUser);
        e.target.reset();
        setPasswordError('');
    };

    const handleClick = (e) => {
        e.preventDefault();
        setShow(true);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md"
            >
                <h2 className="mb-4 text-4xl font-semibold text-center text-primary">
                    Sign up
                </h2>
                <p className="py-4 text-sm text-left">
                    Once you have signed up, please redirect to the log in page!
                </p>
                <div className="mb-4">
                    <label
                        className="block mb-3 text-gray-600 text-left"
                        htmlFor="first_name"
                    >
                        First name
                    </label>
                    <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        placeholder="John"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary focus:border-primary"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block mb-3 text-gray-600 text-left"
                        htmlFor="last_name"
                    >
                        Last name
                    </label>
                    <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        placeholder="Doe"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary focus:border-primary"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block mb-3 text-gray-600 text-left"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Your email address..."
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary focus:border-primary"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block mb-3 text-gray-600 text-left"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Create strong password"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary focus:border-primary"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block mb-3 text-gray-600 text-left"
                        htmlFor="password_confirmation"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        placeholder="Confirm password"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary focus:border-primary"
                        required
                    />
                </div>
                {passwordError && (
                    <div className="mb-4 text-dark text-center">
                        {passwordError}
                    </div>
                )}
                <div className="my-6">
                    <label
                        className="block mb-1 py-1 text-gray-600 text-sm text-left"
                        htmlFor="id_photo"
                    >
                        🛂 Upload a photo of your government-approved ID to
                        validate your account
                    </label>
                    <input
                        type="file"
                        id="id_photo"
                        name="id_photo"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary focus:border-primary"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 mt-4 mb-4 text-white bg-secondary rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                >
                    Submit ✨
                </button>
                <div className="text-center text-gray-600">
                    Already registered?{' '}
                    <a
                        href="#login"
                        onClick={handleClick}
                        className="text-primary hover:underline"
                    >
                        Login here
                    </a>
                </div>
            </form>
        </div>
    );
};

export default Signup;
