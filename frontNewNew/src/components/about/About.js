import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-light">
            <h1 className="text-4xl font-bold text-primary text-center mb-6">
                About GoodNeighbour
            </h1>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <p className="text-xl m-8">
                    We are a neighborhood volunteering platform dedicated to
                    bringing communities together. Our mission is to connect
                    those in need with compassionate volunteers willing to lend
                    a helping hand.
                </p>
                <p className="text-xl m-8">
                    GoodNeighbour aims to create a supportive community where
                    people can submit requests for aid and volunteers can easily
                    find opportunities to help. Whether it's running errands,
                    providing companionship, or offering other types of
                    assistance, we believe in the power of neighborly support.
                </p>
                <Link
                    to="/contact"
                    className="bg-secondary text-white text-2xl px-8 py-4 rounded-lg block mx-auto w-max hover:bg-secondary-dark transition-colors duration-300 text-center"
                >
                    Volunteer with us!
                </Link>
            </div>
        </div>
    );
};

export default About;
