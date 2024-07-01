import Signup from './Signup';
import Login from './Login';
import { useState } from 'react';

// This file is good for testing too, with so many user's it's helpful to always have the name displayed on the top of the page!
const User = ({ currUser, setCurrUser }) => {
    const [show, setShow] = useState(true);

    if (currUser) {
        return (
            <div className="text-secondary text-xl rounded mt-8 font-black bg-light p-4 sm:p-6 md:p-8">
                Welcome, {currUser.first_name} 👋
            </div>
        );
    }

    return (
        <div>
            {/* Toggle between showing the Login and Signup components */}
            {show ? (
                <Login setCurrUser={setCurrUser} setShow={setShow} /> // `setShow` is passed down from the `App` component, used to update the `currUser` state in `App` component
            ) : (
                <Signup setCurrUser={setCurrUser} setShow={setShow} />
            )}
        </div>
    );
};

export default User;
