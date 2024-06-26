import { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setCurrUser, setShow }) => {
    const formRef = useRef(); // Creates a reference to the form element (to access the form data)
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const login = async (userInfo, setCurrUser) => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/login`;
        try {
            const response = await axios.post(url, userInfo, {
                headers: {
                    'content-type': 'application/json',
                    Accept: 'application/json',
                },
            });
            const data = response.data;
            localStorage.setItem(
                'token',
                response.headers.get('Authorization')
            );
            setCurrUser(data);
            navigate('/home'); // Upon form submission we navigate to the map page directly!
        } catch (error) {
            console.log('error', error);
            if (error.response && error.response.status === 401) {
                setErrorMessage('Invalid credentials. Try signing up first.');
            } else {
                setErrorMessage('An error occurred. Please try again later.');
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData);
        const userInfo = {
            user: { email: data.email, password: data.password },
        }; // Ensure posted object is structured to match the expected format for the API request
        login(userInfo, setCurrUser);
        e.target.reset(); // Reset form after submission
    };

    const handleClick = (e) => {
        e.preventDefault();
        setShow(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
            >
                <h2 className="mb-6 text-4xl font-semibold text-center text-primary">
                    Log in
                </h2>
                {errorMessage && (
                    <div className="mb-4 text-dark text-center" role="alert">
                        {errorMessage}
                    </div>
                )}
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block mb-3 text-gray-600 text-left"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary focus:border-primary"
                        required
                        autoComplete="email"
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block mb-3 text-gray-600 text-left"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary focus:border-primary"
                        required
                        autoComplete="current-password"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 text-white bg-secondary rounded-md hover:bg-secondary focus:outline-none focus:ring focus:ring-secondary"
                >
                    Login
                </button>
                <div className="mt-4 text-center text-gray-700">
                    <span>Not registered yet?</span>{' '}
                    <button
                        type="button"
                        onClick={handleClick}
                        className="text-primary hover:underline focus:outline-none"
                    >
                        Sign up here
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
