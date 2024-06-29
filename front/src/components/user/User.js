import Signup from './Signup';
import Login from './Login';
import { useState } from 'react';

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
            {show ? (
                <Login setCurrUser={setCurrUser} setShow={setShow} />
            ) : (
                <Signup setCurrUser={setCurrUser} setShow={setShow} />
            )}
        </div>
    );
};

export default User;
