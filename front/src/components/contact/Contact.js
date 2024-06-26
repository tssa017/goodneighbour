import React from 'react';

const Contact = () => {
    return (
        <div className="min-h-screen flex flex-col items-center bg-light py-8">
            <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
                <h1 className="text-4xl font-bold text-primary text-center mb-6">
                    Contact us
                </h1>
                <p className="text-xl mb-8 text-center">
                    We would love to hear from you! 🤗
                </p>
                <form className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label
                            className="block mb-1 text-gray-600 text-left"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Jane"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary-100 focus:border-primary-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block mb-1 text-gray-600 text-left"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="example@goodneighbour.com"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary-100 focus:border-primary-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block mb-1 text-gray-600 text-left"
                            htmlFor="message"
                        >
                            Message
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            rows="4"
                            placeholder="Enter your message..."
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary-100 focus:border-primary-300"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-secondary rounded-md hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary-400"
                    >
                        Send message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
