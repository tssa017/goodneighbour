import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth_context/AuthContext';

function Nav() {
    const { isLoggedIn, logout } = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to login after logout
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="text-white text-lg font-bold">
                    GoodNeighbour
                </Link>
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        className="text-gray-400 hover:text-white focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div className="hidden md:flex md:items-center md:space-x-4">
                    {isLoggedIn ? (
                        <>
                            <Link
                                to="/"
                                className="current text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                to="/messages"
                                className="current text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium"
                            >
                                Messages
                            </Link>
                            <Link
                                to="/request/new"
                                className="current text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium"
                            >
                                Ask for a Request ?
                            </Link>
                            <Link
                                to="/profile"
                                className="current text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium"
                            >
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700 transition duration-200"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() =>
                                    console.log('Open login/register popup')
                                }
                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium"
                            >
                                Login/Register
                            </button>
                        </>
                    )}
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden flex flex-col space-y-2 mt-4">
                    {isLoggedIn ? (
                        <>
                            <Link
                                to="/"
                                className="current text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                to="/messages"
                                className="current text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium"
                            >
                                Messages
                            </Link>
                            <Link
                                to="/request/new"
                                className="current text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium"
                            >
                                Ask for a Request ?
                            </Link>
                            <Link
                                to="/profile"
                                className="current text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium"
                            >
                                Profile
                            </Link>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() =>
                                    console.log('Open login/register popup')
                                }
                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium"
                            >
                                Login/Register
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700 transition duration-200"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Nav;
