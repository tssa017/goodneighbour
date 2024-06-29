import { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ currUser, setCurrUser, setShow }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setCurrUser(null);
        setShow(false);
    };

    return (
        <nav className="bg-primary p-4 md:p-8 z-50 relative">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl font-bold">
                    GoodNeighbour 💗
                </div>
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="focus:outline-none text-white"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            )}
                        </svg>
                    </button>
                </div>
                <div className="hidden md:flex space-x-6">
                    {currUser && (
                        <>
                            <Link
                                to="/home"
                                className="text-white hover:text-gray-200"
                            >
                                Home
                            </Link>
                            <Link
                                to="/about"
                                className="text-white hover:text-gray-200"
                            >
                                About
                            </Link>
                            <Link
                                to="/profile"
                                className="text-white hover:text-gray-200"
                            >
                                Profile
                            </Link>
                            <Link
                                to="/request" // TODO: check on requests/new
                                className="text-white hover:text-gray-200"
                            >
                                Make a request
                            </Link>
                            <Link
                                to="/messages"
                                className="text-white hover:text-gray-200"
                            >
                                Messages
                            </Link>
                            <Link
                                to="/contact"
                                className="text-white hover:text-gray-200"
                            >
                                Contact
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-dark"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
                {isOpen && (
                    <div className="md:hidden absolute top-16 right-0 left-0 bg-primary z-50">
                        <div className="flex flex-col items-center">
                            {currUser && (
                                <>
                                    <Link
                                        to="/home"
                                        className="text-white py-2 hover:text-gray-200"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        to="/about"
                                        className="text-white py-2 hover:text-gray-200"
                                    >
                                        About
                                    </Link>
                                    <Link
                                        to="/profile"
                                        className="text-white py-2 hover:text-gray-200"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        to="/contact"
                                        className="text-white py-2 hover:text-gray-200"
                                    >
                                        Contact
                                    </Link>
                                    <Link
                                        to="/request" // TODO: check on requests/new
                                        className="text-white py-2 hover:text-gray-200"
                                    >
                                        Make a request
                                    </Link>
                                    <Link
                                        to="/messages"
                                        className="text-white py-2 hover:text-gray-200"
                                    >
                                        Messages
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-red-500 text-white px-3 py-2 rounded my-4 hover:bg-dark"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Nav;
